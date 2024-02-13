//react
import { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// @mui
import {
  Grid,
  styled,
  Typography,
  Avatar,
  CircularProgress,
  Box,
  IconButton,
  SwipeableDrawer,
  Button,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { makeStyles } from '@mui/styles';

//libraries
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ReactCrop, { PixelCrop } from 'react-image-crop';
import ReactFlagsSelect from 'react-flags-select';
import 'react-image-crop/dist/ReactCrop.css';
import Webcam from 'react-webcam';
import * as Yup from 'yup';

//hooks
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import useResponsive from 'src/hooks/useResponsive';

//icons and Images
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CameraIcon from 'src/assets/svg/camera_icon';
import Capture from 'src/assets/svg/icon_capture';
import CloseIcon from 'src/assets/svg/close_icon';
import GalleryIcon from 'src/assets/svg/gallery_icon';
import IconCamera from 'src/assets/svg/icon_camera';
import ProfileBG from 'src/assets/images/ProfileBG.png';
import profile_1 from 'src/assets/images/User2.png';

// components
import { FormProvider, RHFTextField } from 'src/components/hook-form';
import { UploadButton, UploadWrapper } from 'src/components/pages/profile/EditProfile';
import { Wrapper } from 'src/components/auth/styledComponents/styles';
import Page from 'src/components/Page';
import MobileHeader from 'src/layouts/dashboard/mobilenav';
import RHFSelectField from 'src/components/hook-form/RHFSelectField';
import RHFDatePicker from 'src/components/hook-form/RHFDatePicker';
import IconUpload from 'src/assets/svg/icon_upload';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  camera: {
    height: '100%',
    width: '100%',
    objectFit: 'fill',
    borderRadius: '8px',
  },
}));

const MainWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(4.5),
  textAlign: 'center',
  maxWidth: '770px',
  background: theme.palette.grey[900],
  boxShadow: '0px 4px 26px rgba(0, 0, 0, 0.2)',
  borderRadius: '16px',
  [theme.breakpoints.down('md')]: {
    margin: theme.spacing(2),
    padding: theme.spacing(4.5, 2),
  },
  [theme.breakpoints.down('sm')]: {
    margin: theme.spacing(0),
    textAlign: 'left',
    padding: theme.spacing(0),
  },
}));
const FormWrapper = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(3),
}));
const Select = styled('div')(({ theme }) => ({
  width: '50%',
  margin: 'auto',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

const AvatarWrapper = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(2),
  display: 'flex',
  justifyContent: 'center',
  '& .cameraIcon': {
    position: 'relative',
    height: '24px',
    right: '5%',
    padding: '4px 6px 2px 6px',
    backgroundColor: theme.palette.grey[600],
    borderRadius: '50%',
  },
}));

const SelectCountry = styled(ReactFlagsSelect)(({ theme }) => ({
  marginBottom: '21px',

  '.ReactFlagsSelect-module_selectOptionWithlabel__2GpmM': {
    '&:hover': {
      background: theme.palette.grey[700],
      color: theme.palette.grey[0],
      borderRadius: '5px',
    },
  },
  '.ReactFlagsSelect-module_selectBtn__19wW7': {
    borderRadius: '100px',
    background: theme.palette.grey[600],
    padding: '14px',
    color: theme.palette.grey[500],
  },
  '.ReactFlagsSelect-module_fullWidthOptions__1XeR6': {
    '::-webkit-scrollbar': {
      width: '7px',
    },
    '::-webkit-scrollbar-thumb': {
      borderRadius: '10px',
      background: theme.palette.grey[500],
    },
    background: theme.palette.grey[600],
    border: 'none',
    outline: 'none',
  },
}));
const SubmitButton = styled(LoadingButton)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(2),
  width: '50%',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

const CameraStyle = styled('div')(({ theme }) => ({
  paddingTop: '40%',
  textAlign: 'center',
}));

interface Picture {
  preview: string;
  lastModified: number;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}

type FormValuesProps = {
  email: string;
  password: string;
  afterSubmit?: string;
};

interface UploadPictureProp {
  onClose: () => void;
  setUrl: Dispatch<SetStateAction<string>>;
  setOpenCamera: Dispatch<SetStateAction<boolean>>;
  openCamera: boolean;
  setImg: Dispatch<SetStateAction<string>>;
  img: string;
  setCroppedImage: Dispatch<SetStateAction<string>>;
  croppedImage: string;
}

const videoConstraints = {
  facingMode: 'user',
};

