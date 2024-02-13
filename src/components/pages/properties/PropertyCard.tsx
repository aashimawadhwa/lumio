// @mui
import { Box, Card, CardContent, CardMedia, CardProps, Typography } from '@mui/material';

// icons
import LocationSVGIcon from 'src/assets/svg/icon_locationSVG';

interface PropertyCardProps {
  propertyName: string;
  unitName: string;
  image: string;
}

export default function PropertyCard({
  propertyName,
  unitName,
  image,
  ...others
}: PropertyCardProps & CardProps) {
  return (
    <Card sx={{ minWidth: 284, marginRight: 1.5, borderRadius: '8px' }} {...others}>
      <CardMedia component="img" height="284" image={image} alt="green iguana" />
      <CardContent>
        <Typography textAlign="left" color="grey.400" variant="body2">
          {propertyName}
        </Typography>
        <Typography textAlign="left" variant="h4" fontWeight={600}>
          {unitName}
        </Typography>
        <Box mt={1.5} display="flex" alignItems="center">
          <LocationSVGIcon />
          <Typography ml={0.5} color="grey.400" variant="body2">
            Location
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
