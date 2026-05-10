import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/auth/LoginPage'
import SignupPage from './pages/auth/SignupPage'
import AppLayout from './pages/nav/AppLayout'
import Hero from './pages/landing/Hero'
import Features from './pages/landing/Features'
import HowItWorks from './pages/landing/HowItWorks'
import DashboardPreview from './pages/landing/DashboardPreview'
import Testimonials from './pages/landing/Testimonials'
import CTA from './pages/landing/CTA'
import Footer from './pages/landing/Footer'
import Navbar from './pages/landing/Navbar'

import DashboardPage from './pages/DashboardPage'
import BuildItineraryPage from './pages/BuildItineraryPage'
import CreateTripPage from './pages/CreateTripPage'
import ItineraryViewPage from './pages/ItineraryViewPage'
import ProfilePage from './pages/ProfilePage'
// Landing Page Component
const LandingPage = () => {
  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden pt-20">
        <Hero />
        <Features />
        <HowItWorks />
        <DashboardPreview />
        <Testimonials />
        <CTA />
        <Footer />
      </main>
    </>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

          <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/create-trip" element={<CreateTripPage />} />
          <Route path="/itinerary" element={<BuildItineraryPage />} />

          {/* <Route path="/my-trips" element={<MyTripsPage />} />
          <Route path="/activities" element={<ActivitySearchPage />} />
          <Route path="/budget" element={<BudgetPage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/checklist" element={<ChecklistPage />} />
          <Route path="/shared" element={<SharedItineraryPage />} />
          <Route path="/settings" element={<SettingsPage />} /> */}
        </Route>
          {/* Add other routes as needed */}
      </Routes>
    </Router> 
  )
}

export default App