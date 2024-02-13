import { Helmet } from 'react-helmet-async';
import { forwardRef, ReactNode } from 'react';

// @mui
import { Box, BoxProps } from '@mui/material';
import useResponsive from 'src/hooks/useResponsive';
import { motion } from 'framer-motion';
// ----------------------------------------------------------------------

interface Props extends BoxProps {
  children: ReactNode;
  meta?: ReactNode;
  title: string;
  img?: React.ReactElement | string;
}

const Page = forwardRef<HTMLDivElement, Props>(
  ({ children, title = '', img, meta, ...other }, ref) => {
    const isMobile = useResponsive('down', 'sm');

    return (
      <motion.div
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          delay: 0.5,
        }}
      >
        <Helmet>
          <title>{`${title} | HUNA`}</title>
          {meta}
        </Helmet>

        <Box
          ref={ref}
          {...other}
          sx={{
            overflow: 'auto',
            '::-webkit-scrollbar': {
              width: '5px',
            },
            '::-webkit-scrollbar-thumb': {
              background: '#CAC9C0',
              borderRadius: '10px',
            },
            paddingTop: isMobile ? 0 : 12,
            height: '100vh',
            width: '100vw',
            objectFit: 'cover',
            backgroundImage: `url(${img})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        >
          {children}
        </Box>
      </motion.div>
    );
  }
);

export default Page;
