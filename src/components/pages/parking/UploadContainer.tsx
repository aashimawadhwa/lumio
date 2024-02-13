import { Dispatch, SetStateAction, useCallback } from 'react';

// @mui
import { styled, Typography, Box, Grid, Button, Card } from '@mui/material';
import useResponsive from 'src/hooks/useResponsive';

// library
import { useDropzone } from 'react-dropzone';

// icons and images
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import UploadNewSVGIcon from 'src/assets/svg/icon_uploadNewSVG';

const UploadBox = styled(Box)(({ theme }) => ({
  border: `0.15rem dashed ${theme.palette.grey[400]}`,
  borderRadius: '9px',
  padding: theme.spacing(3, 1.5),
  [theme.breakpoints.down('sm')]: {
    border: 'transparent',
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.grey[600],
  },
}));


const BrowseButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(0.75, 2.5),
  fontSize: '1rem',
  '&:hover': {
    backgroundColor: theme.palette.grey[0],
    color: theme.palette.grey[900],
  },
  [theme.breakpoints.down('sm')]: {
    margin: theme.spacing(0, 1),
  },
}));

const DocumentPreviewCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.grey[600],
  padding: theme.spacing(1.3, 0),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderRadius: '8px',
  marginBottom: theme.spacing(1),
  borderBottom: '4px solid #369975',
}));

interface Picture {
  preview: string;
  lastModified: number;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}

interface Props {
  setFileSrc: Dispatch<SetStateAction<Picture[]>>;
  fileSrc: Picture[];
  setShowPreview: Dispatch<SetStateAction<boolean>>;
  docs?: Picture[];
  setDocs?: Dispatch<SetStateAction<Picture[]>>;
  setImage?: Dispatch<SetStateAction<string>>;
  docType?: string;
  setOpenCamera: Dispatch<SetStateAction<boolean>>;
}

export default function UploadContainer({
  setFileSrc,
  fileSrc,
  setDocs,
  setOpenCamera,
}: Props): React.ReactElement {
  const onDrop = useCallback(
    (acceptedFiles) => {
      const imagePreview = acceptedFiles.map((file: any) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setFileSrc(imagePreview);
      if (imagePreview && setDocs) {
        setDocs((docs) => [...docs, imagePreview]);
      }
    },
    [setDocs, setFileSrc]
  );
  const { getRootProps, getInputProps, open, fileRejections } = useDropzone({
    onDrop,
    noClick: true,
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
  });
  const rejectedFiles = fileRejections.map(({ file, errors }) => (
    <div key={file.name}>
      {errors.map((e) => (
        <div key={e.code}>
          <Typography mt={3} align="center" color="error" variant="h6">
            Invalid File Type !!
          </Typography>
          <Typography mt={1} align="center" color="error" variant="h6">
            {e.message}
          </Typography>
        </div>
      ))}
    </div>
  ));
  const isDesktop = useResponsive('up', 'sm');
  return (
    <>
      {isDesktop ? (
        <>
          <UploadBox {...getRootProps()}>
            <Typography variant="subtitle1" align="center" color="grey.400" mb={2}>
              Upload Mulkiya Registration
            </Typography>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item sm={5}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <UploadNewSVGIcon />
                  <Typography variant="body2" ml={0.5} color="grey.500">
                    Drag and Drop Here
                  </Typography>
                </Box>
              </Grid>
              <Grid item sm={2}>
                <Typography variant="body2" color="grey.500" m={0.5}>
                  OR
                </Typography>
              </Grid>
              <Grid item sm={5}>
                <BrowseButton onClick={open}>Browse Files</BrowseButton>
              </Grid>
            </Grid>
            <input {...getInputProps()} />
          </UploadBox>

          <Typography variant="subtitle2" color="grey.500" align="left" mt={1.5} mb={3}>
            The accepted format is .png, .jpg and maximum size limit for the pdf to be uploaded is
            10MB.
          </Typography>
        </>
      ) : (
        <UploadBox {...getRootProps()}>
          <Typography variant="h6" align="center" color="grey.0" mb={2}>
            Upload Mulkiya Registration
          </Typography>
          <Typography variant="body2" color="grey.500" align="center" mb={3}>
            Both the front and back side of the document.
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BrowseButton onClick={open}>Browse Files</BrowseButton>

            <BrowseButton onClick={() => setOpenCamera(true)}>Capture</BrowseButton>
          </Box>
          <input {...getInputProps()} />
          <Typography variant="subtitle2" color="grey.500" align="left" mt={1.5} mb={3}>
            The accepted format is .png, .jpg and maximum size limit for the pdf to be uploaded is
            10MB.
          </Typography>
        </UploadBox>
      )}

      <>
        {fileSrc[0]?.name ? (
          <DocumentPreviewCard>
            <Box sx={{ textAlign: 'left', pl: 2 }}>
              <Typography color="grey.500" variant="body1">
                Document
              </Typography>
              <Typography variant="subtitle1" width="15rem" noWrap>
                {fileSrc[0]?.name ? fileSrc[0]?.name : `my-doc.jpg`}
              </Typography>
            </Box>
            <Box sx={{ mr: 1 }}>
              <CheckCircleIcon fontSize="large" sx={{ color: '#369975' }} />
            </Box>
          </DocumentPreviewCard>
        ) : (
          ''
        )}
      </>

      {fileRejections.length > 0 && rejectedFiles}
    </>
  );
}
