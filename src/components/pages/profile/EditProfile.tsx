//React
import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';

// @mui
import {
  Avatar,
  Button,
  CircularProgress,
  Grid,
  styled,
  Typography,
  Box,
  IconButton,
  SwipeableDrawer,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { LoadingButton } from '@mui/lab';

//libraries
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { yupResolver } from '@hookform/resolvers/yup';
import ReactCrop, { PixelCrop } from 'react-image-crop';
import ReactFlagsSelect from 'react-flags-select';
import 'react-image-crop/dist/ReactCrop.css';
import Webcam from 'react-webcam';
import * as Yup from 'yup';

// hooks
import useResponsive from 'src/hooks/useResponsive';
import useIsMountedRef from 'src/hooks/useIsMountedRef';

// icons and images
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import CameraIcon from 'src/assets/svg/camera_icon';
import Capture from 'src/assets/svg/icon_capture';
import CloseIcon from 'src/assets/svg/close_icon';
import GalleryIcon from 'src/assets/svg/gallery_icon';
import IconUpload from 'src/assets/svg/icon_upload';
import IconCamera from 'src/assets/svg/icon_camera';
import ProfileBG from 'src/assets/images/ProfileBG.png';
import User from 'src/assets/images/User.png';

// component
import { FormProvider, RHFTextField } from 'src/components/hook-form';
import Page from 'src/components/Page';
import RHFSelectField from 'src/components/hook-form/RHFSelectField';

// styles
import { Wrapper } from 'src/components/auth/styledComponents/styles';
import MobileHeader from 'src/layouts/dashboard/mobilenav';

//........................................................................

const CameraStyle = styled('div')(({ theme }) => ({
  paddingTop: '40%',
  textAlign: 'center',
}));

const useStyles = makeStyles((theme) => ({
  camera: {
    height: '100%',
    width: '100%',
    objectFit: 'fill',
    borderRadius: '8px',
  },
}));

const InnerWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(4.5),
  backgroundColor: theme.palette.grey[900],
  maxWidth: '770px',
  textAlign: 'center',
  borderRadius: '1rem',
  [theme.breakpoints.down('sm')]: {
    margin: 0,
    padding: theme.spacing(0),
  },
}));

const AvatarWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'inline-block',
  margin: 'auto',
  marginBottom: theme.spacing(2),
  '& .cameraIcon': {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: '4px 6px 2px 6px',
    backgroundColor: theme.palette.grey[600],
    borderRadius: '50%',
    cursor: 'pointer',
  },
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(3),
  },
}));

const SaveButton = styled(LoadingButton)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(2, 0),
}));
const CancelButton = styled(Button)(({ theme }) => ({
  width: '100%',
  borderRadius: '100px',
  padding: theme.spacing(2, 0),
  fontWeight: 600,
  backgroundColor: 'transparent',
  color: theme.palette.grey[0],
  border: `1px solid ${theme.palette.grey[400]}`,
}));

export const UploadButton = styled(Button)(({ theme }) => ({
  padding: '6px 20px',
  fontWeight: 400,
}));

export const UploadWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  padding: '42px 74px',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  border: `1px dashed ${theme.palette.grey[400]}`,
  borderRadius: '9px',
  [theme.breakpoints.down('md')]: {
    padding: '30px 20px',
  },
}));

