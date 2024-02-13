// @mui
import { Dialog, styled, Typography, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// hooks
import useResponsive from 'src/hooks/useResponsive';

// components
import DeleteDrawer from 'src/components/pages/document/DeleteDrawer';

const CustomDialog = styled(Dialog)(({ theme }) => ({
  textAlign: 'center',
  '& .MuiPaper-root': {
    maxWidth: '415px',
    padding: theme.spacing(4.5),
  },
}));

const CancelButton = styled(LoadingButton)(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(1.5),
  padding: theme.spacing(2.25),
}));

const DeleteButton = styled(LoadingButton)(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.grey[800],
  color: theme.palette.grey[0],
  padding: theme.spacing(2.25),
  borderColor: theme.palette.grey[0],
  '&:hover': {
    borderColor: theme.palette.grey[0],
    color: theme.palette.grey[0],
    backgroundColor: theme.palette.grey[800],
  },
}));

interface DeleteDialogProps {
  document: string;
  handleSubmit: () => void;
  handleCancel: () => void;
  handleDelete: () => void;
}

export default function DeleteDialog({
  document,
  handleSubmit,
  handleCancel,
  handleDelete,
}: DeleteDialogProps): React.ReactElement {
  const isDesktop = useResponsive('up', 'sm');
  return isDesktop ? (
    <CustomDialog hideBackdrop={true} open={true}>
      <Typography variant="h3" pb={1}>
        Delete Document
      </Typography>
      <Box pb={4.5}>
        <Typography variant="subtitle2" color="grey.500">
          Are you sure you want to delete the {document}. Please we aware you won’t be able to
          recover deleted documents.
        </Typography>
      </Box>
      <CancelButton onClick={handleCancel}>Cancel</CancelButton>
      <DeleteButton variant="outlined" onClick={handleDelete}>
        Yes, Delete Document
      </DeleteButton>
    </CustomDialog>
  ) : (
    <DeleteDrawer title={document} handleCancel={handleCancel} handleDelete={handleDelete} />
  );
}
