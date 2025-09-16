import React from 'react';

import { 
  Stethoscope, 
  Clock, 
  CheckCircle, 
  FileText, 
  AlertTriangle,
  TrendingUp,
  Activity,
  Calendar
} from 'lucide-react';

// Mock data for dashboard
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

// Dashboard Component for Farmers and Veterinarians
const Dashboard = ({ currentUser, language = 'en' }) => {
  const animals = mockAnimals;
  const treatments = mockTreatments;

  // Calculate statistics
  const waitingAnimals = animals.filter(a => a.daysLeft > 0).length;
  const readyAnimals = animals.filter(a => a.daysLeft === 0).length;
  const urgentAnimals = animals.filter(a => a.daysLeft <= 3 && a.daysLeft > 0).length;

  // Language translations
  const translations = {
    en: {
      dashboard: 'Dashboard',
      welcome: 'Welcome back',
      totalAnimals: 'Total Animals',
      waitingPeriodActive: 'Waiting Period Active',
      readyToSell: 'Ready to Sell',
      totalTreatments: 'Total Treatments',
      recentAnimals: 'Recent Animals',
      notifications: 'Notifications',
      urgentAlerts: 'Urgent Alerts',
      daysLeft: 'days left',
      ready: 'Ready',
      viewAll: 'View All',
      noAnimals: 'No animals found',
      noNotifications: 'No new notifications'
    },
    hi: {
      dashboard: 'डैशबोर्ड',
      welcome: 'वापस आपका स्वागत है',
      totalAnimals: 'कुल पशु',
      waitingPeriodActive: 'प्रतीक्षा अवधि सक्रिय',
      readyToSell: 'बेचने के लिए तैयार',
      totalTreatments: 'कुल उपचार'
    },
    mr: {
      dashboard: 'डॅशबोर्ड',
      welcome: 'परत आपले स्वागत',
      totalAnimals: 'एकूण जनावरे',
      waitingPeriodActive: 'प्रतीक्षा कालावधी सक्रिय',
      readyToSell: 'विक्रीसाठी तयार',
      totalTreatments: 'एकूण उपचार'
    }
  };

  const t = translations[language];

  // Stat Card Component
  const StatCard = ({ title, value, icon: Icon, color, subtext }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className={`text-3xl font-bold ${color}`}>{value}</p>
          {subtext && <p className="text-xs text-gray-500 mt-1">{subtext}</p>}
        </div>
        <div className={`p-3 rounded-lg ${color.replace('text-', 'bg-').replace('-600', '-100')}`}>
          <Icon className={`w-8 h-8 ${color}`} />
        </div>
      </div>
    </div>
  );

  // Animal Card Component
  const AnimalCard = ({ animal }) => (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
      <div className="flex items-center space-x-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
          animal.type === 'Cow' ? 'bg-brown-100' : 
          animal.type === 'Buffalo' ? 'bg-gray-100' :
          animal.type === 'Chicken' ? 'bg-yellow-100' : 'bg-green-100'
        }`}>
          <Stethoscope className="w-5 h-5 text-gray-600" />
        </div>
        <div>
          <p className="font-medium text-gray-900">{animal.name} ({animal.type})</p>
          <p className="text-sm text-gray-600">ID: {animal.id}</p>
          <p className="text-xs text-gray-500">Treated by: {animal.treatedBy}</p>
        </div>
      </div>
      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
        animal.daysLeft > 0 
          ? animal.daysLeft <= 3 
            ? 'bg-red-100 text-red-800' 
            : 'bg-yellow-100 text-yellow-800'
          : 'bg-green-100 text-green-800'
      }`}>
        {animal.daysLeft > 0 ? (
          <><Clock className="w-3 h-3 inline mr-1" /> {animal.daysLeft} {t.daysLeft}</>
        ) : (
          <><CheckCircle className="w-3 h-3 inline mr-1" /> {t.ready}</>
        )}
      </div>
    </div>
  );

  // Notification Card Component
  const NotificationCard = ({ type, message, time }) => (
    <div className={`p-4 rounded-lg border ${
      type === 'warning' 
        ? 'bg-yellow-50 border-yellow-200' 
        : type === 'success'
        ? 'bg-green-50 border-green-200'
        : 'bg-blue-50 border-blue-200'
    }`}>
      <div className="flex items-start space-x-3">
        <div className={`mt-0.5 ${
          type === 'warning' 
            ? 'text-yellow-600' 
            : type === 'success'
            ? 'text-green-600'
            : 'text-blue-600'
        }`}>
          {type === 'warning' ? (
            <AlertTriangle className="w-4 h-4" />
          ) : type === 'success' ? (
            <CheckCircle className="w-4 h-4" />
          ) : (
            <Activity className="w-4 h-4" />
          )}
        </div>
        <div className="flex-1">
          <p className={`text-sm font-medium ${
            type === 'warning' 
              ? 'text-yellow-800' 
              : type === 'success'
              ? 'text-green-800'
              : 'text-blue-800'
          }`}>
            {message}
          </p>
          {time && <p className="text-xs text-gray-500 mt-1">{time}</p>}
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.dashboard}</h1>
        <p className="text-gray-600">
          {t.welcome}, {currentUser?.name}! Here's your overview for today.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title={t.totalAnimals}
          value={animals.length}
          icon={Stethoscope}
          color="text-blue-600"
          subtext="Total animals under care"
        />
        
        <StatCard
          title={t.waitingPeriodActive}
          value={waitingAnimals}
          icon={Clock}
          color="text-red-600"
          subtext={urgentAnimals > 0 ? `${urgentAnimals} urgent` : 'None urgent'}
        />
        
        <StatCard
          title={t.readyToSell}
          value={readyAnimals}
          icon={CheckCircle}
          color="text-green-600"
          subtext="Safe for consumption"
        />
        
        <StatCard
          title={t.totalTreatments}
          value={treatments.length}
          icon={FileText}
          color="text-purple-600"
          subtext="This month"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Animals */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">{t.recentAnimals}</h3>
            <button className="text-green-600 hover:text-green-800 text-sm font-medium">
              {t.viewAll}
            </button>
          </div>
          
          <div className="space-y-4">
            {animals.length > 0 ? (
              animals.slice(0, 3).map((animal) => (
                <AnimalCard key={animal.id} animal={animal} />
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">{t.noAnimals}</p>
            )}
          </div>
        </div>

        {/* Notifications & Alerts */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">{t.notifications}</h3>
            <span className="text-sm text-gray-500">Today</span>
          </div>
          
          <div className="space-y-4">
            {urgentAnimals > 0 && (
              <NotificationCard
                type="warning"
                message={`${urgentAnimals} animal(s) have waiting periods ending soon`}
                time="2 hours ago"
              />
            )}
            
            {readyAnimals > 0 && (
              <NotificationCard
                type="success"
                message={`${readyAnimals} animal(s) are ready for sale`}
                time="5 hours ago"
              />
            )}
            
            {currentUser?.role === 'veterinarian' && (
              <NotificationCard
                type="info"
                message="New treatment request from Ram Kumar"
                time="1 day ago"
              />
            )}
            
            {urgentAnimals === 0 && readyAnimals === 0 && (
              <p className="text-gray-500 text-center py-4">{t.noNotifications}</p>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions - Role Based */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {currentUser?.role === 'farmer' ? (
            <>
              <button className="p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors duration-200 text-left">
                <Calendar className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-medium text-gray-900">Check Treatment Schedule</h4>
                <p className="text-sm text-gray-600">View upcoming treatment schedules</p>
              </button>
              
              <button className="p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors duration-200 text-left">
                <FileText className="w-6 h-6 text-blue-600 mb-2" />
                <h4 className="font-medium text-gray-900">Download Reports</h4>
                <p className="text-sm text-gray-600">Get treatment history reports</p>
              </button>
              
              <button className="p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors duration-200 text-left">
                <Activity className="w-6 h-6 text-purple-600 mb-2" />
                <h4 className="font-medium text-gray-900">Contact Veterinarian</h4>
                <p className="text-sm text-gray-600">Chat with your veterinarian</p>
              </button>
            </>
          ) : (
            <>
              <button className="p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors duration-200 text-left">
                <FileText className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-medium text-gray-900">Add New Treatment</h4>
                <p className="text-sm text-gray-600">Record new animal treatment</p>
              </button>
              
              <button className="p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors duration-200 text-left">
                <TrendingUp className="w-6 h-6 text-blue-600 mb-2" />
                <h4 className="font-medium text-gray-900">View Analytics</h4>
                <p className="text-sm text-gray-600">Check treatment statistics</p>
              </button>
              
              <button className="p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors duration-200 text-left">
                <Activity className="w-6 h-6 text-purple-600 mb-2" />
                <h4 className="font-medium text-gray-900">Farmer Messages</h4>
                <p className="text-sm text-gray-600">Respond to farmer queries</p>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;