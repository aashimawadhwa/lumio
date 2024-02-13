import { useState } from 'react';
import { useNavigate } from 'react-router';

// @mui
import { Box, Button, Grid, IconButton, styled, Typography } from '@mui/material';

// hooks
import useResponsive from 'src/hooks/useResponsive';

// images and icons
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ProfileBG from 'src/assets/images/ProfileBG.png';
import Property1 from 'src/assets/images/Property1.png';

// components
import { PATH_MAIN } from 'src/routes/paths';
import { Wrapper } from 'src/components/auth/styledComponents/styles';
import AlertContainer from 'src/components/pages/document/AlertContainer';
import DeleteDocument from 'src/components/pages/document/DeleteDocument';
import DocumentCard from 'src/components/pages/document/DocumentCard';
import EditDocuments from 'src/components/pages/document/EditDocument';
import MobileHeader from 'src/layouts/dashboard/mobilenav';
import Page from 'src/components/Page';

// ----------------------------------------------------------------------

interface Details {
  documentType: string;
  fileName: string;
  latestTimestamp: string;
  address?: string;
  img?: string;
}
interface Doc {
  id: string;
  title: string;
  documentDetails: Details[];
}

const documentArray: Doc[] = [
  {
    id: '1',
    title: 'Personal Documents',
    documentDetails: [
      {
        documentType: 'Emirates ID',
        fileName: 'emirates_id.png',
        latestTimestamp: '22 Jul 2022',
        img: Property1,
      },
      {
        documentType: 'Passport',
        fileName: 'passport.png',
        latestTimestamp: '22 Jul 2022',
        img: Property1,
      },
    ],
  },
  {
    id: '2',
    title: 'Corporate Documents',
    documentDetails: [
      {
        documentType: 'NOC',
        fileName: 'noc.pdf',
        latestTimestamp: '22 Jul 2022',
        img: Property1,
      },
    ],
  },
  {
    id: '3',
    title: 'Property Documents',
    documentDetails: [
      {
        documentType: 'Tenacy Contract',
        address: 'Al Safa Villa #303',
        fileName: 'tenacyContract(1).pdf',
        latestTimestamp: '24 Jun 2022',
      },
      {
        documentType: 'Tenacy Contract',
        address: 'Mena Tower #1402',
        fileName: 'tenacyContract(2).pdf',
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
    ],
  },
];

const CustomWrapper = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.grey[900],
  textAlign: 'center',
  width: '850px',
  borderRadius: '16px',
  [theme.breakpoints.down('md')]: {
    margin: theme.spacing(0, 7.5),
    width: '600px',
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: '100%',
    margin: 0,
  },
}));

const BoxStyle = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0, 4, 4),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(0, 3, 3, 3),
  },
  [theme.breakpoints.down('sm')]: {
    padding: 0,
  },
}));

const Header = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.grey[900],
  color: theme.palette.grey[400],
  zIndex: 2,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  position: 'sticky',
  top: 0,
}));

const NavIcon = styled(IconButton)({
  width: '24px',
  height: '24px',
});

const DocumentWrapper = styled(Grid)(({ theme }) => ({
  overflow: 'scroll',
  textAlign: 'left',
  display: 'block',
  maxHeight: '576px',
  '::-webkit-scrollbar': {
    display: 'none',
  },
  [theme.breakpoints.down('sm')]: {
    maxHeight: '100%',
  },
}));

const AddButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  backgroundColor: 'transparent',
  color: theme.palette.grey[400],
  border: `1px solid ${theme.palette.grey[400]}`,
  borderRadius: '8px',
  padding: theme.spacing(1),
}));

export default function Documents() {
  const isDesktop = useResponsive('up', 'sm');
  const navigate = useNavigate();
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [document, setDocument] = useState({
    documentType: '',
    fileName: '',
    img: '',
  });

  const [doc, setDoc] = useState<Doc[]>(documentArray);

  const [docId, setDocId] = useState(0);

  const handleOpenDeleteDialog = (id: any) => {
    setDocId(id);
    setDeleteDialogOpen(true);
  };

  const handleEditDialog = ({ documentType, fileName, img }: any) => {
    setDocument({
      documentType: documentType,
      fileName: fileName,
      img: img,
    });
    setEditDialogOpen(!isEditDialogOpen);
    setDeleteAlert(false);
  };

  const handleDelete = () => {
    setDoc(doc.filter((d: any) => d.id !== docId));
    setDeleteDialogOpen(false);
  };

  const handleSubmit = () => {
    setDeleteAlert(true);
    setTimeout(() => {
      setDeleteAlert(false);
    }, 1000);
    setEditDialogOpen(false);
    setDeleteDialogOpen(false);
  };

  const handleCancel = () => {
    setDeleteDialogOpen(false);
    setEditDialogOpen(false);
  };

  return (
    <Page img={isDesktop ? ProfileBG : ''} title="My Documents">
      <Wrapper sx={{ marginBottom: 5 }}>
        {!(isEditDialogOpen || (isDeleteDialogOpen && isDesktop)) && (
          <CustomWrapper>
            {isDesktop && deleteAlert && (
              <AlertContainer message="Document Has been Deleted" handleClose={handleSubmit} />
            )}
            <BoxStyle sx={{ paddingTop: deleteAlert ? 0 : { xs: 0, sm: 3, md: 4 } }}>
              {isDesktop ? (
                <Box>
                  <Typography variant="h3" pb={3}>
                    My Documents
                  </Typography>
                </Box>
              ) : (
                <MobileHeader
                  leftNav={
                    <IconButton onClick={() => navigate(-1)}>
                      <ArrowBackIosIcon sx={{ fontSize: 'medium' }} />
                    </IconButton>
                  }
                  title="My Documents"
                  rightNav={
                    <IconButton onClick={() => navigate(PATH_MAIN.add_documents)}>
                      <AddIcon />
                    </IconButton>
                  }
                />
              )}
              <Box>
                {documentArray.length === 0 ? (
                  <Box py={{ xs: 10, sm: 5 }}>
                    <Typography variant="h5" color="grey.500">
                      No Document found
                    </Typography>
                  </Box>
                ) : (
                  <DocumentWrapper container spacing={3.5}>
                    {doc?.map((item: any, i: any) => (
                      <DocumentCard
                        key={i}
                        title={item.title}
                        id={item.id}
                        document={item.documentDetails}
                        handleEdit={handleEditDialog}
                        handleOpenDeleteDialog={handleOpenDeleteDialog}
                        download={item.title === 'Property Documents' ? true : false}
                      />
                    ))}
                  </DocumentWrapper>
                )}

                {isDesktop && (
                  <AddButton
                    onClick={() => navigate(PATH_MAIN.add_documents)}
                    startIcon={<AddIcon />}
                  >
                    <Typography variant="subtitle1" mt={0.3}>
                      Add New
                    </Typography>
                  </AddButton>
                )}
              </Box>
            </BoxStyle>
          </CustomWrapper>
        )}
        {isDeleteDialogOpen && (
          <DeleteDocument
            handleDelete={handleDelete}
            document={document.documentType}
            handleCancel={handleCancel}
            handleSubmit={handleSubmit}
          />
        )}
        {isEditDialogOpen && (
          <EditDocuments
            handleSubmit={handleSubmit}
            img={document.img}
            documentType={document.documentType}
            fileName={document.fileName}
            handleClose={handleCancel}
          />
        )}
      </Wrapper>
    </Page>
  );
}
