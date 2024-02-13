//react
import { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router';
import Webcam from 'react-webcam';
import Capture from 'src/assets/svg/icon_capture';

//@mui
import { Box, Grid, styled, Button, Typography, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Divider from '@mui/material/Divider';
import VisibilityIcon from '@mui/icons-material/Visibility';

//images
import Bg from 'src/assets/images/InboxBG.png';
import Property1 from 'src/assets/images/ContractIMG.png';

//icons
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import LocationOnIcon from '@mui/icons-material/LocationOn';

//hooks
import useResponsive from 'src/hooks/useResponsive';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import useIsMountedRef from 'src/hooks/useIsMountedRef';

//components
import { Wrapper } from 'src/components/auth/styledComponents/styles';
import Page from 'src/components/Page';
import { FormProvider } from 'src/components/hook-form';
import RHFSelectField from 'src/components/hook-form/RHFSelectField';
import RHFMessageField from 'src/components/hook-form/RHFMessageField';
import UploadContainer from './UploadContainer';
import ViewDocument from 'src/components/pages/document/ViewDocument';
import MobileHeader from 'src/layouts/dashboard/mobilenav';
import DeleteSVGIcon from 'src/assets/svg/icon_deleteIconSVG';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { ContractData } from 'src/utils/constant';

const PropertiesWrapper = styled('div')(({ theme }) => ({
  background: theme.palette.grey[900],
  maxWidth: '808px',
  borderRadius: '1rem',
  padding: theme.spacing(3.5),
  [theme.breakpoints.down('md')]: {
    margin: theme.spacing(2),
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
    margin: theme.spacing(0),
    width: '100%',
  },
}));

const LeftWrapper = styled('div')(({ theme }) => ({
  background: theme.palette.grey[800],
  borderRadius: '16px',
  maxWidth: '100%',
  [theme.breakpoints.down('sm')]: {
    background: theme.palette.grey[600],
    margin: theme.spacing(2),
  },
  [theme.breakpoints.down(300)]: {
    margin: theme.spacing(1),
  },
}));

const Wrap = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),

  [theme.breakpoints.down(300)]: {
    padding: theme.spacing(0, 0.5),
  },
}));
const Wrap2 = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  [theme.breakpoints.down(300)]: {
    padding: theme.spacing(1),
  },
}));

const InsideWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),

  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0),
  },
  [theme.breakpoints.down(300)]: {
    padding: theme.spacing(1),
  },
}));

const ImageWrapper = styled('img')(({ theme }) => ({
  borderRadius: '4px',
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '52%',
    borderRadius: '8px',
  },
}));

const CustomText = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[400],
  margin: theme.spacing(0.5, 0),
  '& span': {
    color: theme.palette.grey[500],
  },
}));

const ItemWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  cursor: 'pointer',
}));

const DetailsWrapper = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    marginTop: '16px',
  },
}));

const VerticalDivider = styled(Box)(({ theme }) => ({
  width: '2px',
  backgroundColor: theme.palette.grey[500],
  margin: theme.spacing(0, 3.5),
  opacity: 0.2,
  [theme.breakpoints.down('md')]: {
    margin: theme.spacing(0, 2.5),
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

const CustomIconButton = styled(IconButton)(({ theme }) => ({
  background: theme.palette.grey[500],
  width: '44px',
  height: '44px',
  [theme.breakpoints.down('sm')]: {
    ':hover': {
      background: theme.palette.grey[800],
    },
  },
}));

type FormValuesProps = {
  type_of_issue: string;
  issue_detail: string;
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
const useStyles = makeStyles(() => ({
  camera: {
    height: '100%',
    width: '100%',
    objectFit: 'fill',
  },
}));

const videoConstraints = {
  facingMode: 'user',
};
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
const BackIcon = styled(IconButton)(({ theme }) => ({
  background: theme.palette.grey[200],
  position: 'absolute',
  left: 10,
  top: 10,
}));
const RightWrapper = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    marginTop: theme.spacing(2),
  },
  [theme.breakpoints.down('sm')]: {
    margin: theme.spacing(0, 2),
  },
}));
const Documentpreveiw = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.grey[600],
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderRadius: '8px',
  marginBottom: theme.spacing(1),
  marginTop: theme.spacing(1),
}));

