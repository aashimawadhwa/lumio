//@mui
import { Grid, styled, Typography, Box, IconButton } from '@mui/material';
import { LoadingButton } from '@mui/lab';

//hooks
import * as Yup from 'yup';
import useResponsive from 'src/hooks/useResponsive';
import { FormProvider } from 'src/components/hook-form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

//images
import BlackAndWhiteBG from 'src/assets/images/BlackAndWhiteBG.png';
import { Wrapper } from 'src/components/auth/styledComponents/styles';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

//components
import Page from 'src/components/Page';
import RHFMessageField from 'src/components/hook-form/RHFMessageField';


type FormValueProps = {
    details: string;
    afterSubmit?: string;
  };

const ExploreContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(4, 4.5),
  maxWidth: '414px',
  backgroundColor: theme.palette.grey[900],
  borderRadius: '16px',
  marginBottom: 30,
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    padding: theme.spacing(2.5),
  },
  [theme.breakpoints.down(300)]: {
    padding: theme.spacing(0.5),
  },
}));

const Card = styled(Box)(({ theme }) => ({
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  textAlign: 'center',
  alignItems: 'center',
  background: theme.palette.grey[700],
  borderRadius: '8px',
  width: '343px',
  height: '150px',


 }));

 const SubmitButton = styled(LoadingButton)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(2, 0),
}));

export default function ExploreBookAmenity() {
  const isDesktop = useResponsive('up', 'sm');


  const AmenityFormSchema = Yup.object().shape({
        details: Yup.string().required('Message is required'),
  });

  const defaultValues = {
    
    details: '',
  };

  const methods = useForm<FormValueProps>({
    resolver: yupResolver(AmenityFormSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;
  const onContinue = async (data: FormValueProps) => {
    
  };

  return (
    <Page img={isDesktop ? BlackAndWhiteBG : ''} title="Amenities">
      <Wrapper>
        <ExploreContainer>
        {isDesktop !? (
           <Typography align="center" variant="h3" py={3}>
           Inquiry Request
           </Typography>
            
            ) : (
              <Grid mb={2} sx={{ display: 'flex', alignItems: 'center' }} container>
                <Grid sx={{ textAlign: 'start' }} item xs={4} sm={4} md={4} lg={4}>
                <IconButton>
                    <ArrowBackIosIcon sx={{ fontSize: 'small' }} />
                  </IconButton>
                </Grid>
                <Grid item sm={4} md={4} lg={4}>
                  <Typography variant="h3"> Inquiry Request</Typography>
                </Grid>
               
              </Grid>
            )}

            <>
             
              <Card>
                
                    <Grid container>   
                    <Grid item xs={6} direction="column">
                     <Typography mx={1} align="left" color="grey.500" variant="subtitle2">Name</Typography>
                     <Typography mx={1} align="left" color="grey.500" variant="subtitle2">Location</Typography>
                     <Typography mx={1} align="left" color="grey.500" variant="subtitle2">Starts at</Typography>

    
                    </Grid>
                    <Grid item xs={6} direction="column">
                    <Typography mx={2} align="right" color="grey.400" variant="subtitle2">The Fold</Typography>
                    <Typography mx={2} align="right" color="grey.400" variant="subtitle2">XYZ, ABC</Typography>
                   <Typography mx={2} align="right" color="grey.400" variant="subtitle2">150,000 AED/Year</Typography>
                    </Grid>
                    </Grid>                  
                </Card>

                <Typography align="left" color="grey.400" variant="h3" my={2}>
                Inquire about the property
              </Typography>

              <FormProvider methods={methods} onSubmit={handleSubmit(onContinue)}>
                    <RHFMessageField
                      name="details"
                      placeholder="Enter more details here"
                      minRows={7}
                      style={{ maxHeight: '147px' }}
                    />
                    <SubmitButton sx={{ mb: { xs: 1, sm: 0 } }} type="submit">
                      Submit
                    </SubmitButton>
                  </FormProvider>

            </>
          
        </ExploreContainer>
        
      </Wrapper>
    </Page>
    
  );
}
