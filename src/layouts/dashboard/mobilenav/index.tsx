// @mui
import { Box, Typography, IconButton, styled, Grid } from '@mui/material';

import ArrowBackIos from '@mui/icons-material/ArrowBackIos';

import { useNavigate } from 'react-router-dom';

interface Props {
  title?: string;
  rightNav?: React.ReactNode;
  leftNav?: React.ReactNode;
  subtitle?: string;
}

export default function MobileHeader({ title, rightNav, leftNav, subtitle }: Props) {
  return (
    <Grid px={2} pt={2} pb={3} sx={{ display: 'flex', alignItems: 'center' }} container>
      <Grid sx={{ textAlign: 'start' }} item xs={2} sm={2} md={2} lg={2}>
        {leftNav}
      </Grid>
      <Grid textAlign="center" item xs={8} sm={8} md={8} lg={8}>
        <Box>
          <Typography variant="h5" color="grey.400">
            {title}
          </Typography>
          <Typography variant="body1" color="grey.500">
            {subtitle}
          </Typography>
        </Box>
      </Grid>
      <Grid sx={{ textAlign: 'end' }} item xs={2} sm={2} md={2} lg={2}>
        {rightNav}
      </Grid>
    </Grid>
  );
}