const SummaryWrapper = styled('div')(({ theme }) => ({
  // maxWidth: '100%',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.grey[700],
  borderRadius: '8px',
}));

export default function MaintenanceRequest() {
  const [openSummary, setOpenSummary] = useState(false);
  const [issueType, setIssueType] = useState('');
  const [message, setMessage] = useState('');

  const isDesktop = useResponsive('up', 'sm');
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const isMountedRef = useIsMountedRef();

  const EditFormSchema = Yup.object().shape({
    type_of_issue: Yup.string().required('Please select one issue'),
    issue_detail: Yup.string().required('Details is required'),
  });

  const defaultValues = {
    type_of_issue: '',
    issue_detail: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(EditFormSchema),
    defaultValues,
  });

  const { reset, setError, handleSubmit } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    setSubmitting(true);
    try {
      setIssueType(data.type_of_issue);
      setMessage(data.issue_detail);
      setOpenSummary(true);
    } catch (error) {
      console.log('error');
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.message });
      }
    }
  };

  //new
  const [fileSrc, setFileSrc] = useState<Picture[]>([]);

  //cam
  const classes = useStyles();
  const [openPreview, setOpenPreview] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [openCamera, setOpenCamera] = useState<boolean>(false);
  const [url, setUrl] = useState<string>('');
  const [file, setFile] = useState<string | Blob>('');
  const [open, setOpen] = useState(false);
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
    <Page title="Maintenance Request" img={isDesktop ? Bg : ''}>
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
          <PropertiesWrapper>
            {isDesktop ? (
              <Typography variant="h3" mb={4} align="center">
                Maintenance Request
              </Typography>
            ) : (
              <MobileHeader
                leftNav={
                  <IconButton onClick={() => navigate(-1)}>
                    <ArrowBackIosIcon sx={{ fontSize: 'medium' }} />
                  </IconButton>
                }
                title="Maintenance Request"
              />
            )}
            {!isDesktop && !openSummary && (
              <Box px={2}>
                <Typography variant="h2" color="grey.0" mb={1}>
                  Facing some issue at your property?
                </Typography>
                <Typography variant="h6" color="grey.500" mb={2}>
                  Please fill out this form for maintenance request.
                </Typography>
              </Box>
            )}

            <Grid container>
              <Grid item xs={12} sm={12} md={5} lg={5}>
                <LeftWrapper>
                  {isDesktop ? (
                    <>
                      <ImageWrapper src={Property1} />
                      <InsideWrapper>
                        <Typography variant="body1" color="grey.400">
                          The Fold
                        </Typography>
                        <Typography variant="h2" color="grey.0">
                          Unit 2302
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                          <LocationOnIcon
                            fontSize="small"
                            sx={{ color: 'grey.400', mr: 1, cursor: 'pointer' }}
                          />
                          <Typography
                            variant="subtitle1"
                            color="grey.500"
                            sx={{ cursor: 'pointer' }}
                          >
                            Location
                          </Typography>
                        </Box>
                        {ContractData.map((item: any) => (
                          <ItemWrapper key={item}>
                            <Typography variant="subtitle1" color="grey.500">
                              {item.name}
                            </Typography>
                            <Typography variant="h6" color="grey.400">
                              {item.idNo}
                            </Typography>
                          </ItemWrapper>
                        ))}
                      </InsideWrapper>
                    </>
                  ) : (
                    <>
                      {!isDesktop && !openSummary && (
                        <Wrap2>
                          <ImageWrapper src={Property1} />
                          <InsideWrapper>
                            <Wrap>
                              <Box>
                                <Typography variant="body1" color="grey.400" mb={1}>
                                  Current contract
                                </Typography>
                                <Typography variant="h5" color="grey.0" mb={1}>
                                  Al Safa Villa #303
                                </Typography>
                                <Typography variant="body1" color="grey.400" mb={1}>
                                  1049A394JL00122
                                </Typography>
                              </Box>
                              <Box>
                                <CustomText variant="body2">
                                  Started: <span>07/09/22</span>
                                </CustomText>
                                <CustomText variant="body2">
                                  Expires: <span>06/10/23</span>
                                </CustomText>
                              </Box>
                            </Wrap>
                          </InsideWrapper>
                        </Wrap2>
                      )}
                    </>
                  )}
                  {!openSummary && (
                    <>
                      <Divider />
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <VisibilityIcon />
                        <Typography
                          variant="h5"
                          color="grey.0"
                          paddingLeft={1}
                          paddingBottom={2}
                          paddingTop={2}
                        >
                          View this Property
                        </Typography>
                      </Box>
                    </>
                  )}
                </LeftWrapper>
              </Grid>
              <VerticalDivider />
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <>
                  {openSummary ? (
                    <>
                      <RightWrapper>
                        <SummaryWrapper>
                          <Box>
                            <Typography variant="body1" color="grey.500">
                              Summary
                            </Typography>
                            <Typography variant="subtitle1" color="grey.0" marginTop={1}>
                              {issueType}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Box>
                              <Typography variant="body2" color="grey.500" marginTop={2}>
                                Contract
                              </Typography>
                              <Typography variant="body2" color="grey.500" marginTop={1}>
                                For Property:
                              </Typography>
                              <Typography variant="body2" color="grey.500" marginTop={1}>
                                Description:
                              </Typography>
                            </Box>
                            <Box>
                              <Typography variant="body2" color="grey.0" marginTop={2}>
                                1049A394JL00122
                              </Typography>
                              <Typography variant="body2" color="grey.0" marginTop={1}>
                                Al Safa Villa #303
                              </Typography>
                              <Typography variant="body2" color="grey.0" marginTop={1}>
                                {message}
                              </Typography>
                            </Box>
                          </Box>
                        </SummaryWrapper>
                        <Typography variant="subtitle2" color="grey.500" marginTop={2}>
                          Documents Attached:
                        </Typography>
                        <Documentpreveiw>
                          <Box sx={{ width: '60%' }}>
                            <Typography color="grey.500" variant="body1">
                              Document
                            </Typography>
                            <Typography variant="subtitle1" width="15rem">
                              {fileSrc[0]?.name ? fileSrc[0]?.name : `my-doc.jpg`}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex' }}>
                            <Box marginRight={1}>
                              <CustomIconButton>
                                <VisibilityOutlinedIcon
                                  fontSize="small"
                                  sx={{ color: 'grey.400' }}
                                />
                              </CustomIconButton>
                            </Box>
                            <Box>
                              <CustomIconButton>
                                <DeleteSVGIcon />
                              </CustomIconButton>
                            </Box>
                          </Box>
                        </Documentpreveiw>
                        <SubmitButton
                          variant="outlined"
                          sx={{ mb: 1.5, mt: 2 }}
                          onClick={() => setOpenSummary(false)}
                        >
                          Submit Request
                        </SubmitButton>
                      </RightWrapper>
                    </>
                  ) : (
                    <>
                      <Box>
                        {isDesktop && (
                          <Box sx={{ mt: { xs: 2, sm: 0 } }}>
                            <Typography variant="h2" color="grey.0" mb={1}>
                              Facing some issue at your property?
                            </Typography>
                            <Typography variant="h6" color="grey.500" mb={2}>
                              Please fill out this form for maintenance request.
                            </Typography>
                          </Box>
                        )}
                      </Box>
                      <Box px={1}>
                        <DetailsWrapper>
                          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                            <RHFSelectField
                              name="type_of_issue"
                              placeholder="Type of Issue"
                              options={[
                                'General Maintenance',
                                'All Maintenance',
                                'Full Maintenance',
                              ]}
                            />
                            <RHFMessageField
                              name="issue_detail"
                              placeholder="Describe the issue in detail"
                              minRows={5}
                            />
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
                              Continue
                            </SubmitButton>
                          </FormProvider>
                        </DetailsWrapper>
                      </Box>
                    </>
                  )}
                </>
              </Grid>
            </Grid>
          </PropertiesWrapper>
        </Wrapper>
      )}
    </Page>
  );
}
