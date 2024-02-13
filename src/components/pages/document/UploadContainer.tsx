import { Dispatch, SetStateAction, useCallback, useState } from 'react';

// @mui
import { styled, Typography, Box, Grid, Button, Card, LinearProgress } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// library
import { useDropzone } from 'react-dropzone';

// icons
import ClearIcon from '@mui/icons-material/Clear';
import DeleteSVGIcon from 'src/assets/svg/icon_deleteIconSVG';
import UploadNewSVGIcon from 'src/assets/svg/icon_uploadNewSVG';
import Visibility from '@mui/icons-material/Visibility';

// components
import { CustomIconButton } from 'src/components/pages/document/EditDocument';

const UploadBox = styled(Box)(({ theme }) => ({
  border: `0.15rem dashed ${theme.palette.grey[400]}`,
  borderRadius: '9px',
  padding: theme.spacing(5, 1.5),
}));

const BrowseButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(0.75, 2.5),
  fontSize: '1rem',
  '&:hover': {
    backgroundColor: theme.palette.grey[0],
    color: theme.palette.grey[900],
  },
}));

const Preview = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.grey[600],
  borderRadius: '8px',
  marginBottom: theme.spacing(1),
}));

const DocumentPreviewCard = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(1.3, 0),
}));

const SubmitButton = styled(LoadingButton)(({ theme }) => ({
  padding: theme.spacing(2, 0),
  marginTop: theme.spacing(3),
  width: '90%',
  '&.MuiLoadingButton-root': {
    ':disabled': {
      color: theme.palette.grey[900],
      backgroundColor: theme.palette.grey[500],
    },
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

interface Props {
  title: string;
  edit: boolean;
  handleSubmit?: () => void;
  setFileSrc: Dispatch<SetStateAction<Picture[]>>;
  fileSrc: Picture[];
  setShowPreview: Dispatch<SetStateAction<boolean>>;
  docs: Picture[];
  setDocs?: Dispatch<SetStateAction<Picture[]>>;
  setImage?: Dispatch<SetStateAction<string>>;
  docType?: string;
}

export default function UploadContainer({
  title,
  edit,
  handleSubmit,
  setFileSrc,
  fileSrc,
  setShowPreview,
  docs,
  setDocs,
  setImage,
  docType,
}: Props): React.ReactElement {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [docIndex, setDocIndex] = useState(0);

  const onDrop = useCallback(
    (acceptedFiles) => {
      setDocIndex(docs.length);
      setLoading(true);
      setProgress(10);
      const imagePreview = acceptedFiles.map((file: any) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setFileSrc(imagePreview);
      if (imagePreview && setDocs) {
        setDocs((docs) => [...docs, imagePreview]);
      }
      setTimeout(() => {
        setProgress(100);
      }, 1000);
      setTimeout(() => {
        setLoading(false);
      }, 1800);
    },
    [setDocs, setFileSrc, docs]
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

  const handleDelete = (name: any) => {
    if (setDocs) {
      const newDocs = docs?.filter((d: any) => d[0].name !== name);
      setDocs(newDocs);
    }
  };

  return (
    <>
      <UploadBox {...getRootProps()}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item sm={12} md={6} lg={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <UploadNewSVGIcon />
              <Typography variant="body2" ml={0.5} color="grey.500">
                Drag and Drop Here
              </Typography>
            </Box>
          </Grid>
          <Grid item sm={12} md={1} lg={1}>
            <Typography variant="body2" color="grey.500" m={0.5}>
              OR
            </Typography>
          </Grid>
          <Grid item sm={12} md={5} lg={5}>
            <BrowseButton onClick={open}>Browse Files</BrowseButton>
          </Grid>
        </Grid>
        <input {...getInputProps()} />
      </UploadBox>

      <Typography variant="subtitle2" color="grey.500" align="left" mt={1.5} mb={3}>
        The accepted format is .png, .jpg and maximum size limit for the pdf to be uploaded is 10MB.
      </Typography>

      {edit ? (
        <>
          <DocumentPreviewCard>
            <Box sx={{ textAlign: 'left', pl: 2 }}>
              <Typography variant="subtitle1" width="15rem" noWrap>
                {fileSrc[0]?.name ? fileSrc[0]?.name : `my-${docType}.jpg`}
              </Typography>
              <Typography color="grey.500" variant="body1">
                {docType}
              </Typography>
            </Box>
            <Box sx={{ mr: 1 }}>
              <CustomIconButton onClick={() => setShowPreview(true)} sx={{ mr: 1 }}>
                <Visibility fontSize="small" />
              </CustomIconButton>
            </Box>
          </DocumentPreviewCard>
        </>
      ) : (
        <>
          {docs?.map((item: any, index: number) => (
            <Preview key={index}>
              <DocumentPreviewCard>
                <Box sx={{ textAlign: 'left', pl: 2 }}>
                  <Typography variant="subtitle1" width="15rem">
                    {item[0]?.name}
                  </Typography>
                  <Typography color="grey.500" variant="body1">
                    Document
                  </Typography>
                </Box>
                <Box sx={{ mr: 1 }}>
                  {loading && index === docIndex ? (
                    <CustomIconButton
                      onClick={() => handleDelete(item[0]?.name)}
                      sx={{
                        width: '30px',
                        height: '30px',
                      }}
                    >
                      <ClearIcon fontSize="small" />
                    </CustomIconButton>
                  ) : (
                    <>
                      <CustomIconButton
                        onClick={() => {
                          if (item[0].preview && setImage) {
                            setImage(item[0].preview);
                            setShowPreview(true);
                          }
                        }}
                        sx={{ mr: 1 }}
                      >
                        <Visibility fontSize="small" />
                      </CustomIconButton>
                      <CustomIconButton onClick={() => handleDelete(item[0]?.name)}>
                        <DeleteSVGIcon />
                      </CustomIconButton>
                    </>
                  )}
                </Box>
              </DocumentPreviewCard>
              <LinearProgress
                sx={{ height: 3, borderRadius: '30px' }}
                value={index === docIndex ? progress : 100}
                variant="determinate"
              />
            </Preview>
          ))}
        </>
      )}
      {fileRejections.length > 0 && rejectedFiles}
      <SubmitButton onClick={handleSubmit}>{title}</SubmitButton>
    </>
  );
}
