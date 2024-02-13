//react
import { useState } from 'react';

//mui
import { styled, Typography, Box, IconButton, SwipeableDrawer } from '@mui/material';

//icons

import { DocumentsData } from 'src/utils/constant';
import CloseIcon from '@mui/icons-material/Close';
import DownloadSVGIcon from 'src/assets/svg/icon_downloadSVG';
import PullDownIcon from 'src/assets/svg/icon_drawer_pullDown';

//...................................................................

type PropsType = {
  openState: boolean;
  onClose: () => void;
};

const Card = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  padding: theme.spacing(2, 1),
  backgroundColor: theme.palette.grey[800],
  borderBottom: `1px solid ${theme.palette.grey[600]}`,
}));
const CustomIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.grey[900],
  width: '36px',
  height: '36px',
}));

const Header = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBottom: theme.spacing(1),
  borderBottom: `1px solid ${theme.palette.grey[600]}`,
}));

const IconContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  borderRadius: '100%',
  backgroundColor: theme.palette.grey[900],
  padding: theme.spacing(1),
  margin: theme.spacing(0, 0, 1, 0),
  cursor: 'pointer',
}));
const PullDownWrapper = styled('div')(({ theme }) => ({
  display: 'flex',

  justifyContent: 'center',
  padding: theme.spacing(2, 0),
}));
const Wrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2.5, 4, 2.5),
}));

export default function DocumentsDrawer(props: PropsType): React.ReactElement {
  const [, setOpen] = useState<boolean>(false);
  const handleClose = () => {
    props.onClose();
  };

  return (
    <SwipeableDrawer
      sx={{
        backgroundColor: 'rgba(0,0,0,0.7)',
      }}
      hideBackdrop={true}
      anchor="bottom"
      open={props.openState}
      onClose={() => setOpen(false)}
      onOpen={() => {}}
    >
      <Wrapper>
        <PullDownWrapper>
          <PullDownIcon />
        </PullDownWrapper>
        <Header>
          <Typography variant="subtitle1" pb={1}>
            Documents
          </Typography>
          <IconContainer onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconContainer>
        </Header>

        {DocumentsData.map((item: any, i: any) => (
          <Card key={i}>
            <Box>
              <Typography variant="subtitle2">{item.documentType}</Typography>
              <Typography variant="body1" color="grey.400" align="left">
                {item.address} - {item.latestTimestamp}
              </Typography>
            </Box>
            <CustomIconButton>
              <DownloadSVGIcon />
            </CustomIconButton>
          </Card>
        ))}
      </Wrapper>
    </SwipeableDrawer>
  );
}
