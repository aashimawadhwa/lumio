import { useCallback, useState } from 'react';

// @mui
import { styled, Typography, Box, IconButton } from '@mui/material';

// library
import { useDropzone } from 'react-dropzone';

// hooks
import useResponsive from 'src/hooks/useResponsive';

// icons
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CloseIcon from '@mui/icons-material/Close';
import DeleteSVGIcon from 'src/assets/svg/icon_deleteIconSVG';
import UploadNewSVGIcon from 'src/assets/svg/icon_uploadNewSVG';
import Visibility from '@mui/icons-material/Visibility';

//components
import PreviewDialog from 'src/components/pages/document/PreviewDialog';
import MobileHeader from 'src/layouts/dashboard/mobilenav';
import UploadContainer from 'src/components/pages/document/UploadContainer';

// ----------------------------------------------------------------------

const BoxStyle = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[900],
  position: 'relative',
  maxWidth: '449px',
  borderRadius: '16px',
  padding: theme.spacing(4.5),
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
    width: '100%',
    padding: 0,
  },
}));

const BoxWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0, 2),
  },
}));

const Card = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  padding: theme.spacing(1.5, 2),
  borderRadius: '8px',
  backgroundColor: theme.palette.grey[600],
  [theme.breakpoints.down('sm')]: {
    backgroundColor: theme.palette.grey[800],
  },
}));

export const CustomIconButton = styled(IconButton)(({ theme }) => ({
  background: theme.palette.grey[900],
  width: '36px',
  height: '36px',
  [theme.breakpoints.down('sm')]: {
    backgroundColor: theme.palette.grey[600],
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

interface Picture {
  preview: string;
  lastModified: number;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}

interface EditProps {
  documentType: string;
  fileName: string;
  img: string;
  handleSubmit: () => void;
  handleClose: (document: any) => void;
}

const DocumentText = () => (
  <Typography variant="body1" color="grey.500" align="left" mt={1.5}>
    The accepted format is .png, .jpg and maximum size limit for the pdf to be uploaded is 10MB.
  </Typography>
);

export default function EditDocuments({
  documentType,
  fileName,
  img,
  handleClose,
  handleSubmit,
}: EditProps): React.ReactElement {
  const [fileSrc, setFileSrc] = useState<Picture[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  const isDesktop = useResponsive('up', 'sm');

  const onDrop = useCallback((acceptedFiles) => {
    const imagePreview = acceptedFiles.map((file: any) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setFileSrc(imagePreview);
  }, []);

  const { open, fileRejections } = useDropzone({
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

  return (
    <BoxStyle>
      {isDesktop ? (
        <Box>
          <IconButton onClick={handleClose} sx={{ position: 'absolute', right: 5, top: 5 }}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h3" pb={{ xs: 3, md: 4.5 }}>
            Edit {documentType}
          </Typography>
        </Box>
      ) : (
        <MobileHeader
          leftNav={
            <IconButton onClick={handleClose}>
              <ArrowBackIosIcon sx={{ fontSize: 'medium' }} />
            </IconButton>
          }
          title={`Edit ${documentType}`}
        />
      )}
      <BoxWrapper>
        {isDesktop ? (
          <UploadContainer
            handleSubmit={handleSubmit}
            docType={documentType}
            fileSrc={fileSrc}
            setFileSrc={setFileSrc}
            setShowPreview={setShowPreview}
            edit={true}
            title="Save Changes"
            docs={[]}
          />
        ) : (
          <>
            <Card mt={isDesktop ? 1.5 : 0}>
              <Box sx={{ flex: 1, textAlign: 'left' }}>
                <Typography variant="body1" sx={{ opacity: 0.5 }}>
                  Document
                </Typography>
                <Typography variant="subtitle1">{fileName}</Typography>
              </Box>
              <CustomIconButton onClick={() => setShowPreview(true)} sx={{ marginRight: '8px' }}>
                <Visibility fontSize="small" />
              </CustomIconButton>
              <CustomIconButton>
                <DeleteSVGIcon />
              </CustomIconButton>
            </Card>
            <MobileUpload onClick={open} mt={1.5}>
              <Typography variant="subtitle1" color="grey.400">
                Upload Another
              </Typography>
              <UploadNewSVGIcon />
            </MobileUpload>
            <DocumentText />
            {fileRejections.length > 0 && rejectedFiles}
          </>
        )}
      </BoxWrapper>
      <PreviewDialog
        close={setShowPreview}
        open={showPreview}
        image={fileSrc[0]?.preview ? fileSrc[0]?.preview : img}
      />
    </BoxStyle>
  );
}
