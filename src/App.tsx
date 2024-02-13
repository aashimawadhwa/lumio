// routes
import Router from 'src/routes';
// theme
import ThemeProvider from 'src/theme';
// components
import ScrollToTop from 'src/components/ScrollToTop';
import { ProgressBarStyle } from 'src/components/ProgressBar';
import ThemeColorPresets from 'src/components/ThemeColorPresets';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider>
      <ThemeColorPresets>
        <ProgressBarStyle />
        <ScrollToTop />
        <Router />
      </ThemeColorPresets>
    </ThemeProvider>
  );
}
