//react
import { useNavigate } from 'react-router';

//mui
import { styled, Typography, Box, IconButton, Button } from '@mui/material';

// hooks
import useResponsive from 'src/hooks/useResponsive';

//icons and images
import AddIcon from '@mui/icons-material/Add';
import DeleteSVGIcon from 'src/assets/svg/icon_deleteIconSVG';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

//data
import { VehiclesData, VehiclesRenewData } from 'src/utils/constant';

//paths
import { PATH_MAIN } from 'src/routes/paths';

const Card = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.grey[800],
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: theme.spacing(2, 0),
  padding: theme.spacing(2, 1.5),
  borderRadius: '8px',
  cursor: 'pointer',
  [theme.breakpoints.down('sm')]: {
    backgroundColor: theme.palette.grey[900],
    borderRadius: '0px',
    padding: theme.spacing(2),
    margin: theme.spacing(0),
    borderBottom: `1px solid ${theme.palette.grey[600]}`,
  },
}));
const CustomIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.grey[900],
  width: '36px',
  height: '36px',
  marginRight: '8px',
  [theme.breakpoints.down('sm')]: {
    backgroundColor: theme.palette.grey[600],
    ':hover': {
      background: theme.palette.grey[600],
    },
  },
}));
const RenewButton = styled(Button)(({ theme }) => ({
  borderRadius: '100px',
  backgroundColor: theme.palette.grey[900],
  borderColor: theme.palette.grey[0],
  color: theme.palette.grey[0],
  '&:hover': {
    borderColor: theme.palette.grey[0],
    backgroundColor: 'transparent',
  },
}));
const BoxStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  '& .active': {
    backgroundColor: theme.palette.grey[0],
    color: theme.palette.grey[700],
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: '100%',
  },
}));
const AddButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'transparent',
  color: theme.palette.grey[400],
  border: `1px solid ${theme.palette.grey[400]}`,
  borderRadius: '8px',
  padding: theme.spacing(1),
}));

export default function Vehicles() {
  const navigate = useNavigate();
  const isDesktop = useResponsive('up', 'sm');
  return (
    <>
      <BoxStyle>
        {VehiclesData.map((item: any, i: any) => (
          <Card key={i}>
            <Box>
              <Typography variant="subtitle2" align="left">
                {' '}
                {item.name}
              </Typography>
              <Typography variant="body1" color="grey.500" align="left">
                {item.address} - {item.latestTimestamp}
              </Typography>
            </Box>
            <Box>
              <CustomIconButton>
                <RemoveRedEyeOutlinedIcon fontSize="small" />
              </CustomIconButton>
              <CustomIconButton>
                <DeleteSVGIcon />
              </CustomIconButton>
            </Box>
          </Card>
        ))}
        {VehiclesRenewData.map((item: any, i: any) => (
          <Card key={i}>
            <Box>
              <Typography variant="subtitle2" align="left" color="grey.500">
                {' '}
                {item.name}
              </Typography>
              <Typography variant="body1" align="left" color="grey.600">
                {item.address} - {item.latestTimestamp}
              </Typography>
            </Box>
            <Box>
              <RenewButton>
                <Typography variant="h5" color="grey.0">
                  Renew
                </Typography>
              </RenewButton>
            </Box>
          </Card>
        ))}
      </BoxStyle>
      {isDesktop ? (
        <AddButton startIcon={<AddIcon />} onClick={() => navigate(PATH_MAIN.add_vehicle)}>
          <Typography variant="subtitle1" mt={0.3}>
            Add New
          </Typography>
        </AddButton>
      ) : (
        ''
      )}
    </>
  );
}
