import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';

// @mui
import { Box, styled, Typography, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';

//library
import Webcam from 'react-webcam';

// hooks
import useResponsive from 'src/hooks/useResponsive';

// icons and images
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Capture from 'src/assets/svg/icon_capture';
import ProfileBG from 'src/assets/images/ProfileBG.png';

// components
import { documentData } from 'src/utils/constant';
import { SideDrawer } from 'src/components/pages/document/SideDrawer';
import { Wrapper } from 'src/components/auth/styledComponents/styles';

import AddDocumentDialog from 'src/components/pages/document/AddDocumentDialog';
import DocumentSuccess from 'src/components/pages/document/DocumentSuccess';
import MobileDrawer from 'src/components/pages/document/MobileDrawer';
import MobileHeader from 'src/layouts/dashboard/mobilenav';
import Page from 'src/components/Page';
import ViewDocument from 'src/components/pages/document/ViewDocument';

// ----------------------------------------------------------------------

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

const BoxWrapper = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.grey[900],
  textAlign: 'center',
  display: 'flex',
  alignItem: 'center',
  padding: theme.spacing(4.5),
  borderRadius: '16px',
  margin: theme.spacing(0, 2),
  maxWidth: '874px',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    padding: 0,
    margin: 0,
  },
}));

const BoxStyle = styled(Box)(({ theme }) => ({
  textAlign: 'left',
  '& .active': {
    backgroundColor: theme.palette.grey[0],
    color: theme.palette.grey[700],
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0, 2),
  },
}));

const Card = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.grey[600],
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: theme.spacing(2.5),
  padding: theme.spacing(2, 2, 2, 2.5),
  borderRadius: '8px',
  cursor: 'pointer',
  [theme.breakpoints.down('sm')]: {
    marginTop: theme.spacing(1.5),
  },
}));

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

