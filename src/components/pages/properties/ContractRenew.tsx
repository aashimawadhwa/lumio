//react
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//mui
import { Box, Grid, styled, Button, Typography, IconButton, Checkbox } from '@mui/material';

//icons and images
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CheckedIcon from 'src/assets/svg/checked_icon';
import ContractBG from 'src/assets/images/ContractBG.png';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Property1 from 'src/assets/images/ContractIMG.png';
import UncheckedIcon from 'src/assets/svg/unchecked_icon';

//hooks
import useResponsive from 'src/hooks/useResponsive';

//components
import { Wrapper } from 'src/components/auth/styledComponents/styles';
import Page from 'src/components/Page';

//data
import { ContractRenewData, DetailsData } from 'src/utils/constant';

//..................................................................

const PropertiesWrapper = styled('div')(({ theme }) => ({
  background: theme.palette.grey[900],
  maxWidth: '808px',
  borderRadius: '1rem',
  padding: theme.spacing(4.5),
  [theme.breakpoints.down('md')]: {
    margin: theme.spacing(2),
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0),
    width: '100%',
  },
}));

const LeftWrapper = styled('div')(({ theme }) => ({
  background: theme.palette.grey[800],
  borderRadius: '16px',
  maxWidth: '320px',
  [theme.breakpoints.down('md')]: {
    display: 'flex',
    maxWidth: '100%',
    padding: theme.spacing(2),
  },
}));
const InsideWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(2.5, 1.5),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2.5, 2, 2.5, 3),
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2.5, 1.5, 2.5, 2.5),
  },
}));
const ImageWrapper = styled('img')(({ theme }) => ({
  borderRadius: '4px',
  [theme.breakpoints.down('md')]: {
    maxWidth: '55%',
  },
}));

const CustomText = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[400],
  margin: theme.spacing(0.5, 0),
  '& span': {
    color: theme.palette.grey[500],
  },
}));

const Back = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  left: 20,
  top: 50,
  zIndex: 43535435435,
}));

const ItemWrapper = styled('div')(({ theme }) => ({
  display: 'flex',

  justifyContent: 'space-between',
  alignItems: 'center',
  cursor: 'pointer',
}));
const RenewButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5),
  width: '100%',
  borderColor: theme.palette.grey[0],
  '&:hover': {
    borderColor: theme.palette.grey[0],
    color: theme.palette.grey[900],
    backgroundColor: theme.palette.grey[0],
  },
  '&:disabled': {
    backgroundColor: theme.palette.grey[500],
    color: theme.palette.grey[600],
  },
}));

const DetailsWrapper = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.grey[700],
  borderRadius: '8px',
  padding: theme.spacing(2, 2.5),
  [theme.breakpoints.down('md')]: {
    marginTop: '16px',
  },
}));
const VerticalDivider = styled(Box)(({ theme }) => ({
  width: '2px',
  backgroundColor: theme.palette.grey[500],
  margin: theme.spacing(0, 3.7),
  opacity: 0.2,
  [theme.breakpoints.down('md')]: {
    margin: theme.spacing(0, 2.5),
  },
}));

export default function ContracrRenew() {
  const isDesktop = useResponsive('up', 'sm');
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };
  return (
    <Page title="Contract Renewal" img={isDesktop ? ContractBG : ''}>
      <Wrapper sx={{ marginBottom: 5 }}>
        <PropertiesWrapper>
          {isDesktop ? (
            <Typography variant="h3" mb={4} align="center">
              Contract Renewal
            </Typography>
          ) : (
            <Typography variant="h3" mb={4} mt={4} align="center">
              Renew Contract
            </Typography>
          )}

          <Grid container columnSpacing={0}>
            <Grid item xs={12} sm={12} md={4.5} lg={4.5} columnSpacing={0}>
              {!isDesktop && (
                <Back onClick={() => navigate(-1)}>
                  <ArrowBackIosIcon sx={{ color: '#fff', fontSize: 'medium' }} />
                </Back>
              )}

              <LeftWrapper>
                <ImageWrapper src={Property1} />
                <InsideWrapper>
                  {isDesktop ? (
                    <>
                      <Typography variant="body1" color="grey.400">
                        The Fold
                      </Typography>
                      <Typography variant="h2" color="grey.0">
                        Unit 2302
                      </Typography>

                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                        <LocationOnIcon
                          fontSize="small"
                          sx={{ color: 'grey.400', mr: 1, cursor: 'pointer' }}
                        />
                        <Typography variant="subtitle1" color="grey.500" sx={{ cursor: 'pointer' }}>
                          Location
                        </Typography>
                      </Box>
                      {ContractRenewData.map((item: any, i: any) => (
                        <ItemWrapper key={i}>
                          <Typography variant="subtitle1" color="grey.500">
                            {item.name}
                          </Typography>
                          <Typography variant="h6" color="grey.400">
                            {item.idNo}
                          </Typography>
                        </ItemWrapper>
                      ))}
                    </>
                  ) : (
                    <>
                      <Box mb={1}>
                        <Typography variant="body1" color="grey.400" mb={1}>
                          Current contract
                        </Typography>
                        <Typography variant="h5" color="grey.0" mb={1}>
                          Al Safa Villa #303
                        </Typography>
                        <Typography variant="body1" color="grey.400" mb={1}>
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
                    </>
                  )}
                </InsideWrapper>
              </LeftWrapper>
            </Grid>
            <VerticalDivider />
            <Grid item xs={12} sm={12} md={6.5} lg={6.5} columnSpacing={0}>
              <Box>
                <DetailsWrapper>
                  <Typography variant="h6" color="grey.500">
                    Renew Contract details
                  </Typography>
                  <Typography variant="h2" color="grey.0" mb={1}>
                    Starting on 22 April 2022
                  </Typography>
                  {DetailsData.map((item: any, i: any) => (
                    <ItemWrapper key={i}>
                      <Typography variant="subtitle1" color="grey.500">
                        {item.name}
                      </Typography>
                      <Typography variant="h6" color="grey.400">
                        {item.idNo}
                      </Typography>
                    </ItemWrapper>
                  ))}
                </DetailsWrapper>
                <Box display="flex" alignItems="start" marginBottom={2.2} marginTop={3}>
                  <Checkbox
                    icon={<UncheckedIcon />}
                    checkedIcon={<CheckedIcon />}
                    onChange={handleChange}
                  />
                  <Typography variant="subtitle2" color="grey.500">
                    By submitting below, you will confirm your Renewal/Extension request and we will
                    begin preparing your contract documents for delivery.
                  </Typography>
                </Box>
                <RenewButton variant="outlined" sx={{ mb: 1.5, mt: 2 }} disabled={!checked}>
                  Renew Contract
                </RenewButton>
              </Box>
            </Grid>
          </Grid>
        </PropertiesWrapper>
      </Wrapper>
    </Page>
  );
}
