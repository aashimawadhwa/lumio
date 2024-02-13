import React from 'react';

// @mui
import { Typography, Grid } from '@mui/material';

//library
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

// hooks
import { FormProvider } from 'src/components/hook-form';
import useIsMountedRef from 'src/hooks/useIsMountedRef';

// components
import RHFDatePicker from 'src/components/hook-form/RHFDatePicker';
import RHFSelectField from 'src/components/hook-form/RHFSelectField';

// styles
import { ContainedButton, DarkBox } from 'src/components/pages/payment/styledComponents/styles';

//...........................................................

interface FormValueProps {
  pick_date: Date;
  pick_time: string;
  afterSubmit?: string;
}

export default function ByCheckForm() {
  const isMountedRef = useIsMountedRef();

  const FormSchema = Yup.object().shape({
    pick_date: Yup.date().required('Pick Up Date is required'),
    pick_time: Yup.string().required('Pick Up Time is required'),
  });

  const defaultValues = {
    pick_date: undefined,
    pick_time: '',
  };

  const methods = useForm<FormValueProps>({
    resolver: yupResolver(FormSchema),
    defaultValues,
  });

  const { handleSubmit, reset, setError } = methods;

  const onSubmit = async (data: FormValueProps) => {
    try {
      console.log(data);
    } catch (error) {
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.message });
      }
    }
  };

  return (
    <>
      <Typography textAlign="left" mb={1.5} color="grey.500" variant="subtitle2">
        To complete your request, please issue a check of AED500 and place a courier request.
      </Typography>
      <DarkBox>
        <Typography variant="body2">Courier Partner</Typography>
        <Typography color="grey.500" variant="body2">
          Dubai Courier Services LLC Lorem ispum dolor amit
        </Typography>
      </DarkBox>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid columnSpacing={1} container>
          <Grid item xs={6}>
            <RHFDatePicker name="pick_date" placeholder="Pick-Up Date" />
          </Grid>
          <Grid item xs={6}>
            <RHFSelectField
              name="pick_time"
              placeholder="Pick-Up Time"
              options={['12-2pm', '3-5pm', '6-9pm']}
            />
          </Grid>
        </Grid>
        <ContainedButton type="submit">Continue</ContainedButton>
      </FormProvider>
    </>
  );
}
