import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import ProjectsPage from './pages/ProjectsPage';
import { AnimatePresence } from 'framer-motion';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  React.useLayoutEffect(() => {
    // Force immediate scroll restoration
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Explicitly reset Lenis instance
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    }

    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    });
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const location = useLocation();
  
  return (
    <>
      <div className="global-noise" />
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default App;

