// @mui
import { Box, styled, Typography } from '@mui/material';

// icons

import IconRequest from 'src/assets/svg/icon_request';
import NocSVGIcon from 'src/assets/svg/icon_nocSVG';
import ProfileSVGIcon from 'src/assets/svg/icon_profileSVG';

//components
import { HorizontalScrollBox } from 'src/pages/MyProperties';

const usedServices = [
  { title: 'My Properties', icon: <NocSVGIcon /> },
  { title: 'Services', icon: <IconRequest /> },
  { title: 'Visitors', icon: <ProfileSVGIcon /> },
  { title: 'Visitors', icon: <ProfileSVGIcon /> },
  { title: 'Visitors', icon: <ProfileSVGIcon /> },
];

const ScrollBox = styled(HorizontalScrollBox)(({ theme }) => ({
  '::-webkit-scrollbar': {
    display: 'none',
  },
}));

const Card = styled(Box)(({ theme }) => ({
  background: theme.palette.grey[100],
  padding: theme.spacing(2.75, 0),
  borderRadius: '8px',
  textAlign: 'center',
  minWidth: '156px',
  marginRight: theme.spacing(1.5),
  cursor: 'pointer',
  [theme.breakpoints.down('sm')]: {
    background: '#000',
    opacity: 0.7,
    padding: theme.spacing(2, 0),
    minWidth: '136px',
  },
}));

export default function ScrollContainer() {
  return (
    <ScrollBox>
      {usedServices.map((item, i) => (
        <Card key={i}>
          {item.icon}
          {/* 12, 400 */}
          <Typography variant="body2" color="grey.400" mt={1}>
            {item.title}
          </Typography>
        </Card>
      ))}
    </ScrollBox>
  );
}
