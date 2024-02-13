// @mui
import { Grid, Typography, styled, Box, IconButton } from '@mui/material';

// hooks
import useResponsive from 'src/hooks/useResponsive';

// icons
import DeleteSVGIcon from 'src/assets/svg/icon_deleteSVG';
import DownloadSVGIcon from 'src/assets/svg/icon_downloadSVG';
import EditSVGIcon from 'src/assets/svg/icon_editSVG';

const DocumentHeader = styled(Typography)(({ theme }) => ({
  paddingBottom: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    borderBottom: `1px solid ${theme.palette.grey[600]}`,
    padding: theme.spacing(0, 1.5, 2, 1.5),
  },
}));

const Card = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  padding: theme.spacing(2.5, 1.5),
  borderRadius: '8px',
  backgroundColor: theme.palette.grey[600],
  [theme.breakpoints.down('sm')]: {
    backgroundColor: theme.palette.grey[900],
    borderBottom: `1px solid ${theme.palette.grey[600]}`,
  },
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

interface Props {
  document: Array<Object>;
  title: string;
  handleEdit: (item: any) => void;
  handleOpenDeleteDialog: (id: any) => void;
  download: boolean;
  id: string;
}
export default function DocumentCard({
  document,
  title,
  handleEdit,
  handleOpenDeleteDialog,
  download,
  id,
}: Props): React.ReactElement {
  const isDesktop = useResponsive('up', 'sm');
  return (
    <Grid item>
      <DocumentHeader variant="h4" color="grey.400">
        {title}
      </DocumentHeader>

      <Grid container spacing={isDesktop ? 2 : 0}>
        {document.map((item: any, i: any) => (
          <Grid item xs={12} sm={6} md={6} lg={6} key={i}>
            <Card>
              <Box>
                <Typography variant="subtitle2">{item.documentType}</Typography>
                <Typography variant="body1" color="grey.400">
                  {download && <span>{item.address} - </span>}
                  {item.latestTimestamp}
                </Typography>
              </Box>
              {!download ? (
                <Box>
                  <CustomIconButton onClick={() => handleEdit(item)}>
                    <EditSVGIcon />
                  </CustomIconButton>
                  <CustomIconButton
                    sx={{ marginLeft: '8px' }}
                    onClick={() => handleOpenDeleteDialog(id)}
                  >
                    <DeleteSVGIcon />
                  </CustomIconButton>
                </Box>
              ) : (
                <CustomIconButton>
                  <DownloadSVGIcon />
                </CustomIconButton>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