function UploadPicture({
  onClose,
  setUrl,
  openCamera,
  setOpenCamera,
  setImg,
  img,
  setCroppedImage,
  croppedImage,
}: UploadPictureProp) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<PixelCrop>();
  const isDesktop = useResponsive('up', 'sm');

  const webcamRef = useRef<Webcam>(null);

  const classes = useStyles();

  const onSelectFile = (e: File) => {
    if (e) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setImg(reader.result?.toString() || ''));
      reader.readAsDataURL(e);
    }
  };

  const makeClientCrop = async (crop: { width: number; height: number }) => {
    if (imgRef.current && crop.width && crop.height) {
      createCropPreview(imgRef.current, crop);
    }
  };

  const createCropPreview = (image: any, crop: { width: any; height: any; x?: any; y?: any }) => {
    const canvas = document.createElement('canvas');
    const pixelRatio = window.devicePixelRatio;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d')!;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            //reject(new Error('Canvas is empty'));
            console.error('Canvas is empty');
            return;
          } else {
            const url = URL.createObjectURL(blob);
            let img = new Image();
            img.onload = () => {
              URL.revokeObjectURL(url);
              resolve(img);
            };
            img.src = url;
            const pic = Object.assign(blob, {
              preview: URL.createObjectURL(blob),
            });
            setCroppedImage(pic.preview);
          }
        },
        'image/jpeg',
        1
      );
    });
  };

  const capture = useCallback(() => {
    setImg('');
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      urltoFile(imageSrc, 'selfie.png').then(function (file) {
        const img: Picture = Object.assign(file, {
          preview: URL.createObjectURL(file),
        });
        setCroppedImage(img.preview);
        setImg(img.preview);
      });
    }

    //return a promise that resolves with a File instance
    async function urltoFile(url: string, filename: string) {
      const res = await fetch(url);
      const buf = await res.arrayBuffer();
      return new File([buf], filename);
    }
    setOpenCamera(false);
  }, [webcamRef]);

  const onDrop = useCallback((acceptedFiles) => {
    onSelectFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    noClick: true,
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
  });

  const handleSavePicture = () => {
    onClose();
    setImg('');
    setUrl(croppedImage);
  };

  return (
    <Box
      textAlign="center"
      borderRadius={2}
      mb={4}
      p={3.5}
      sx={{ backgroundColor: 'grey.600', position: 'relative' }}
    >
      {!img && (
        <IconButton onClick={onClose} sx={{ position: 'absolute', top: 14, right: 20 }}>
          <CloseIcon />
        </IconButton>
      )}
      {openCamera ? (
        <Typography variant="h3" mb={3}>
          Capture New Profile Picture{' '}
        </Typography>
      ) : (
        <Typography variant="h3" mb={3}>
          Upload Profile Picture
        </Typography>
      )}
      {openCamera ? (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            screenshotQuality={1}
            imageSmoothing
            className={classes.camera}
          />
          <IconButton sx={{ mt: 3 }} onClick={capture}>
            <Capture />
          </IconButton>
        </>
      ) : (
        <>
          {img ? (
            <>
              <ReactCrop
                circularCrop={isDesktop ? false : true}
                crop={crop}
                onChange={(c) => setCrop(c)}
                onComplete={makeClientCrop}
              >
                <img ref={imgRef} alt="Crop me" src={img} />
              </ReactCrop>
              <Box sx={{ mt: 2 }}>
                <LoadingButton onClick={handleSavePicture} sx={{ mx: 1, px: 4, py: 1.3 }}>
                  Save Profile Picture
                </LoadingButton>
                <LoadingButton
                  sx={{
                    mt: { xs: 1, sm: 0 },
                    mx: 1,
                    px: 4,
                    py: 1.3,
                    background: 'transparent',
                    color: '#fff',
                    border: '1px solid #fff',
                  }}
                  onClick={() => {
                    setImg('');
                    onClose();
                  }}
                >
                  Cancel
                </LoadingButton>
              </Box>
            </>
          ) : (
            <>
              {isDesktop && (
                <UploadWrapper {...getRootProps()}>
                  <IconUpload />
                  <Typography variant="body2" color="grey.500">
                    Drag & Drop Here
                  </Typography>
                  <Typography variant="body2" color="grey.500">
                    OR
                  </Typography>
                  <UploadButton onClick={open}>Browse files</UploadButton>
                  <UploadButton onClick={() => setOpenCamera(true)}>Capture</UploadButton>
                  <input {...getInputProps()} />
                </UploadWrapper>
              )}
            </>
          )}
        </>
      )}
    </Box>
  );
}
export default function Occupants() {
  const [submitting, setSubmitting] = useState(false);
  const [selected, setSelected] = useState('AE');
  const [showUploader, setShowUploader] = useState(false);
  const [showMobileDrawer, setShowMobileDrawer] = useState(false);

  const [croppedImage, setCroppedImage] = useState('');
  const [img, setImg] = useState('');
  const [openCamera, setOpenCamera] = useState(false);
  const [url, setUrl] = useState<string>('');

  const webcamRef = useRef<Webcam>(null);

  const classes = useStyles();

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      urltoFile(imageSrc, 'selfie.png').then(function (file) {
        const img: Picture = Object.assign(file, {
          preview: URL.createObjectURL(file),
        });
        setCroppedImage(img.preview);
        setImg(img.preview);
      });
      setShowUploader(true);
    }

    //return a promise that resolves with a File instance
    async function urltoFile(url: string, filename: string) {
      const res = await fetch(url);
      const buf = await res.arrayBuffer();
      return new File([buf], filename);
    }
    setOpenCamera(false);
  }, [webcamRef]);

  const navigate = useNavigate();

  const isMobile = useResponsive('down', 'sm');

  const isMountedRef = useIsMountedRef();

  const EditOccupantsSchema = Yup.object().shape({
    first_name: Yup.string().required('First Name is required'),
    last_name: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    salutation: Yup.string().required('Required'),
    birthdate: Yup.string().required(isMobile ? 'Required' : 'Birthdate is required'),
    mobile_number: Yup.string().required('Mobile Number is required'),
    emirates_ID: Yup.string().required(isMobile ? 'Required' : 'Emirates ID is required'),
    expiry_passport: Yup.string().required('Required'),
    expiry_emirates_ID: Yup.string().required('Required'),
    passport_no: Yup.string().required(isMobile ? 'Required' : 'Passport No. is required'),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(EditOccupantsSchema),
  });
  const {
    reset,
    setError,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSelectFile = (e: File) => {
    if (e) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setImg(reader.result?.toString() || ''));
      reader.readAsDataURL(e);
      setShowMobileDrawer(false);
      setShowUploader(true);
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    onSelectFile(acceptedFiles[0]);
  }, []);

  const { open } = useDropzone({
    multiple: false,
    onDrop,
    noClick: true,
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
  });

  const onSubmit = async (data: FormValuesProps) => {
    setSubmitting(true);
    try {
      setTimeout(() => {
        setSubmitting(false);
        console.log('Submitted');
      }, 2000);
    } catch (error) {
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.message });
      }
    }
  };

  const handleSelectCountry = (code: any) => {
    setSelected(code);
  };
  return (
    <>
      <Page title="Edit Occupants" img={isMobile ? '' : ProfileBG}>
        {isMobile && openCamera ? (
          <CameraStyle>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              screenshotQuality={1}
              imageSmoothing
              className={classes.camera}
            />
            <IconButton sx={{ mt: 3 }} onClick={capture}>
              <Capture />
            </IconButton>
          </CameraStyle>
        ) : (
          <Wrapper sx={{ marginBottom: 5 }}>
            <MainWrapper>
              {isMobile ? (
                <MobileHeader
                  leftNav={
                    <IconButton onClick={() => navigate(-1)}>
                      <ArrowBackIosIcon sx={{ fontSize: 'medium' }} />
                    </IconButton>
                  }
                  title="Edit occupant details"
                />
              ) : (
                <Typography color="grey.0" variant="h6" mb={4}>
                  Edit occupant details
                </Typography>
              )}

              <Box px={2}>
                <Typography color="grey.400" variant="h2" mb={1.5}>
                  Occupancy details
                </Typography>
                <Select>
                  <FormProvider methods={methods}>
                    <RHFSelectField
                      placeholder="Select contract*"
                      name="select_contract"
                      defaultValue="Al Safa Villa #303"
                      options={[
                        'Al Safa Villa #303',
                        'Al Safa Villa #305',
                        'Al Safa Villa #306',
                        'Al Safa Villa #307',
                      ]}
                    />
                  </FormProvider>
                </Select>

                <Typography color="grey.400" variant="h2" sx={{ m: '0  0  14px 0' }}>
                  Personal details
                </Typography>
                <AvatarWrapper>
                  <Avatar
                    src={String(url ? url : profile_1)}
                    alt=""
                    sx={{ width: 70, height: 70 }}
                  />
                  <div
                    onClick={() => {
                      if (!isMobile) {
                        setShowUploader(!showUploader);
                      } else {
                        setShowMobileDrawer(true);
                      }
                    }}
                    className="cameraIcon"
                  >
                    <IconCamera />
                  </div>
                </AvatarWrapper>
                {showUploader && (
                  <UploadPicture
                    croppedImage={croppedImage}
                    setCroppedImage={setCroppedImage}
                    setImg={setImg}
                    setOpenCamera={setOpenCamera}
                    openCamera={openCamera}
                    setUrl={setUrl}
                    img={img}
                    onClose={() => {
                      setShowUploader(false);
                      setOpenCamera(false);
                    }}
                  />
                )}

                <FormWrapper>
                  <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                    <Grid container columnSpacing={1.5}>
                      <Grid item xs={12} sm={6} columnSpacing={1}>
                        <RHFTextField placeholder="First Name" name="first_name" />
                      </Grid>
                      <Grid item xs={12} sm={6} columnSpacing={1}>
                        <RHFTextField placeholder="Last Name" name="last_name" />
                      </Grid>
                      <Grid item xs={12} sm={6} columnSpacing={1}>
                        <RHFTextField placeholder="Email Address" name="email" />
                      </Grid>
                      <Grid item xs={6} sm={3} columnSpacing={1}>
                        <RHFSelectField
                          name="salutation"
                          placeholder="Salutation"
                          options={['Dr.', 'Mr.', 'Er.']}
                        />{' '}
                      </Grid>
                      <Grid item xs={6} sm={3} columnSpacing={1}>
                        <RHFDatePicker placeholder="Birthdate" name="birthdate" />
                      </Grid>
                      <Grid item xs={12} sm={6} columnSpacing={1}>
                        <RHFTextField
                          placeholder="Mobile Number"
                          name="mobile_number"
                          type="number"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} columnSpacing={1}>
                        <SelectCountry
                          selected={selected}
                          onSelect={(code) => handleSelectCountry(code)}
                        />
                      </Grid>
                      <Grid item xs={7} sm={3.5} columnSpacing={1}>
                        <RHFTextField placeholder="Emirates ID" name="emirates_ID" type="number" />
                      </Grid>
                      <Grid item xs={5} sm={2.5} columnSpacing={1}>
                        <RHFDatePicker placeholder="Expiry" name="expiry_emirates_ID" />
                      </Grid>

                      <Grid item xs={7} sm={3.5} columnSpacing={1}>
                        <RHFTextField placeholder="Passport No." name="passport_no" type="number" />
                      </Grid>
                      <Grid item xs={5} sm={2.5} columnSpacing={1}>
                        <RHFDatePicker placeholder="Expiry" name="expiry_passport" />
                      </Grid>
                    </Grid>
                    <SubmitButton
                      loadingIndicator={
                        <CircularProgress
                          sx={{ color: '#000', height: '100%', width: '100%' }}
                          size={16}
                        />
                      }
                      loading={isSubmitting || submitting}
                      type="submit"
                    >
                      Submit Changes
                    </SubmitButton>
                  </FormProvider>
                </FormWrapper>
              </Box>
            </MainWrapper>
          </Wrapper>
        )}
        {showMobileDrawer && (
          <SwipeableDrawer
            anchor="bottom"
            sx={{
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}
            hideBackdrop={true}
            open={showMobileDrawer}
            onClose={() => setShowMobileDrawer(false)}
            onOpen={() => setShowMobileDrawer(true)}
          >
            <Box p={2}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.5}>
                <Typography variant="h3">Upload Profile Picture</Typography>
                <IconButton onClick={() => setShowMobileDrawer(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <Button
                onClick={() => {
                  setOpenCamera(true);
                  setShowMobileDrawer(false);
                }}
                startIcon={<CameraIcon />}
                sx={{ width: '100%', padding: '16px 0', mb: 1.5 }}
              >
                Take Photo
              </Button>
              <Button
                onClick={open}
                startIcon={<GalleryIcon />}
                sx={{ width: '100%', padding: '16px 0', mb: 1.5 }}
              >
                Choose from library
              </Button>
              <Typography variant="body1" color="grey.500" textAlign="center">
                The accepted format is .pdf, .jpg and maximum size limit for the pdf to be uploaded
                is 10MB.
              </Typography>
            </Box>
          </SwipeableDrawer>
        )}
      </Page>
    </>
  );
}
