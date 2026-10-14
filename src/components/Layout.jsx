import { Outlet } from 'react-router-dom';
import useTheme from '../hooks/useTheme.js';
import useReveal from '../hooks/useReveal.js';
import useSpotlight from '../hooks/useSpotlight.js';
import NavBar from './NavBar.jsx';
import Footer from './Footer.jsx';
import FloatingContact from './FloatingContact.jsx';
import ScrollToTop from './ScrollToTop.jsx';
import ScrollProgress from './ScrollProgress.jsx';

export default function Layout() {
  const { theme, toggle } = useTheme();
  useReveal();
  useSpotlight();
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <ScrollProgress />
      <ScrollToTop />
      <NavBar theme={theme} onToggleTheme={toggle} />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
}
