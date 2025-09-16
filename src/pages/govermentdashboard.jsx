import React, { useState } from 'react';
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  Calendar,
  AlertTriangle,
  Activity,
  Pill,
  Shield,
  FileText,
  Download,
  Eye,
  MapPin,
  Users,
  Stethoscope
} from 'lucide-react';

// Mock analytics data for government view
const mockGovtData = {
  drugUsage: [
    { name: 'Amoxicillin', count: 245, percentage: 28, risk: 'medium', regulated: true },
    { name: 'Oxytetracycline', count: 198, percentage: 23, risk: 'high', regulated: true },
    { name: 'Penicillin', count: 167, percentage: 19, risk: 'low', regulated: false },
    { name: 'Enrofloxacin', count: 134, percentage: 15, risk: 'high', regulated: true },
    { name: 'Ceftriaxone', count: 89, percentage: 10, risk: 'medium', regulated: true },
    { name: 'Others', count: 45, percentage: 5, risk: 'low', regulated: false }
  ],
  commonDiseases: [
    { 
      disease: 'Mastitis', 
      count: 312, 
      trend: 'up', 
      severity: 'high',
      regions: ['Maharashtra', 'Punjab', 'Gujarat'],
      drugResistance: 15
    },
    { 
      disease: 'Respiratory Issues', 
      count: 267, 
      trend: 'stable', 
      severity: 'medium',
      regions: ['Rajasthan', 'Haryana', 'UP'],
      drugResistance: 8
    },
    { 
      disease: 'Digestive Problems', 
      count: 189, 
      trend: 'down', 
      severity: 'low',
      regions: ['Tamil Nadu', 'Karnataka', 'AP'],
      drugResistance: 3
    },
    { 
      disease: 'Foot & Mouth Disease', 
      count: 145, 
      trend: 'up', 
      severity: 'critical',
      regions: ['West Bengal', 'Bihar', 'Odisha'],
      drugResistance: 22
    },
    { 
      disease: 'Skin Infections', 
      count: 123, 
      trend: 'stable', 
      severity: 'medium',
      regions: ['Kerala', 'Goa', 'Maharashtra'],
      drugResistance: 12
    }
  ],
  overallStats: {
    totalReports: 1234,
    criticalAlerts: 23,
    regulatedDrugs: 156,
    activeFarms: 2456
  }
};

