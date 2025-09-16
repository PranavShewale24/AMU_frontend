import React, { useState } from 'react';
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  Calendar,
  Users,
  Activity,
  AlertTriangle,
  CheckCircle,
  Stethoscope,
  Pill
} from 'lucide-react';

// Mock analytics data
const mockAnalytics = {
  drugUsage: [
    { name: 'Amoxicillin', count: 45, percentage: 25 },
    { name: 'Oxytetracycline', count: 38, percentage: 21 },
    { name: 'Penicillin', count: 32, percentage: 18 },
    { name: 'Enrofloxacin', count: 28, percentage: 16 },
    { name: 'Ceftriaxone', count: 22, percentage: 12 },
    { name: 'Others', count: 15, percentage: 8 }
  ],
  animalTypes: [
    { type: 'Cow', count: 85, treatments: 120 },
    { type: 'Buffalo', count: 45, treatments: 67 },
    { type: 'Goat', count: 32, treatments: 45 },
    { type: 'Chicken', count: 28, treatments: 38 }
  ],
  commonDiseases: [
    { disease: 'Mastitis', count: 42, trend: 'up' },
    { disease: 'Respiratory Issues', count: 35, trend: 'down' },
    { disease: 'Digestive Problems', count: 28, trend: 'up' },
    { disease: 'Skin Infections', count: 22, trend: 'stable' },
    { disease: 'Foot & Mouth Disease', count: 15, trend: 'down' }
  ],
  monthlyTreatments: [
    { month: 'Jan', treatments: 45 },
    { month: 'Feb', treatments: 52 },
    { month: 'Mar', treatments: 48 },
    { month: 'Apr', treatments: 61 },
    { month: 'May', treatments: 58 },
    { month: 'Jun', treatments: 67 },
    { month: 'Jul', treatments: 72 },
    { month: 'Aug', treatments: 78 },
    { month: 'Sep', treatments: 58 },
    { month: 'Oct', treatments: 67 },
    { month: 'Nov', treatments: 72 },
    { month: 'Dec', treatments: 100 }
  ],
  farmerActivity: [
    { farmer: 'Ram Kumar', animals: 12, treatments: 18, lastVisit: '2024-08-25' },
    { farmer: 'Suresh Patil', animals: 8, treatments: 15, lastVisit: '2024-08-23' },
    { farmer: 'Priya Sharma', animals: 15, treatments: 22, lastVisit: '2024-08-20' },
    { farmer: 'Amit Singh', animals: 6, treatments: 9, lastVisit: '2024-08-18' }
  ]
};

