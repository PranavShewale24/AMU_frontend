import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { AppProvider } from "./pages/AppContext";

// Auth Pages
import SignupOTP from "./pages/signupotp";
import SignupPage from "./pages/SignupPage";
import Login from "./pages/login";
// Layout
import Header from "./pages/Header";
import Sidebar from "./pages/Sidebar";

// Pages
import Dashboard from "./pages/dashboard";
import AnimalsList from "./pages/animallist";
import TreatmentsList from "./pages/treatmenthistory";
import AddTreatment from "./pages/addanimaltreatment";
import ChatPage from "./pages/chat";
import ReportsPage from "./pages/reports";
import AnalyticsPage from "./pages/analytics";
import Clients  from "./pages/clients";
import GovermentDashboard from "./pages/govermentdashboard";

// Protected Layout
const MainLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <Outlet /> {/* renders nested pages */}
        </main>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/otp" element={<SignupOTP />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<Login />} />

          {/* Protected routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Navigate to="/login" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="clients" element={<Clients />} />
            <Route path="animals" element={<AnimalsList />} />
            <Route path="treatments" element={<TreatmentsList />} />
            <Route path="add-treatment" element={<AddTreatment />} />
            <Route path="chat" element={<ChatPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="government-dashboard" element={<GovermentDashboard />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default App;
