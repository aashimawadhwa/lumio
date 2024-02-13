import { Dispatch, SetStateAction } from 'react';

// @mui
import { Dialog, IconButton, styled } from '@mui/material';

// hooks
import useResponsive from 'src/hooks/useResponsive';

// icons
import CloseIcon from '@mui/icons-material/Close';

const PreviewImage = styled(Dialog)(({ theme }) => ({
  backgroundColor: theme.palette.grey[900],
  [theme.breakpoints.down('sm')]: {
    paddingTop: '50%',
  },
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  zIndex: 236,
  background: theme.palette.grey[900],
  position: 'absolute',
  top: 10,
  right: 10,
  '&:hover': {
    backgroundColor: theme.palette.grey[900],
  },
  [theme.breakpoints.down('sm')]: {
    top: 3,
    right: 3,
    height: '30px',
    width: '30px',
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

interface Props {
  open: boolean;
  image?: string;
  close: Dispatch<SetStateAction<boolean>>;
}

export default function PreviewDialog({ open, image, close }: Props) {
  const isDesktop = useResponsive('up', 'sm');
  return (
    <PreviewImage
      sx={{
        '.MuiDialog-paperFullScreen': {
          m: 0,
        },
      }}
      PaperProps={{
        style: {
          backgroundColor: '#000',
        },
      }}
      hideBackdrop={true}
      fullScreen
      open={open}
    >
      {isDesktop ? (
        <>
          <CloseButton onClick={() => close(false)}>
            <CloseIcon sx={{ color: '#fff' }} />
          </CloseButton>
          <Image alt="im" src={image} />
        </>
      ) : (
        <div style={{ position: 'relative' }}>
          <CloseButton onClick={() => close(false)}>
            <CloseIcon sx={{ color: '#fff' }} />
          </CloseButton>
          <Image alt="im" src={image} />
        </div>
      )}
    </PreviewImage>
  );
}