const AnalyticsComponent = ({ currentUser, language = 'en' }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('treatments');

  // Language translations
  const translations = {
    en: {
      analytics: 'Analytics',
      veterinaryAnalytics: 'Veterinary Analytics & Insights',
      period: 'Period',
      thisWeek: 'This Week',
      thisMonth: 'This Month',
      thisQuarter: 'This Quarter',
      thisYear: 'This Year',
      totalTreatments: 'Total Treatments',
      totalAnimals: 'Total Animals',
      activeFarmers: 'Active Farmers',
      averageWaitingPeriod: 'Avg. Waiting Period',
      days: 'days',
      drugUsageFrequency: 'Drug Usage Frequency',
      animalTypeDistribution: 'Animal Type Distribution',
      commonDiseases: 'Common Diseases & Trends',
      monthlyTreatmentTrends: 'Monthly Treatment Trends',
      farmerActivity: 'Farmer Activity',
      farmer: 'Farmer',
      animals: 'Animals',
      treatments: 'Treatments',
      lastVisit: 'Last Visit',
      trending: 'Trending',
      up: 'Up',
      down: 'Down',
      stable: 'Stable',
      viewDetails: 'View Details',
      exportData: 'Export Data',
      refresh: 'Refresh'
    },
    hi: {
      analytics: 'विश्लेषण',
      period: 'अवधि',
      treatments: 'उपचार',
      animals: 'पशु',
      farmer: 'किसान'
    },
    mr: {
      analytics: 'विश्लेषण',
      period: 'कालावधी',
      treatments: 'उपचार',
      animals: 'जनावरे',
      farmer: 'शेतकरी'
    }
  };

  const t = translations[language];

  // Calculate key metrics
  const totalTreatments = mockAnalytics.monthlyTreatments.reduce((sum, month) => sum + month.treatments, 0);
  const totalAnimals = mockAnalytics.animalTypes.reduce((sum, type) => sum + type.count, 0);
  const activeFarmers = mockAnalytics.farmerActivity.length;
  const avgWaitingPeriod = 8.5;

  // Get trend icon and color
  const getTrendIcon = (trend) => {
    switch(trend) {
      case 'up':
        return { icon: TrendingUp, color: 'text-red-500' };
      case 'down':
        return { icon: TrendingDown, color: 'text-green-500' };
      default:
        return { icon: Activity, color: 'text-gray-500' };
    }
  };

  // Simple Bar Chart Component
  const BarChart = ({ data, title, keyName, valueName, color = 'bg-green-500' }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="space-y-3">
        {data.map((item, index) => {
          const maxValue = Math.max(...data.map(d => d[valueName]));
          const percentage = (item[valueName] / maxValue) * 100;
          
          return (
            <div key={index} className="flex items-center">
              <div className="w-20 text-sm text-gray-600 truncate mr-3">
                {item[keyName]}
              </div>
              <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                <div 
                  className={`h-full rounded-full ${color} transition-all duration-500`}
                  style={{ width: `${percentage}%` }}
                ></div>
                <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-gray-700">
                  {item[valueName]}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // Line Chart Component (simplified)
  const LineChart = ({ data, title }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="flex items-end space-x-2 h-40">
        {data.map((item, index) => {
          const maxValue = Math.max(...data.map(d => d.treatments));
          const height = (item.treatments / maxValue) * 100;
          
          return (
            <div key={index} className="flex flex-col items-center flex-1">
              <div 
                className="w-full bg-green-500 rounded-t transition-all duration-500 hover:bg-green-600"
                style={{ height: `${height}%`, minHeight: '8px' }}
              ></div>
              <div className="mt-2 text-xs text-gray-600">{item.month}</div>
              <div className="text-xs font-medium text-gray-800">{item.treatments}</div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{t.analytics}</h2>
          <p className="text-gray-600">{t.veterinaryAnalytics}</p>
        </div>
        <div className="flex space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          >
            <option value="week">{t.thisWeek}</option>
            <option value="month">{t.thisMonth}</option>
            <option value="quarter">{t.thisQuarter}</option>
            <option value="year">{t.thisYear}</option>
          </select>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
            {t.refresh}
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t.totalTreatments}</p>
              <p className="text-2xl font-bold text-gray-900">{totalTreatments}</p>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+12% from last month</span>
              </div>
            </div>
            <Stethoscope className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t.totalAnimals}</p>
              <p className="text-2xl font-bold text-gray-900">{totalAnimals}</p>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-4 h-4 text-blue-500 mr-1" />
                <span className="text-sm text-blue-600">+5% from last month</span>
              </div>
            </div>
            <Activity className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t.activeFarmers}</p>
              <p className="text-2xl font-bold text-gray-900">{activeFarmers}</p>
              <div className="flex items-center mt-1">
                <Activity className="w-4 h-4 text-gray-500 mr-1" />
                <span className="text-sm text-gray-600">Same as last month</span>
              </div>
            </div>
            <Users className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t.averageWaitingPeriod}</p>
              <p className="text-2xl font-bold text-gray-900">{avgWaitingPeriod} {t.days}</p>
              <div className="flex items-center mt-1">
                <TrendingDown className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">-2% from last month</span>
              </div>
            </div>
            <Calendar className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        
        {/* Drug Usage Chart */}
        <BarChart 
          data={mockAnalytics.drugUsage}
          title={t.drugUsageFrequency}
          keyName="name"
          valueName="count"
          color="bg-green-500"
        />

        {/* Animal Types Chart */}
        <BarChart 
          data={mockAnalytics.animalTypes}
          title={t.animalTypeDistribution}
          keyName="type"
          valueName="count"
          color="bg-blue-500"
        />
      </div>

      {/* Monthly Trends */}
      <div className="mb-8">
        <LineChart 
          data={mockAnalytics.monthlyTreatments}
          title={t.monthlyTreatmentTrends}
        />
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Common Diseases */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{t.commonDiseases}</h3>
          <div className="space-y-4">
            {mockAnalytics.commonDiseases.map((disease, index) => {
              const trend = getTrendIcon(disease.trend);
              const TrendIcon = trend.icon;
              
              return (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div>
                      <p className="font-medium text-gray-900">{disease.disease}</p>
                      <p className="text-sm text-gray-600">{disease.count} cases</p>
                    </div>
                  </div>
                  <div className={`flex items-center space-x-1 ${trend.color}`}>
                    <TrendIcon className="w-4 h-4" />
                    <span className="text-sm capitalize">{t[disease.trend] || disease.trend}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Farmer Activity */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{t.farmerActivity}</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-medium text-gray-500 uppercase">
                  <th className="pb-3">{t.farmer}</th>
                  <th className="pb-3">{t.animals}</th>
                  <th className="pb-3">{t.treatments}</th>
                  <th className="pb-3">{t.lastVisit}</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                {mockAnalytics.farmerActivity.map((farmer, index) => (
                  <tr key={index} className="border-t border-gray-100">
                    <td className="py-3">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                          <Users className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="font-medium text-gray-900">{farmer.farmer}</span>
                      </div>
                    </td>
                    <td className="py-3 text-gray-600">{farmer.animals}</td>
                    <td className="py-3 text-gray-600">{farmer.treatments}</td>
                    <td className="py-3 text-gray-600">{farmer.lastVisit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex justify-center space-x-4">
        <button className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 flex items-center space-x-2">
          <BarChart3 className="w-4 h-4" />
          <span>{t.viewDetails}</span>
        </button>
        <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 flex items-center space-x-2">
          <Activity className="w-4 h-4" />
          <span>{t.exportData}</span>
        </button>
      </div>
    </div>
  );
};

export default AnalyticsComponent;