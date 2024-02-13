import { Dispatch, SetStateAction } from 'react';

// @mui
import { Dialog, IconButton, styled } from '@mui/material';

// icons
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const PreviewImage = styled(Dialog)(({ theme }) => ({
  backgroundColor: theme.palette.grey[900],
  [theme.breakpoints.down('sm')]: {
    paddingTop: '50%',
  },
}));

const Image = styled('img')(({ theme }) => ({
  height: '100%',
  width: '100%',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  objectFit: 'cover',
  [theme.breakpoints.down('sm')]: {
    objectFit: 'contain',
  },
}));

const ActionButton = styled(IconButton)(({ theme }) => ({
  height: '50px',
  width: '50px',
  margin: theme.spacing(0, 3),
}));

interface Props {
  open: boolean;
  image: string;
  close: Dispatch<SetStateAction<boolean>>;
  openAdd: () => void;
}

export default function PreviewDialog({ open, image, close, openAdd }: Props) {
  return (
    <PreviewImage
      sx={{
        '.MuiDialog-paperFullScreen': {
          m: 0,
        },
      }}
      PaperProps={{
        style: {
          backgroundColor: '#1D1D1D',
        },
      }}
      hideBackdrop={true}
      fullScreen
      open={open}
    >
      <div style={{ position: 'relative' }}>
        <Image alt="im" src={image} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <ActionButton onClick={() => close(false)}>
          <RestartAltIcon sx={{ color: '#fff' }} fontSize="large" />
        </ActionButton>
        <ActionButton onClick={openAdd}>
          <CheckCircleIcon sx={{ color: '#fff' }} fontSize="large" />
        </ActionButton>
      </div>
    </PreviewImage>
  );
}
