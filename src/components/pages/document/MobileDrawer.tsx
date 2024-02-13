import { Dispatch, SetStateAction, useCallback } from 'react';

// @mui
import { styled, Typography, Drawer, Box, IconButton } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// libraries
import { useDropzone } from 'react-dropzone';

// icons
import CameraSVGIcon from 'src/assets/svg/icon_cameraSVG';
import CloseIcon from '@mui/icons-material/Close';
import DrawerSVGIcon from 'src/assets/svg/icon_drawer_pullDown';
import GalleryIcon from 'src/assets/svg/gallery_icon';

const CustomDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiBackdrop-root': {
    background: 'rgba(0, 0, 0, 0.5)',
  },
  '& .MuiDrawer-paper': {
    backgroundColor: theme.palette.grey[600],
    padding: theme.spacing(1.5, 2, 4.5, 2),
    alignItems: 'center',
  },
}));

const DrawerHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const UploadButton = styled(LoadingButton)(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(1.5),
  padding: theme.spacing(2.5, 0),
}));

interface DrawerProps {
  title: string;
  openDrawer: boolean;
  close: Dispatch<SetStateAction<boolean>>;
  setOpenView: Dispatch<SetStateAction<boolean>>;
  setDocs: Dispatch<SetStateAction<Picture[]>>;
  docs: Picture[];
  setOpenCamera: Dispatch<SetStateAction<boolean>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setProgress: Dispatch<SetStateAction<number>>;
  setDocIndex: Dispatch<SetStateAction<number>>;
}

interface Picture {
  preview: string;
  lastModified: number;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}

export default function MobileDrawer({
  title,
  openDrawer,
  close,
  setOpenView,
  setDocs,
  setOpenCamera,
  setLoading,
  setProgress,
  setDocIndex,
  docs,
}: DrawerProps): React.ReactElement {
  const onDrop = useCallback(
    (acceptedFiles) => {
      setLoading(true);
      setDocIndex(docs.length);
      setProgress(10);
      const imagePreview = Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0]),
      });
      if (imagePreview) {
        setDocs((docs) => [...docs, imagePreview]);
        close(false);
        setOpenView(true);
      }
      setTimeout(() => {
        setProgress(100);
      }, 1000);
      setTimeout(() => {
        setLoading(false);
      }, 1800);
    },

    [setLoading, setDocIndex, docs.length, setProgress, setDocs, close, setOpenView]
  );
  const { open, fileRejections } = useDropzone({
    onDrop,
    multiple: false,
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
  return (
    <CustomDrawer sx={{ zIndex: 432432 }} anchor="bottom" open={openDrawer}>
      <DrawerSVGIcon />
      <Box mt={2.5}>
        <DrawerHeader mb={3}>
          <Typography variant="h3">Upload {title}</Typography>
          <IconButton onClick={() => close(false)} sx={{ backgroundColor: 'grey.900' }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </DrawerHeader>
        <Box>
          <UploadButton onClick={() => setOpenCamera(true)} startIcon={<CameraSVGIcon />}>
            <Typography variant="h5">Take Photo</Typography>
          </UploadButton>
          <UploadButton onClick={open} startIcon={<GalleryIcon />}>
            <Typography variant="h5">Choose from Library</Typography>
          </UploadButton>
          <Box textAlign="center">
            <Typography variant="body1" color="grey.500">
              The accepted format is .png, .jpg and maximum size limit for the pdf to be uploaded is
              10MB.
            </Typography>
          </Box>
          {fileRejections.length > 0 && rejectedFiles}
        </Box>
      </Box>
    </CustomDrawer>
  );
}
