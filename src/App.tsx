import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { StudioDashboard } from './components/StudioDashboard';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [inStudio, setInStudio] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-[#06050b]">
      <AnimatePresence mode="wait">
        {!inStudio ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LandingPage onOpenStudio={() => setInStudio(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="studio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <StudioDashboard onExit={() => setInStudio(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
