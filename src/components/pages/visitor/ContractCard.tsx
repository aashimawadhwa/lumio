// @mui
import { Box, Typography, styled, Button } from '@mui/material';

// hooks
import useResponsive from 'src/hooks/useResponsive';

// images and icons
import { Visibility } from '@mui/icons-material';
import LocationSVGIcon from 'src/assets/svg/icon_locationSVG';
import Property1 from 'src/assets/images/ContractIMG.png';

//................................................................

const ImageWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[800],
  borderRadius: '16px',
  [theme.breakpoints.down('sm')]: {
    borderRadius: '8px',
    display: 'flex',
    padding: theme.spacing(1.5),
  },
}));

const Image = styled('img')(({ theme }) => ({
  borderRadius: '16px 16px 0px 0px',
  height: '100%',
  width: '100%',
  objectFit: 'cover',
  [theme.breakpoints.down('sm')]: {
    minHeight: '100%',
    borderRadius: '4px',
  },
}));

const ViewButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'inherit',
  color: theme.palette.grey[0],
  width: '100%',
  borderTop: `1px solid ${theme.palette.grey[500]}`,
  borderRadius: 0,
  padding: theme.spacing(2.5, 0),
  '&:hover':{
    backgroundColor: 'inherit'
  },
  [theme.breakpoints.down('lg')]: {
    padding: theme.spacing(2, 0),
  },
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(0.8, 0),
  },
}));

const CustomText = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[500],
  '& span': {
    color: theme.palette.grey[400],
  },
}));

export default function ContractCard() {
  const isDesktop = useResponsive('up', 'sm');
  return (
    <ImageWrapper>
      <Box sx={{ maxWidth: { xs: '52%', sm: '100%' }, mr: { xs: 2.75, sm: 0 } }}>
        <Image src={Property1} />
      </Box>
      {isDesktop ? (
        <Box>
          <Box sx={{ p: { sm: 1, lg: 2 } }}>
            <Typography variant="body1" color="grey.400">
              The Fold
            </Typography>
            {/* 20, 600 */}
            <Typography variant="h2">Unit 2302</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1.5 }}>
              <LocationSVGIcon />
              <Typography variant="body2" color="grey.400" ml={0.5}>
                Location
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
              <Typography variant="body2" color="grey.500">
                Contract Expires:{' '}
              </Typography>
              {/* 14, 600 */}
              <Typography variant="body2" color="grey.500">
                10 Aug 2022
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
              <Typography variant="body2" color="grey.500">
                Upcoming Payment:{' '}
              </Typography>
              {/* 14, 600 */}
              <Typography variant="body2" color="grey.500">
                10 Sep 2022
              </Typography>
            </Box>
          </Box>
          <ViewButton startIcon={<Visibility />}>
            <Typography variant="subtitle1">View this Property</Typography>
          </ViewButton>
        </Box>
      ) : (
        <Box sx={{ flex: 1 }}>
          <Box mb={1}>
            <Typography variant="body1" color="grey.400" sx={{ opacity: 0.5 }}>
              Current contract
            </Typography>
            <Typography variant="subtitle1">Al Safa Villa #303</Typography>
            <Typography variant="body1" color="grey.400" sx={{ opacity: 0.5 }}>
              1049A394JL00122
            </Typography>
          </Box>
          <Box>
            <CustomText variant="body2">
              Started: <span>07/09/22</span>
            </CustomText>
            <CustomText variant="body2">
              Expires: <span>06/10/23</span>
            </CustomText>
          </Box>
        </Box>
      )}
    </ImageWrapper>
  );
}
