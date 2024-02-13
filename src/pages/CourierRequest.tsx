//react
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// @mui
import { Box, Checkbox, Grid, IconButton, styled, Tab, Tabs, Typography } from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';

// hooks
import useResponsive from 'src/hooks/useResponsive';

// icons and images
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import BankCircleIcon from 'src/assets/svg/bank_circle_icon';
import CheckedIcon from 'src/assets/svg/checked_icon';
import CourierRequestBG from 'src/assets/images/CourierRequestBG.png';
import UncheckedIcon from 'src/assets/svg/unchecked_icon';

// components
import Page from 'src/components/Page';

// styles
import { Wrapper } from 'src/components/auth/styledComponents/styles';

//................................................

const Steps = [
  {
    id: 1,
    name: 'What',
  },
  {
    id: 2,
    name: 'When',
  },
  {
    id: 3,
    name: 'Where',
  },
];

const CheckElements = [
  {
    id: 1,
    name: 'Cheque Delivery',
    icon: <BankCircleIcon />,
    value: false,
  },
  {
    id: 2,
    name: 'Signed Documents',
    icon: <BankCircleIcon />,
    value: false,
  },
  {
    id: 3,
    name: 'Other',
    icon: <BankCircleIcon />,
    value: false,
  },
];

const InnerWrapper = styled(Box)(({ theme }) => ({
  maxWidth: '493px',
  backgroundColor: theme.palette.grey[900],
  borderRadius: '1rem',
  padding: theme.spacing(4.5),
  textAlign: 'center',
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(3.5),
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    maxWidth: '100%',
    padding: theme.spacing(2),
  },
}));

const CircleIcon = styled(Box)(({ theme }) => ({
  width: '2.5rem',
  height: '2.5rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
  fontWeight: 600,
  fontSize: '1rem',
}));

export function TabLabel({
  step,
  stepName,
  active,
  isDesktop,
}: {
  step: number;
  stepName: string;
  active: boolean;
  isDesktop: boolean | undefined;
}) {
  return (
    <>
      {isDesktop ? (
        <Box display="flex">
          <CircleIcon
            sx={{
              backgroundColor: active ? 'grey.0' : 'grey.600',
              color: active ? 'grey.900' : 'grey.500',
            }}
          >
            0{step}
          </CircleIcon>
          <Box ml={1} lineHeight={0.7} textAlign="left">
            <Typography lineHeight={1} variant="body2" color={'grey.500'} fontWeight={300}>
              Step 0{step}/03
            </Typography>
            <Typography color={active ? 'grey.0' : 'grey.500'} variant="subtitle1">
              {stepName}
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box width="100%">
          <Box
            height="8px"
            mb="5px"
            borderRadius={2.5}
            sx={{
              backgroundColor: active ? 'grey.0' : 'grey.600',
            }}
          />
          <Typography color={active ? 'grey.0' : 'grey.600'} variant="subtitle1">
            {stepName}
          </Typography>
        </Box>
      )}
    </>
  );
}

export default function CourierRequest() {
  const isDesktop = useResponsive('up', 'sm');
  const [activeStep, setActiveStep] = useState('1');

  const navigate = useNavigate();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveStep(newValue);
  };

  const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.checked);
  };

  return (
    <Page title="Courier Request" img={isDesktop ? CourierRequestBG : ''}>
      <Wrapper>
        <InnerWrapper>
          <Grid
            mb={{ xs: 2.5, sm: 3, md: 4, lg: 4.5 }}
            sx={{ display: 'flex', alignItems: 'center' }}
            container
          >
            <Grid textAlign="left" item xs={3}>
              {!isDesktop && (
                <IconButton onClick={() => navigate(-1)}>
                  <ArrowBackIosIcon sx={{ fontSize: 'medium' }} />
                </IconButton>
              )}
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h3">Courier Request</Typography>
            </Grid>
          </Grid>

          <TabContext value={activeStep}>
            <Box mb={{ xs: 3, sm: 3.5, md: 4, lg: 4.5 }}>
              <Tabs
                variant={isDesktop ? 'standard' : 'fullWidth'}
                sx={{
                  '& button': {
                    sm: {
                      padding: '0 16px',
                    },
                  },
                  '& button:not(:last-of-type)': {
                    xs: {
                      marginRight: '9px',
                    },
                    sm: {
                      marginRight: 0,
                      borderRight: '1px solid rgba(151, 151, 151, 0.2)',
                      borderRadius: 0,
                    },
                  },
                }}
                onChange={handleChange}
                centered
              >
                {Steps.map((step, i) => (
                  <Tab
                    key={i}
                    label={
                      <TabLabel
                        isDesktop={isDesktop}
                        active={activeStep === `${step.id}`}
                        step={step.id}
                        stepName={step.name}
                      />
                    }
                    value={`${step.id}`}
                  />
                ))}
              </Tabs>
            </Box>
            <TabPanel value="1">
              <Box sx={{ textAlign: 'left' }}>
                <Typography variant="subtitle1">What are you sending to HUNA?</Typography>
                <Typography variant="subtitle2" color="grey.500" mb={{ xs: 3, sm: 4.5 }}>
                  Please select what you are planning to send to HUNA by courier.
                </Typography>
                <Box>
                  {CheckElements.map((e, i) => (
                    <Box key={i} display="flex" alignItems="center" mb={1.5}>
                      <BankCircleIcon />
                      <Typography flex={1} ml={1.5} variant="subtitle1">
                        {e.name}
                      </Typography>
                      <Checkbox
                        icon={<UncheckedIcon />}
                        checkedIcon={<CheckedIcon />}
                        name={e.name}
                        value={e.value}
                        onChange={handleCheckBox}
                      />
                    </Box>
                  ))}
                </Box>
              </Box>
            </TabPanel>
            <TabPanel value="2">Item Two</TabPanel>
            <TabPanel value="3">Item Three</TabPanel>
          </TabContext>
        </InnerWrapper>
      </Wrapper>
    </Page>
  );
}
