// react
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

// @mui
import { Typography, Box, styled } from '@mui/material';

// hooks
import useResponsive from 'src/hooks/useResponsive';

// components
import { RequestDetail, textColor } from 'src/pages/RequestList';

const BoxStyle = styled(Box)(({ theme }) => ({
  margin: theme.spacing(3, 0),
  minHeight: '376px',
  '& .active': {
    backgroundColor: theme.palette.grey[700],
  },
}));

const Card = styled(Box)(({ theme }) => ({
  background: theme.palette.grey[800],
  borderRadius: '8px',
  padding: theme.spacing(2.5, 2),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  cursor: 'pointer',
  [theme.breakpoints.down('sm')]: {
    background: theme.palette.grey[900],
    borderTop: `1px solid ${theme.palette.grey[600]}`,
    borderBottom: `1px solid ${theme.palette.grey[600]}`,
  },
}));

interface Props {
  isWrapperOpen: boolean;
  request: RequestDetail[];
  setData: Dispatch<SetStateAction<RequestDetail>>;
  setWrapperOpen: Dispatch<SetStateAction<boolean>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const showStatus = (status: string) => {
  const statusArr = status.split(' ')
  return statusArr.map(status => <Box key={status}>{status}</Box>)
}

export default function RequestCard({ isWrapperOpen, request, setData, setWrapperOpen, setOpen }: Props) {
  const isDesktop = useResponsive('up', 'sm');

  const [prevIndex, setPrevIndex] = useState('');

  useEffect(() => {
    if (isWrapperOpen) setWrapperOpen(false);
    setOpen(false);
  }, [isDesktop]);

  const handleToggle = (data: any, ind: any) => {
    setData(data);
    if (!isDesktop) {
      setWrapperOpen(!isWrapperOpen);
      setOpen(true);
    } else {
      if (ind === prevIndex || !isWrapperOpen) {
        setWrapperOpen(!isWrapperOpen);
      }
    }
    setPrevIndex(ind);
  };

  return (
    <BoxStyle>
      {request.length > 0 ? (
        <>
          {request.map((data, i) => (
            <Card
              key={i}
              sx={{ mt: { xs: 0, sm: 1.5 } }}
              className={`${data.id === prevIndex && isWrapperOpen && isDesktop ? 'active' : ''}`}
              onClick={() => handleToggle(data, data.id)}
            >
              <Box>
                {/* 18, 400 for Desktop, */}
                <Typography variant={isDesktop ? 'h3' : 'subtitle1'}>{data.title}</Typography>
                <Typography variant={isDesktop ? 'body2' : 'body1'} color='grey.500'>
                  {data.date}
                </Typography>
              </Box>
              <Box>
                <Typography variant={isDesktop ? 'h3' : 'subtitle1'} color={textColor(data.status)}>
                  {showStatus(data.status)}
                </Typography>
              </Box>
            </Card>
          ))}
        </>
      ) : (
        <Box py={10}>
          <Typography variant="h5" color="grey.500">
            No request found
          </Typography>
        </Box>
      )}
    </BoxStyle>
  );
}
