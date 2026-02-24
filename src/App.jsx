import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import HomePage from '@/pages/HomePage'
import DocsPage from '@/pages/DocsPage'
import SignInPage from '@/pages/SignInPage'
import SignUpPage from '@/pages/SignUpPage'
import DownloadPage from '@/pages/DownloadPage'
import { ComingSoonPage, NotFoundPage } from '@/pages/_extra'
import AuthCallbackPage from '@/pages/AuthCallbackPage'
import FeaturesPage from '@/pages/FeaturesPage'
import HowItWorksPage from '@/pages/HowItWorksPage'
import RoadmapPage from '@/pages/RoadmapPage'
import SettingsPage from '@/pages/Settingspage'





// Pages that should NOT show the main Navbar/Footer
const CLEAN_PAGES = ['/signin', '/signup', '/auth/callback']

export default function App() {
  const location = useLocation()
  const isClean = CLEAN_PAGES.some(p => location.pathname.startsWith(p))

  return (
    <>
      {!isClean && <Navbar />}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/"               element={<HomePage />} />
          <Route path="/docs"           element={<DocsPage />} />
          <Route path="/docs/:section"  element={<DocsPage />} />
          <Route path="/download"       element={<DownloadPage />} />
          <Route path="/signin"         element={<SignInPage />} />
          <Route path="/signup"         element={<SignUpPage />} />
          <Route path="/coming-soon"    element={<ComingSoonPage />} />
          <Route path="/auth/callback"  element={<AuthCallbackPage />} />
          <Route path="/features"       element={<FeaturesPage />} />
          <Route path="/roadmap"     element={<RoadmapPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/settings"        element={<SettingsPage />}  />
          <Route path="*"               element={<NotFoundPage />} />
          
        </Routes>
      </AnimatePresence>

      {!isClean && <Footer />}
    </>
  )
}