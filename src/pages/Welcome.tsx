import { styled } from '@mui/material';

//libraries
import { motion } from 'framer-motion';

//svgs and icons
import Logo from 'src/assets/svg/icon_logo';

//components
import Page from 'src/components/Page';

//................................................

const HeaderWrapper = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.grey[900],
  position: 'absolute',
  top: '40%',
  right: '50%',
  transform: 'translate(50%,50%)',
}));

export default function Welcome() {
  return (
    <Page title="Welcome">
      <motion.div
        animate={{ opacity: 0, transition: { delay: 1.5, duration: 0.5, ease: 'easeOut' } }}
      >
        <HeaderWrapper>
          <Logo />
        </HeaderWrapper>
      </motion.div>
    </Page>
  );
}