const SelectCountry = styled(ReactFlagsSelect)(({ theme }) => ({
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

interface Picture {
  preview: string;
  lastModified: number;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
  }, [setCroppedImage, setImg, setOpenCamera]);

  const onDrop = useCallback((acceptedFiles) => {
    onSelectFile(acceptedFiles[0]);
  }, [onSelectFile]);

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

type FormValuesProps = {
  first_name: string;
  last_name: string;
  email: string;
  salutation: string;
  gender: string;
  country: string;
  phone_number: string;
  alternate_number: string;
  afterSubmit?: string;
};

export default function EditProfile() {
  const isDesktop = useResponsive('up', 'sm');
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const isMountedRef = useIsMountedRef();
  const [showUploader, setShowUploader] = useState(false);
  const [showMobileDrawer, setShowMobileDrawer] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  const [img, setImg] = useState('');

  const [croppedImage, setCroppedImage] = useState('');

  const [openCamera, setOpenCamera] = useState(false);

  const [url, setUrl] = useState<string>('');

  const [selected, setSelected] = useState('AE');

  const classes = useStyles();

  const handleSelectCountry = (code: any) => {
    setSelected(code);
  };

  useEffect(() => {
    setOpenCamera(false);
    setShowUploader(false);
  }, [isDesktop]);

  const EditFormSchema = Yup.object().shape({
    first_name: Yup.string().required('First Name is required'),
    last_name: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    salutation: Yup.string().required('Sautation is required'),
    gender: Yup.string().required('Gender is required'),
    country: Yup.string().required('Country is required'),
    phone_number: Yup.string().required('Phone Number is required'),
    alternate_number: Yup.string().required('Alternate Number is required'),
  });

  const defaultValues = {
    first_name: '',
    last_name: '',
    email: '',
    salutation: '',
    gender: '',
    country: '',
    phone_number: '',
    alternate_number: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(EditFormSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,

    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    setSubmitting(true);
    try {
      setTimeout(() => {
        setSubmitting(false);
        console.log('Submitted');
        // navigate(PATH_AUTH.login);
      }, 2000);
    } catch (error) {
      console.log('error');
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.message });
      }
    }
  };

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

  return (
    <Page title="Edit Profile" img={isDesktop ? ProfileBG : ''}>
      {!isDesktop && openCamera ? (
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
        <Wrapper>
          <InnerWrapper>
            {isDesktop ? (
              <Typography sx={{ mb: { xs: 3.5, sm: 2, lg: 3.5 } }} variant="h3">
                Edit Profile
              </Typography>
            ) : (
              <MobileHeader
                leftNav={
                  <IconButton onClick={() => navigate(-1)}>
                    <ArrowBackIos sx={{ fontSize: 'medium' }} />
                  </IconButton>
                }
                title="Edit Profile"
              />
            )}

            <AvatarWrapper>
              <Avatar src={String(url ? url : User)} alt="" sx={{ width: 70, height: 70 }} />
              <div
                onClick={() => {
                  if (isDesktop) {
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

            {isDesktop && (
              <Typography sx={{ mb: { xs: 3, sm: 3.5 } }} variant="h1">
                Zayd Rafiq
              </Typography>
            )}
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
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Grid px={2} container columnSpacing={1.5}>
                <Grid item xs={12} sm={6}>
                  <RHFTextField name="first_name" placeholder="First Name" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <RHFTextField name="last_name" placeholder="Last Name" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <RHFTextField name="email" placeholder="E-mail" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <RHFSelectField
                    name="salutation"
                    placeholder="Salutation"
                    options={['Dr.', 'Mr.', 'Er.']}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <RHFSelectField name="gender" placeholder="Gender" options={['Male', 'Female']} />
                </Grid>
                <Grid mb={2} item xs={12} sm={6}>
                  <SelectCountry
                    selected={selected}
                    onSelect={(code) => handleSelectCountry(code)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <RHFTextField type="number" name="phone_number" placeholder="Phone Number" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <RHFTextField
                    type="number"
                    name="alternate_number"
                    placeholder="Alternate Phone Number"
                  />
                </Grid>
              </Grid>
              <Grid px={2} mb={2} container spacing={1.5} mt={{ xs: 0, sm: 1, md: 2 }}>
                <Grid item xs={12} sm={6}>
                  <SaveButton
                    loadingIndicator={
                      <CircularProgress
                        sx={{ color: '#000', height: '100%', width: '100%' }}
                        size={16}
                      />
                    }
                    loading={isSubmitting || submitting}
                    type="submit"
                  >
                    Save Changes
                  </SaveButton>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CancelButton onClick={() => navigate(-1)}>Cancel</CancelButton>
                </Grid>
              </Grid>
            </FormProvider>
          </InnerWrapper>
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
              The accepted format is .pdf, .jpg and maximum size limit for the pdf to be uploaded is
              10MB.
            </Typography>
          </Box>
        </SwipeableDrawer>
      )}
    </Page>
  );
}
