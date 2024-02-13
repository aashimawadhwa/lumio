// @mui
import { Box, Typography, Grid, styled } from '@mui/material';

// hooks
import useResponsive from 'src/hooks/useResponsive';

//................................................................................

const Header = styled(Box)(({ theme }) => ({
  paddingBottom: theme.spacing(1.5),
  [theme.breakpoints.down('sm')]: {
    borderBottom: `1px solid ${theme.palette.grey[600]}`,
    padding: theme.spacing(0, 2, 3, 2),
  },
}));

const Card = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[600],
  padding: theme.spacing(2.5, 2),
  borderRadius: '8px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    backgroundColor: theme.palette.grey[900],
    borderBottom: `1px solid ${theme.palette.grey[600]}`,
  },
}));

type visitorDetails = {
  name: string;
  residence: string;
  date?: string;
};

interface Props {
  title: string;
  visitor: visitorDetails[];
  active: boolean;
}

export default function VisitorCard({ title, visitor, active }: Props): React.ReactElement {
  const isDesktop = useResponsive('up', 'sm');
  return (
    <Grid item xs={12}>
      <Header>
        <Typography variant="h4" color="grey.400">
          {title}
        </Typography>
      </Header>
      <Grid container spacing={isDesktop ? 3: 0}>
        {visitor.map((item, i) => (
          <Grid item xs={12} sm={6} key={i}>
            <Card>
              <Box>
                <Typography variant="subtitle1">{item.name}</Typography>
                <Typography variant="body1" color="grey.500">
                  {active && <span>Until {item.date} - </span>}
                  {item.residence}
                </Typography>
              </Box>
              {active && (
                <Typography variant="subtitle1" color="success.main">
                  Active
                </Typography>
              )}
              {!isDesktop && !active && (
                <Typography variant="subtitle1" color="grey.600">
                  Expired
                </Typography>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
