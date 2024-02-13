import { useState, SetStateAction, Dispatch } from 'react';

// @mui
import {
  Card,
  Dialog,
  styled,
  Typography,
  Box,
  IconButton,
  Button,
  LinearProgress,
} from '@mui/material';

// icons
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import DeleteSVGIcon from 'src/assets/svg/icon_deleteIconSVG';
import UploadNewSVGIcon from 'src/assets/svg/icon_uploadNewSVG';
import Visibility from '@mui/icons-material/Visibility';
import ClearIcon from '@mui/icons-material/Clear';

// components
import PreviewDialog from 'src/components/pages/document/PreviewDialog';

const CustomDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-container': {
    alignItems: 'flex-start',
    backgroundColor: theme.palette.grey[900],
    [theme.breakpoints.down('sm')]: {
      backgroundColor: '#000',
    },
  },
}));

const BackIcon = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  left: 10,
  top: 12,
}));

const Preview = styled(Card)(({ theme }) => ({
  borderRadius: '8px',
  marginBottom: theme.spacing(1),
}));
const DocumentPreviewCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(1.3, 0),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

export const CustomIconButton = styled(IconButton)(({ theme }) => ({
  width: '36px',
  height: '36px',
  [theme.breakpoints.down('sm')]: {
    background: theme.palette.grey[900],
    ':hover': {
      background: theme.palette.grey[600],
    },
  },
}));

const MobileUpload = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[400]}`,
  padding: theme.spacing(2.5, 2),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderRadius: '8px',
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(2),
  width: '100%',
  borderColor: theme.palette.grey[0],
  '&:hover': {
    borderColor: theme.palette.grey[0],
    backgroundColor: theme.palette.grey[0],
    color: theme.palette.grey[900],
  },
}));

const CancelButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.grey[900],
  padding: theme.spacing(2),
  width: '100%',
  borderColor: theme.palette.grey[0],
  color: theme.palette.grey[0],
  '&:hover': {
    borderColor: theme.palette.grey[0],
    backgroundColor: 'transparent',
  },
}));

const DocumentText = () => (
  <Typography variant="body1" color="grey.500" align="left" my={2}>
    The accepted format is .png, .jpg and maximum size limit for the pdf to be uploaded is 10MB.
  </Typography>
);

interface Picture {
  preview: string;
  lastModified: number;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  close: Dispatch<SetStateAction<boolean>>;
  docs: Picture[];
  setDocs: Dispatch<SetStateAction<Picture[]>>;
  progress: number;
  loading: boolean;
  docIndex: number;
}

export default function AddDocumentDialog({
  open,
  title,
  setOpen,
  close,
  docs,
  setDocs,
  progress,
  loading,
  docIndex,
}: Props) {
  const [showPreview, setShowPreview] = useState(false);

  const [image, setImage] = useState('');

  const handleDelete = (name: any) => {
    if (setDocs) {
      const newDocs = docs?.filter((d: any) => d.name !== name);
      setDocs(newDocs);
    }
  };
  return (
    <CustomDialog
      sx={{
        '.MuiDialog-paper': {
          m: 0,
          p: 2,
        },
      }}
      PaperProps={{
        style: {
          backgroundColor: '#000',
        },
      }}
      open={open}
      hideBackdrop={true}
    >
      <BackIcon
        onClick={() => {
          setOpen(false);
          setDocs([]);
        }}
      >
        <ArrowBackIosIcon
          sx={{
            fontSize: 'medium',
          }}
        />
      </BackIcon>
      <Typography pb={3} align="center" sx={{ fontSize: '16px' }} fontWeight="600">
        {title}
      </Typography>
      {docs?.map((item: any, i: number) => (
        <Preview key={i}>
          <DocumentPreviewCard>
            <Box sx={{ textAlign: 'left', pl: 2 }}>
              <Typography variant="body1" color="grey.500">
                Document
              </Typography>
              <Typography noWrap width="12rem" variant="subtitle1">
                {item.name}
              </Typography>
            </Box>
            <Box sx={{ mr: 1 }}>
              {loading && docIndex === i ? (
                <CustomIconButton
                  onClick={() => handleDelete(item.name)}
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
                  <CustomIconButton onClick={() => handleDelete(item.name)}>
                    <DeleteSVGIcon />
                  </CustomIconButton>
                </>
              )}
            </Box>
          </DocumentPreviewCard>
          <LinearProgress
            sx={{ height: 3, borderRadius: '30px' }}
            value={i === docIndex ? progress : 100}
            variant="determinate"
          />
        </Preview>
      ))}
      <MobileUpload onClick={() => close(true)} mt={1.5}>
        <Typography variant="subtitle1" color="grey.400">
          Upload Another
        </Typography>
        <UploadNewSVGIcon />
      </MobileUpload>
      <DocumentText />
      <SubmitButton variant="outlined" sx={{ mb: 1.5 }}>
        Submit
      </SubmitButton>
      <CancelButton variant="outlined">Cancel</CancelButton>
      <PreviewDialog open={showPreview} image={image} close={setShowPreview} />
    </CustomDialog>
  );
}
