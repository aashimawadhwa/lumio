import { useState, Dispatch, SetStateAction } from 'react';

// @mui
import { styled, Typography, Box } from '@mui/material';

// components
import PreviewDialog from 'src/components/pages/document/PreviewDialog';
import UploadContainer from 'src/components/pages/document/UploadContainer';

const VerticalDivider = styled(Box)(({ theme }) => ({
  width: '2px',
  backgroundColor: theme.palette.grey[500],
  margin: theme.spacing(0, 5.25),
  opacity: 0.2,
  [theme.breakpoints.down('md')]: {
    margin: theme.spacing(0, 2.5),
  },
}));

interface SideDrawerProps {
  title: string;
  handleSubmit: () => void;
  docs: Picture[];
  setDocs: Dispatch<SetStateAction<Picture[]>>;
}

interface Picture {
  preview: string;
  lastModified: number;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}

export function SideDrawer({
  title,
  handleSubmit,
  docs,
  setDocs,
}: SideDrawerProps): React.ReactElement {
  const [fileSrc, setFileSrc] = useState<Picture[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  const [image, setImage] = useState('');

  return (
    <>
      <VerticalDivider />
      <Box sx={{ maxWidth: '377px' }}>
        <Typography variant="h3" pb={3}>
          Upload {title}
        </Typography>
        <UploadContainer
          setImage={setImage}
          docs={docs}
          setDocs={setDocs}
          setShowPreview={setShowPreview}
          setFileSrc={setFileSrc}
          fileSrc={fileSrc}
          handleSubmit={handleSubmit}
          edit={false}
          title="Submit"
        />

        <PreviewDialog close={setShowPreview} open={showPreview} image={image} />
      </Box>
    </>
  );
}