const GovtDashboard = ({ currentUser, language = 'en' }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [activeTab, setActiveTab] = useState('overview');

  const translations = {
    en: {
      govtDashboard: 'Government Veterinary Oversight Dashboard',
      drugUsageFrequency: 'Drug Usage Frequency & Regulation Status',
      commonDiseases: 'Disease Outbreaks & Resistance Monitoring',
      overview: 'Overview',
      alerts: 'Alerts',
      reports: 'Reports',
      totalReports: 'Total Reports',
      criticalAlerts: 'Critical Alerts',
      regulatedDrugs: 'Regulated Drugs',
      activeFarms: 'Active Farms',
      riskLevel: 'Risk Level',
      regulated: 'Regulated',
      unregulated: 'Not Regulated',
      high: 'High',
      medium: 'Medium',
      low: 'Low',
      critical: 'Critical',
      drugResistance: 'Drug Resistance',
      affectedRegions: 'Affected Regions',
      viewDetails: 'View Details',
      generateReport: 'Generate Report',
      exportData: 'Export Data',
      thisMonth: 'This Month',
      thisQuarter: 'This Quarter',
      thisYear: 'This Year',
      trending: 'Trending'
    }
  };

  const t = translations[language];

  // Get risk color
  const getRiskColor = (risk) => {
    switch(risk) {
      case 'critical': return 'bg-red-600 text-white';
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Get trend icon and color
  const getTrendIcon = (trend) => {
    switch(trend) {
      case 'up':
        return { icon: TrendingUp, color: 'text-red-500', bg: 'bg-red-50' };
      case 'down':
        return { icon: TrendingDown, color: 'text-green-500', bg: 'bg-green-50' };
      default:
        return { icon: Activity, color: 'text-blue-500', bg: 'bg-blue-50' };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.govtDashboard}</h1>
            <p className="text-gray-600 flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              Monitoring livestock health and drug usage across regions
            </p>
          </div>
          <div className="flex space-x-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
            >
              <option value="month">{t.thisMonth}</option>
              <option value="quarter">{t.thisQuarter}</option>
              <option value="year">{t.thisYear}</option>
            </select>
          </div>
        </div>

        {/* Key Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{t.totalReports}</p>
                <p className="text-2xl font-bold text-gray-900">{mockGovtData.overallStats.totalReports}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+8% this month</span>
                </div>
              </div>
              <FileText className="w-10 h-10 text-blue-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{t.criticalAlerts}</p>
                <p className="text-2xl font-bold text-gray-900">{mockGovtData.overallStats.criticalAlerts}</p>
                <div className="flex items-center mt-1">
                  <AlertTriangle className="w-4 h-4 text-red-500 mr-1" />
                  <span className="text-sm text-red-600">Requires attention</span>
                </div>
              </div>
              <AlertTriangle className="w-10 h-10 text-red-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{t.regulatedDrugs}</p>
                <p className="text-2xl font-bold text-gray-900">{mockGovtData.overallStats.regulatedDrugs}</p>
                <div className="flex items-center mt-1">
                  <Pill className="w-4 h-4 text-purple-500 mr-1" />
                  <span className="text-sm text-purple-600">Under monitoring</span>
                </div>
              </div>
              <Pill className="w-10 h-10 text-purple-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{t.activeFarms}</p>
                <p className="text-2xl font-bold text-gray-900">{mockGovtData.overallStats.activeFarms}</p>
                <div className="flex items-center mt-1">
                  <Users className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+12% this month</span>
                </div>
              </div>
              <Users className="w-10 h-10 text-green-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Drug Usage Frequency */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">{t.drugUsageFrequency}</h3>
                <p className="text-blue-100 text-sm">Regulation compliance and risk assessment</p>
              </div>
              <Pill className="w-8 h-8 text-blue-200" />
            </div>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {mockGovtData.drugUsage.map((drug, index) => {
                const maxValue = Math.max(...mockGovtData.drugUsage.map(d => d.count));
                const percentage = (drug.count / maxValue) * 100;
                
                return (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <h4 className="font-medium text-gray-900">{drug.name}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(drug.risk)}`}>
                          {t[drug.risk] || drug.risk}
                        </span>
                        {drug.regulated && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                            {t.regulated}
                          </span>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900">{drug.count}</div>
                        <div className="text-sm text-gray-500">{drug.percentage}%</div>
                      </div>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all duration-500 ${
                          drug.risk === 'high' ? 'bg-red-500' : 
                          drug.risk === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-6 flex space-x-3">
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center justify-center space-x-2">
                <Eye className="w-4 h-4" />
                <span>{t.viewDetails}</span>
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>{t.exportData}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Common Diseases */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-red-600 to-red-700 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">{t.commonDiseases}</h3>
                <p className="text-red-100 text-sm">Disease outbreaks and resistance patterns</p>
              </div>
              <Stethoscope className="w-8 h-8 text-red-200" />
            </div>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {mockGovtData.commonDiseases.map((disease, index) => {
                const trend = getTrendIcon(disease.trend);
                const TrendIcon = trend.icon;
                
                return (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${trend.bg}`}>
                          <TrendIcon className={`w-4 h-4 ${trend.color}`} />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{disease.disease}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(disease.severity)}`}>
                              {t[disease.severity] || disease.severity}
                            </span>
                            <span className="text-sm text-gray-600">{disease.count} cases</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 flex items-center">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          {t.drugResistance}:
                        </span>
                        <span className={`font-medium ${disease.drugResistance > 15 ? 'text-red-600' : disease.drugResistance > 10 ? 'text-yellow-600' : 'text-green-600'}`}>
                          {disease.drugResistance}%
                        </span>
                      </div>
                      
                      <div className="flex items-start justify-between text-sm">
                        <span className="text-gray-600 flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {t.affectedRegions}:
                        </span>
                        <div className="text-right">
                          {disease.regions.map((region, i) => (
                            <span key={i} className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs mr-1 mb-1">
                              {region}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-6 flex space-x-3">
              <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium flex items-center justify-center space-x-2">
                <AlertTriangle className="w-4 h-4" />
                <span>{t.viewDetails}</span>
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium flex items-center space-x-2">
                <FileText className="w-4 h-4" />
                <span>{t.generateReport}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="mt-8 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">Government Actions</h3>
            <p className="text-gray-600 text-sm">Quick access to regulatory tools and reports</p>
          </div>
          <div className="flex space-x-3">
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 flex items-center space-x-2 shadow-lg">
              <BarChart3 className="w-4 h-4" />
              <span>Detailed Analytics</span>
            </button>
            <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-medium hover:from-green-700 hover:to-green-800 flex items-center space-x-2 shadow-lg">
              <FileText className="w-4 h-4" />
              <span>Compliance Report</span>
            </button>
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export All Data</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GovtDashboard;