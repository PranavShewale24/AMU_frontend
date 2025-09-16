import React, { createContext, useContext, useState } from 'react';

// Language translations
const translations = {
  en: {
    title: 'AMU Portal',
    login: 'Login',
    signup: 'Sign Up',
    farmer: 'Farmer',
    government: 'Government',
    veterinarian: 'Veterinarian',
    dashboard: 'Dashboard',
    animals: 'Animals',
    clients: 'Clients',
    treatments: 'Treatments',
    chat: 'Chat',
    reports: 'Reports',
    analytics: 'Analytics',
    profile: 'Profile',
    phoneNumber: 'Phone Number',
    enterOTP: 'Enter OTP',
    name: 'Name',
    role: 'Role',
    waitingPeriod: 'Waiting Period',
    daysLeft: 'Days Left',
    safeToSell: 'Safe to Sell',
    activeWaiting: 'Active Waiting',
    treatmentHistory: 'Treatment History',
    addTreatment: 'Add Treatment',
    drugName: 'Drug Name',
    dose: 'Dose',
    animalType: 'Animal Type',
    selectFarmer: 'Select Farmer',
    sendMessage: 'Send Message',
    typeMessage: 'Type your message...',
    downloadReport: 'Download Report',
    viewDetails: 'View Details',
    back: 'Back',
    save: 'Save',
    cancel: 'Cancel',
    submit: 'Submit',
    search: 'Search',
    filter: 'Filter',
    totalAnimals: 'Total Animals',
    readyToSell: 'Ready to Sell',
    totalTreatments: 'Total Treatments'
  },
  hi: {
    title: 'एएमआर पोर्टल',
    login: 'लॉग इन',
    signup: 'साइन अप',
    farmer: 'किसान',
    government: 'सरकार',
    veterinarian: 'पशु चिकित्सक',
    dashboard: 'डैशबोर्ड',
    animals: 'पशु',
    clients: 'ग्राहक',
    treatments: 'उपचार',
    chat: 'चैट',
    reports: 'रिपोर्ट',
    analytics: 'विश्लेषण',
    profile: 'प्रोफ़ाइल'
  },
  mr: {
    title: 'एएमआर पोर्टल',
    login: 'लॉगिन',
    signup: 'साइन अप',
    farmer: 'शेतकरी',
    government: 'सरकार',
    veterinarian: 'पशुवैद्य',
    dashboard: 'डॅशबोर्ड',
    animals: 'जनावरे',
    clients: 'ग्राहक',
    treatments: 'उपचार',
    chat: 'चॅट',
    reports: 'अहवाल',
    analytics: 'विश्लेषण',
    profile: 'प्रोफाइल'
  }
};

// Mock data
const mockAnimals = [
  {
    id: 'COW001',
    type: 'Cow',
    name: 'Bella',
    farmer: 'Ram Kumar',
    drug: 'Amoxicillin',
    dose: '500mg',
    waitingPeriod: 7,
    daysLeft: 3,
    treatedBy: 'Dr. Sharma',
    treatedDate: '2024-08-25'
  },
  {
    id: 'BUF002',
    type: 'Buffalo',
    name: 'Moti',
    farmer: 'Suresh Patil',
    drug: 'Oxytetracycline',
    dose: '200ml',
    waitingPeriod: 14,
    daysLeft: 0,
    treatedBy: 'Dr. Verma',
    treatedDate: '2024-08-15'
  },
  {
    id: 'CHK003',
    type: 'Chicken',
    name: 'Fluffy',
    farmer: 'Ram Kumar',
    drug: 'Enrofloxacin',
    dose: '10mg',
    waitingPeriod: 5,
    daysLeft: 2,
    treatedBy: 'Dr. Sharma',
    treatedDate: '2024-08-27'
  }
];

const mockTreatments = [
  {
    id: 1,
    animalId: 'COW001',
    animalType: 'Cow',
    drug: 'Amoxicillin',
    dose: '500mg',
    waitingPeriod: 7,
    date: '2024-08-25',
    vet: 'Dr. Sharma',
    farmer: 'Ram Kumar'
  },
  {
    id: 2,
    animalId: 'BUF002',
    animalType: 'Buffalo',
    drug: 'Oxytetracycline',
    dose: '200ml',
    waitingPeriod: 14,
    date: '2024-08-15',
    vet: 'Dr. Verma',
    farmer: 'Suresh Patil'
  }
];

// Create Context
const AppContext = createContext();

// Custom hook to use the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

// Context Provider Component
export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('login');
  const [language, setLanguage] = useState('en');
  const [animals, setAnimals] = useState(mockAnimals);
  const [treatments, setTreatments] = useState(mockTreatments);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'COW001 waiting period ends in 3 days', type: 'warning' },
    { id: 2, message: 'BUF002 is ready for sale', type: 'success' }
  ]);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'Dr. Sharma', message: 'How is Bella doing today?', timestamp: '10:30 AM' },
    { id: 2, sender: 'Ram Kumar', message: 'She is eating well and looks healthy', timestamp: '10:32 AM' }
  ]);

  const contextValue = {
    currentUser,
    setCurrentUser,
    currentPage,
    setCurrentPage,
    language,
    setLanguage,
    animals,
    setAnimals,
    treatments,
    setTreatments,
    notifications,
    setNotifications,
    chatMessages,
    setChatMessages,
    t: translations[language]
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext };
