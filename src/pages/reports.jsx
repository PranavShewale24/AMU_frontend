import React, { useState } from 'react';
import { 
  Download,
  FileText,
  Calendar,
  Filter,
  Search,
  Eye,
  Printer,
  Share2,
  BarChart3,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';

// Mock report data
const mockReports = [
  {
    id: 1,
    title: 'Monthly Treatment Report - August 2024',
    type: 'treatment',
    date: '2024-08-31',
    animals: 15,
    treatments: 23,
    farmer: 'Ram Kumar',
    status: 'completed',
    size: '2.3 MB'
  },
  {
    id: 2,
    title: 'Animal Health Summary - COW001',
    type: 'animal',
    date: '2024-08-25',
    animals: 1,
    treatments: 3,
    farmer: 'Ram Kumar',
    status: 'active',
    size: '1.1 MB'
  },
  {
    id: 3,
    title: 'Veterinary Activity Report - Dr. Sharma',
    type: 'vet',
    date: '2024-08-20',
    animals: 45,
    treatments: 67,
    farmer: 'Multiple',
    status: 'completed',
    size: '4.2 MB'
  },
  {
    id: 4,
    title: 'Drug Usage Analysis - Q3 2024',
    type: 'analytics',
    date: '2024-08-15',
    animals: 120,
    treatments: 180,
    farmer: 'All Farmers',
    status: 'pending',
    size: '3.8 MB'
  }
];

const ReportsComponent = ({ currentUser, language = 'en' }) => {
  const [reports] = useState(mockReports);
  const [selectedReportType, setSelectedReportType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('all');
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [newReport, setNewReport] = useState({
    type: 'treatment',
    dateFrom: '',
    dateTo: '',
    animalType: 'all',
    farmer: 'all'
  });

  // Language translations
  const translations = {
    en: {
      reports: 'Reports',
      downloadReports: 'Download & Export Reports',
      generateNew: 'Generate New Report',
      searchReports: 'Search reports...',
      reportType: 'Report Type',
      allReports: 'All Reports',
      treatmentReports: 'Treatment Reports',
      animalReports: 'Animal Reports',
      veterinaryReports: 'Veterinary Reports',
      analyticsReports: 'Analytics Reports',
      dateRange: 'Date Range',
      allTime: 'All Time',
      lastWeek: 'Last Week',
      lastMonth: 'Last Month',
      last3Months: 'Last 3 Months',
      title: 'Title',
      type: 'Type',
      date: 'Date',
      size: 'Size',
      status: 'Status',
      actions: 'Actions',
      download: 'Download',
      view: 'View',
      print: 'Print',
      share: 'Share',
      completed: 'Completed',
      active: 'Active',
      pending: 'Pending',
      animals: 'Animals',
      treatments: 'Treatments',
      farmer: 'Farmer',
      noReports: 'No reports found',
      generateReport: 'Generate Report',
      cancel: 'Cancel',
      create: 'Create Report',
      selectType: 'Select report type',
      selectDateRange: 'Select date range',
      from: 'From',
      to: 'To',
      animalType: 'Animal Type',
      allAnimals: 'All Animals',
      selectFarmer: 'Select Farmer',
      allFarmers: 'All Farmers'
    },
    hi: {
      reports: 'रिपोर्ट्स',
      generateNew: 'नई रिपोर्ट बनाएं',
      download: 'डाउनलोड',
      view: 'देखें',
      print: 'प्रिंट',
      completed: 'पूर्ण',
      active: 'सक्रिय',
      pending: 'प्रतीक्षारत'
    },
    mr: {
      reports: 'अहवाल',
      generateNew: 'नवीन अहवाल तयार करा',
      download: 'डाउनलोड',
      view: 'पहा',
      print: 'प्रिंट',
      completed: 'पूर्ण',
      active: 'सक्रिय',
      pending: 'प्रलंबित'
    }
  };

  const t = translations[language];

  // Filter reports based on search and filters
  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.farmer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedReportType === 'all' || report.type === selectedReportType;
    
    const matchesDateRange = () => {
      if (dateRange === 'all') return true;
      const reportDate = new Date(report.date);
      const now = new Date();
      
      switch(dateRange) {
        case 'week':
          return reportDate >= new Date(now.setDate(now.getDate() - 7));
        case 'month':
          return reportDate >= new Date(now.setMonth(now.getMonth() - 1));
        case '3months':
          return reportDate >= new Date(now.setMonth(now.getMonth() - 3));
        default:
          return true;
      }
    };
    
    return matchesSearch && matchesType && matchesDateRange();
  });

  // Get status styling
  const getStatusStyling = (status) => {
    switch(status) {
      case 'completed':
        return {
          className: 'bg-green-100 text-green-800',
          icon: CheckCircle,
          text: t.completed
        };
      case 'active':
        return {
          className: 'bg-blue-100 text-blue-800',
          icon: Clock,
          text: t.active
        };
      case 'pending':
        return {
          className: 'bg-yellow-100 text-yellow-800',
          icon: AlertTriangle,
          text: t.pending
        };
      default:
        return {
          className: 'bg-gray-100 text-gray-800',
          icon: Clock,
          text: status
        };
    }
  };

  // Handle report generation
  const handleGenerateReport = () => {
    // Simulate report generation
    console.log('Generating report:', newReport);
    setShowGenerateModal(false);
    // Reset form
    setNewReport({
      type: 'treatment',
      dateFrom: '',
      dateTo: '',
      animalType: 'all',
      farmer: 'all'
    });
  };

  // Generate New Report Modal
  const GenerateReportModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">{t.generateReport}</h3>
            <button
              onClick={() => setShowGenerateModal(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4">
            {/* Report Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.reportType}</label>
              <select
                value={newReport.type}
                onChange={(e) => setNewReport({...newReport, type: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                <option value="treatment">Treatment Report</option>
                <option value="animal">Animal Health Report</option>
                <option value="analytics">Analytics Report</option>
                {currentUser?.role === 'veterinarian' && (
                  <option value="vet">Veterinary Activity Report</option>
                )}
              </select>
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.from}</label>
                <input
                  type="date"
                  value={newReport.dateFrom}
                  onChange={(e) => setNewReport({...newReport, dateFrom: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.to}</label>
                <input
                  type="date"
                  value={newReport.dateTo}
                  onChange={(e) => setNewReport({...newReport, dateTo: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            {/* Animal Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.animalType}</label>
              <select
                value={newReport.animalType}
                onChange={(e) => setNewReport({...newReport, animalType: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                <option value="all">{t.allAnimals}</option>
                <option value="cow">🐄 Cow</option>
                <option value="buffalo">🐃 Buffalo</option>
                <option value="chicken">🐔 Chicken</option>
                <option value="goat">🐐 Goat</option>
              </select>
            </div>

            {/* Farmer Selection */}
            {currentUser?.role === 'veterinarian' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.selectFarmer}</label>
                <select
                  value={newReport.farmer}
                  onChange={(e) => setNewReport({...newReport, farmer: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  <option value="all">{t.allFarmers}</option>
                  <option value="Ram Kumar">Ram Kumar</option>
                  <option value="Suresh Patil">Suresh Patil</option>
                  <option value="Priya Sharma">Priya Sharma</option>
                </select>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => setShowGenerateModal(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
            >
              {t.cancel}
            </button>
            <button
              onClick={handleGenerateReport}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
            >
              {t.create}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{t.reports}</h2>
          <p className="text-gray-600">{t.downloadReports}</p>
        </div>
        <button
          onClick={() => setShowGenerateModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 flex items-center space-x-2 transition-colors duration-200"
        >
          <FileText className="w-4 h-4" />
          <span>{t.generateNew}</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="p-4 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder={t.searchReports}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            
            {/* Report Type Filter */}
            <select
              value={selectedReportType}
              onChange={(e) => setSelectedReportType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="all">{t.allReports}</option>
              <option value="treatment">{t.treatmentReports}</option>
              <option value="animal">{t.animalReports}</option>
              <option value="vet">{t.veterinaryReports}</option>
              <option value="analytics">{t.analyticsReports}</option>
            </select>
            
            {/* Date Range Filter */}
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="all">{t.allTime}</option>
              <option value="month">{t.lastMonth}</option>
              <option value="3months">{t.last3Months}</option>
            </select>
          </div>
        </div>

        {/* Reports Table */}
        <div className="overflow-x-auto">
          {filteredReports.length > 0 ? (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t.title}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t.type}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t.date}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t.status}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t.size}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t.actions}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredReports.map((report) => {
                      const status = getStatusStyling(report.status);
                      const StatusIcon = status.icon;
                      return (
                        <tr key={report.id} className="hover:bg-gray-50 transition-colors duration-150">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{report.title}</div>
                              <div className="text-sm text-gray-500">
                                {report.animals} {t.animals}, {report.treatments} {t.treatments}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                                report.type === 'treatment' ? 'bg-green-100' :
                                report.type === 'animal' ? 'bg-blue-100' :
                                report.type === 'vet' ? 'bg-purple-100' : 'bg-orange-100'
                              }`}>
                                <FileText className={`w-4 h-4 ${
                                  report.type === 'treatment' ? 'text-green-600' :
                                  report.type === 'animal' ? 'text-blue-600' :
                                  report.type === 'vet' ? 'text-purple-600' : 'text-orange-600'
                                }`} />
                              </div>
                              <div className="text-sm text-gray-900 capitalize">{report.type}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(report.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${status.className}`}>
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {status.text}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {report.size}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button className="text-green-600 hover:text-green-900 flex items-center space-x-1">
                                <Download className="w-4 h-4" />
                                <span>{t.download}</span>
                              </button>
                              <button className="text-blue-600 hover:text-blue-900 flex items-center space-x-1">
                                <Eye className="w-4 h-4" />
                                <span>{t.view}</span>
                              </button>
                              <button className="text-purple-600 hover:text-purple-900 flex items-center space-x-1">
                                <Share2 className="w-4 h-4" />
                                <span>{t.share}</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden p-4">
                <div className="space-y-4">
                  {filteredReports.map((report) => {
                    const status = getStatusStyling(report.status);
                    const StatusIcon = status.icon;
                    return (
                      <div key={report.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 mb-1">{report.title}</h4>
                            <p className="text-sm text-gray-600">
                              {report.animals} {t.animals}, {report.treatments} {t.treatments}
                            </p>
                          </div>
                          <div className={`px-2 py-1 text-xs font-semibold rounded-full ${status.className}`}>
                            <StatusIcon className="w-3 h-3 inline mr-1" />
                            {status.text}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                          <div>
                            <span className="text-gray-500">Type: </span>
                            <span className="text-gray-900 capitalize">{report.type}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Size: </span>
                            <span className="text-gray-900">{report.size}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Date: </span>
                            <span className="text-gray-900">{new Date(report.date).toLocaleDateString()}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Farmer: </span>
                            <span className="text-gray-900">{report.farmer}</span>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex space-x-3">
                            <button className="text-green-600 hover:text-green-900 text-sm flex items-center">
                              <Download className="w-4 h-4 mr-1" />
                              {t.download}
                            </button>
                            <button className="text-blue-600 hover:text-blue-900 text-sm flex items-center">
                              <Eye className="w-4 h-4 mr-1" />
                              {t.view}
                            </button>
                          </div>
                          <button className="text-purple-600 hover:text-purple-900 text-sm flex items-center">
                            <Share2 className="w-4 h-4 mr-1" />
                            {t.share}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <div className="p-8 text-center">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">{t.noReports}</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Reports</p>
              <p className="text-2xl font-bold text-gray-900">{reports.length}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">
                {reports.filter(r => r.status === 'completed').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {reports.filter(r => r.status === 'pending').length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-purple-600">
                {reports.filter(r => new Date(r.date).getMonth() === new Date().getMonth()).length}
              </p>
            </div>
            <Calendar className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Generate Report Modal */}
      {showGenerateModal && <GenerateReportModal />}
    </div>
  );
};

export default ReportsComponent;
              