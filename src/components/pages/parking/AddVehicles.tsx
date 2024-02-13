//react
import { useCallback, useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import Webcam from 'react-webcam';

// @mui
import { Grid, styled, Typography, Button, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Capture from 'src/assets/svg/icon_capture';

// hooks
import { FormProvider, RHFTextField } from 'src/components/hook-form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import RHFSelectField from 'src/components/hook-form/RHFSelectField';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import useResponsive from 'src/hooks/useResponsive';
import * as Yup from 'yup';

//icons and images
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import ProfileBG from 'src/assets/images/ParkingBG.png';

// components
import { Wrapper } from 'src/components/auth/styledComponents/styles';
import Page from 'src/components/Page';
import UploadContainer from './UploadContainer';
import ViewDocument from 'src/components/pages/document/ViewDocument';


const MainWrapper = styled('div')(({ theme }) => ({
  maxWidth: '415px',
  backgroundColor: theme.palette.grey[900],
  borderRadius: '16px',
  padding: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    maxWidth: '100%',
    margin: 0,
    borderRadius: 0,
    paddingTop: theme.spacing(4),
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5),
  width: '100%',
  borderColor: theme.palette.grey[0],
  '&:hover': {
    borderColor: theme.palette.grey[0],
    color: theme.palette.grey[900],
    backgroundColor: theme.palette.grey[0],
  },
  '&:disabled': {
    backgroundColor: theme.palette.grey[500],
    color: theme.palette.grey[600],
  },
}));

type FormValuesProps = {
  make: string;
  model: string;
  afterSubmit?: string;
};

interface Picture {
  preview: string;
  lastModified: number;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}
const useStyles = makeStyles((theme) => ({
  camera: {
    height: '100%',
    width: '100%',
    objectFit: 'fill',
  },
}));

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

const BackIcon = styled(IconButton)(({ theme }) => ({
  background: theme.palette.grey[200],
  position: 'absolute',
  left: 10,
  top: 10,
}));
const CameraAdjust = styled('div')(({ theme }) => ({
  textAlign: 'center',
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
  },
}));
export const CaptureButton = styled(IconButton)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));

export default function BankAccountForm() {
  const isDesktop = useResponsive('up', 'sm');
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const isMountedRef = useIsMountedRef();

  const VehiclesFormSchema = Yup.object().shape({
    make: Yup.string().required('Make is required'),
    model: Yup.string().required('Model a Bank'),
    plate_number: Yup.string().required('Plate Number is required'),
    emirate: Yup.string().required('Emirate a Bank'),
    year: Yup.string().required('Year is required'),
    colour: Yup.string().required('Colour a Bank'),
    registered_owner: Yup.string().required('Registered Owner is required'),
    emergency_contact: Yup.string().required('Emergency Contact a Bank'),
  });

  const defaultValues = {
    make: '',
    model: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(VehiclesFormSchema),
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
      }, 2000);
    } catch (error) {
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.message });
      }
    }
  };

  const [fileSrc, setFileSrc] = useState<Picture[]>([]);

  //cam
  const classes = useStyles();
  const [openPreview, setOpenPreview] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [openCamera, setOpenCamera] = useState<boolean>(false);
  const [url, setUrl] = useState<string>('');
  const [file, setFile] = useState<string | Blob>('');
  const [open, setOpen] = useState(false);
  //const [fileSrc, setFileSrc] = useState<Picture[]>([]);
  const webcamRef = useRef<Webcam>(null);
  const [openView, setOpenView] = useState(false);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      urltoFile(imageSrc, 'selfie.png').then(function (file) {
        setFile(file);
        const img: Picture = Object.assign(file, {
          preview: URL.createObjectURL(file),
        });
        setUrl(img.preview);
        setFileSrc((fileSrc) => [...fileSrc, img]);
      });

      if (imageSrc) {
        setOpenPreview(true);
      }
    }

    //return a promise that resolves with a File instance
    async function urltoFile(url: string, filename: string) {
      const res = await fetch(url);
      const buf = await res.arrayBuffer();
      return new File([buf], filename);
    }
  }, [webcamRef]);

  const handleNext = () => {
    setOpenView(true);
    setOpenCamera(false);
    setOpenPreview(false);
    setOpen(false);
    setUrl('');
  };

  return (
    <Page title="Vehicle Registration" img={isDesktop ? ProfileBG : ''}>
      {openCamera && !isDesktop ? (
        <>
          <BackIcon
            onClick={() => {
              setOpenCamera(false);
              setOpen(false);
            }}
          >
            <ArrowBackIosIcon sx={{ pl: 0.6 }} fontSize="small" />
          </BackIcon>
          <CameraAdjust>
            {openPreview ? (
              <ViewDocument
                openAdd={handleNext}
                open={openPreview}
                image={url}
                close={setOpenPreview}
              />
            ) : (
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                screenshotQuality={1}
                imageSmoothing
                className={classes.camera}
              />
            )}
            <CaptureButton onClick={capture}>
              <Capture />
            </CaptureButton>
          </CameraAdjust>
        </>
      ) : (
        <Wrapper sx={{ marginBottom: 5 }}>
          <MainWrapper>
            {!isDesktop && (
              <NavigateBeforeIcon
                sx={{ color: 'grey.0', position: 'absolute', top: 40, left: 17 }}
                onClick={() => navigate(-1)}
              />
            )}
            <Typography variant="h3" textAlign="center" marginBottom={4}>
              Vehicle Registration
            </Typography>

            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Grid container columnSpacing={1}>
                <Grid item xs={6} columnSpacing={1}>
                  <RHFSelectField
                    name="make"
                    placeholder="Make"
                    options={['Audi', 'Tesla', 'GMC', 'Ford', 'Toyota']}
                  />
                </Grid>
                <Grid item xs={6} columnSpacing={1}>
                  <RHFTextField name="model" placeholder="Model" />
                </Grid>
                <Grid item xs={6} columnSpacing={1}>
                  <RHFTextField name="plate_number" placeholder="Plate Number" type="number" />
                </Grid>
                <Grid item xs={6} columnSpacing={1}>
                  <RHFSelectField
                    name="emirate"
                    placeholder="Emirate"
                    options={['Dubai', 'Cyprus', 'Lebanon', 'Jordan', 'Qatar']}
                  />
                </Grid>
                <Grid item xs={6} columnSpacing={1}>
                  <RHFSelectField
                    name="year"
                    placeholder="Year"
                    options={['2012', '2015', '2016', '2018', '2019']}
                  />
                </Grid>
                <Grid item xs={6} columnSpacing={1}>
                  <RHFSelectField
                    name="colour"
                    placeholder="Colour"
                    options={['Red', 'White', 'Black', 'Blue', 'Pink']}
                  />
                </Grid>
                <Grid item xs={12} columnSpacing={1}>
                  <RHFTextField name="registered_owner" placeholder="Registered Owner" />
                </Grid>

                <Grid item xs={12} columnSpacing={1}>
                  <RHFTextField
                    name="emergency_contact"
                    placeholder="Emergency Contact"
                    type="number"
                  />
                </Grid>
              </Grid>
              <UploadContainer
                fileSrc={fileSrc}
                setFileSrc={setFileSrc}
                setShowPreview={setShowPreview}
                setOpenCamera={setOpenCamera}
              />
              <SubmitButton
                variant="outlined"
                sx={{ mb: 1.5, mt: 2 }}
                disabled={!fileSrc[0]?.name}
                type="submit"
              >
                Submit Vehicle Details
              </SubmitButton>
            </FormProvider>
          </MainWrapper>
        </Wrapper>
      )}
    </Page>
  );
}
