//mui
import {
  styled,
  Typography,
  Box,
  IconButton,
} from '@mui/material';

//icons and images
import DownloadSVGIcon from 'src/assets/svg/icon_downloadSVG';

const DocumentsData = [
  {
    documentType: 'EJARI (0120180802002397)',
    address: 'Al Safa Villa #303',
    fileName: 'ejari.pdf',
    latestTimestamp: '01 Jul 2022',
  },
  {
    documentType: 'EJARI (0120180802002397)',
    address: 'Al Safa Villa #303',
    fileName: 'ejari.pdf',
    latestTimestamp: '01 Jul 2022',
  },
  {
    documentType: 'EJARI (0120180802002397)',
    address: 'Al Safa Villa #303',
    fileName: 'ejari.pdf',
    latestTimestamp: '01 Jul 2022',
  },
  {
    documentType: 'EJARI (0120180802002397)',
    address: 'Al Safa Villa #303',
    fileName: 'ejari.pdf',
    latestTimestamp: '01 Jul 2022',
  },
];

const Card = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  padding: theme.spacing(2),
  margin: theme.spacing(1.5, 0),
  borderRadius: '8px',
  backgroundColor: theme.palette.grey[800],
}));


const CustomIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.grey[900],
  width: '36px',
  height: '36px',
  [theme.breakpoints.down('sm')]: {
    backgroundColor: theme.palette.grey[600],
    ':hover': {
      background: theme.palette.grey[600],
    },
  },
}));

export default function Documents() {
  return (
    <>
      {DocumentsData.map((item: any, i: any) => (
        <Card key={item}>
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
    </>
  );
}