export default function AddDocuments() {
  const isDesktop = useResponsive('up', 'sm');
  const navigate = useNavigate();
  const [isWrapperOpen, setWrapperOpen] = useState(false);
  const [prevIndex, setPrevIndex] = useState('');
  const [wrapperTitle, setWrapperTitle] = useState('');
  const [isDocumentUpload, setDocumentUpload] = useState(false);
  const [docs, setDocs] = useState<Picture[]>([]);
  const [openPreview, setOpenPreview] = useState(false);

  const [openCamera, setOpenCamera] = useState<boolean>(false);

  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [docIndex, setDocIndex] = useState(0);

  const classes = useStyles();

  const [url, setUrl] = useState<string>('');
  const [file, setFile] = useState<string | Blob>('');

  const [open, setOpen] = useState(false);
  const webcamRef = useRef<Webcam>(null);

  const [openView, setOpenView] = useState(false);

  useEffect(() => {
    if (isWrapperOpen) setWrapperOpen(false);
    if (open) setOpen(false);
  }, [isDesktop]);

  const capture = useCallback(() => {
    setLoading(true);
    setDocIndex(docs.length);
    setProgress(10);
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      urltoFile(imageSrc, 'selfie.png').then(function (file) {
        setFile(file);
        const img: Picture = Object.assign(file, {
          preview: URL.createObjectURL(file),
        });
        setUrl(img.preview);
        setDocs((docs) => [...docs, img]);
      });

      if (imageSrc) {
        setOpenPreview(true);
      }
      setTimeout(() => {
        setProgress(100);
      }, 2000);
      setTimeout(() => {
        setLoading(false);
      }, 2500);
    }

    //return a promise that resolves with a File instance
    async function urltoFile(url: string, filename: string) {
      const res = await fetch(url);
      const buf = await res.arrayBuffer();
      return new File([buf], filename);
    }
  }, [docs.length]);

  const handleToggle = (ind: any, title: any) => {
    if (!isDesktop) {
      setWrapperOpen(!isWrapperOpen);
      setOpen(true);
    } else {
      if (ind === prevIndex || !isWrapperOpen) {
        setWrapperOpen(!isWrapperOpen);
        setDocs([]);
      }
    }
    setPrevIndex(ind);
    setWrapperTitle(title);
  };

  const handleSubmit = () => {
    setDocumentUpload(!isDocumentUpload);
  };

  const handleNext = () => {
    setOpenView(true);
    setOpenCamera(false);
    setOpenPreview(false);
    setOpen(false);
    setUrl('');
  };

  return (
    <Page img={isDesktop ? ProfileBG : ''} title="Upload Documents">
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
        <>
          <Wrapper sx={{ marginBottom: 5 }}>
            {!isDocumentUpload && (
              <BoxWrapper>
                <Box sx={{ minWidth: { xs: '100%', sm: '241px', md: '291px', lg: '341px' } }}>
                  {isDesktop ? (
                    <Box>
                      <Typography variant="h3" pb={4.5}>
                        Upload New Document
                      </Typography>
                    </Box>
                  ) : (
                    <MobileHeader
                      leftNav={
                        <IconButton onClick={() => navigate(-1)}>
                          <ArrowBackIosIcon sx={{ fontSize: 'medium' }} />
                        </IconButton>
                      }
                      title="Upload New Document"
                    />
                  )}
                  <BoxStyle sx={{ mb: { xs: 4.5, sm: 3 } }}>
                    <Typography variant="h2" color="grey.400" pb={!isDesktop ? 1 : 0}>
                      Personal Documents
                    </Typography>
                    {documentData.personalData.map((item, id) => (
                      <Card
                        sx={{ py: 3.2 }}
                        key={id}
                        className={`${
                          item.id === prevIndex && isWrapperOpen && isDesktop ? 'active' : ''
                        }`}
                        onClick={() => handleToggle(item.id, item.documentType)}
                      >
                        <Box sx={{ flex: 1, textAlign: 'left' }}>
                          <Typography variant="subtitle1">{item.documentType}</Typography>
                        </Box>

                        <ArrowForwardIosIcon sx={{ color: '#CAC9C0' }} fontSize="small" />
                      </Card>
                    ))}
                  </BoxStyle>

                  <BoxStyle>
                    <Typography variant="h2" color="grey.400" pb={!isDesktop ? 1 : 0}>
                      Corporate Lease Documents
                    </Typography>

                    {documentData.corporateData.map((item, id) => (
                      <Card
                        key={id}
                        className={`${
                          item.id === prevIndex && isWrapperOpen && isDesktop ? 'active' : ''
                        }`}
                        onClick={() => handleToggle(item.id, item.documentType)}
                      >
                        <Box sx={{ flex: 1, textAlign: 'left' }}>
                          <Typography variant="subtitle1">{item.documentType}</Typography>
                          <Typography variant="body1" color="grey.400">
                            For corporate leases
                          </Typography>
                        </Box>

                        <ArrowForwardIosIcon sx={{ color: '#CAC9C0' }} fontSize="small" />
                      </Card>
                    ))}
                  </BoxStyle>
                </Box>
                {isWrapperOpen && isDesktop ? (
                  <SideDrawer
                    setDocs={setDocs}
                    docs={docs}
                    title={wrapperTitle}
                    handleSubmit={handleSubmit}
                  />
                ) : (
                  <>
                    <MobileDrawer
                      setDocIndex={setDocIndex}
                      setLoading={setLoading}
                      setProgress={setProgress}
                      docs={docs}
                      setDocs={setDocs}
                      openDrawer={open}
                      close={setOpen}
                      setOpenView={setOpenView}
                      title={wrapperTitle}
                      setOpenCamera={setOpenCamera}
                    />
                  </>
                )}
              </BoxWrapper>
            )}
            {isDocumentUpload && <DocumentSuccess />}
          </Wrapper>

          <AddDocumentDialog
            docs={docs}
            loading={loading}
            progress={progress}
            setDocs={setDocs}
            title={wrapperTitle}
            close={setOpen}
            open={openView}
            setOpen={setOpenView}
            docIndex={docIndex}
          />
        </>
      )}
    </Page>
  );
}
