import React, { useEffect, useState } from 'react';

import { 
  Search,
  Filter,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  Eye,
  Download,
  Plus,
  Stethoscope,
  User,
  Pill
} from 'lucide-react';

// Mock treatments data
const mockTreatments = [
  {
    id: 1,
    animalId: 'COW001',
    animalName: 'Bella',
    animalType: 'Cow',
    farmer: 'Ram Kumar',
    drug: 'Amoxicillin',
    dose: '500mg',
    waitingPeriod: 7,
    daysLeft: 3,
    treatmentDate: '2024-08-25',
    treatmentReason: 'Mastitis',
    veterinarian: 'Dr. Sharma',
    status: 'active',
    notes: 'Monitor temperature daily'
  },
  {
    id: 2,
    animalId: 'BUF002',
    animalName: 'Moti',
    animalType: 'Buffalo',
    farmer: 'Suresh Patil',
    drug: 'Oxytetracycline',
    dose: '200ml',
    waitingPeriod: 14,
    daysLeft: 0,
    treatmentDate: '2024-08-15',
    treatmentReason: 'Respiratory infection',
    veterinarian: 'Dr. Verma',
    status: 'completed',
    notes: 'Full recovery observed'
  },
  {
    id: 3,
    animalId: 'CHK003',
    animalName: 'Fluffy',
    animalType: 'Chicken',
    farmer: 'Ram Kumar',
    drug: 'Enrofloxacin',
    dose: '10mg',
    waitingPeriod: 5,
    daysLeft: 2,
    treatmentDate: '2024-08-27',
    treatmentReason: 'Digestive issues',
    veterinarian: 'Dr. Sharma',
    status: 'active',
    notes: 'Appetite improving'
  },
  {
    id: 4,
    animalId: 'GOT004',
    animalName: 'Chotu',
    animalType: 'Goat',
    farmer: 'Suresh Patil',
    drug: 'Penicillin',
    dose: '100ml',
    waitingPeriod: 10,
    daysLeft: 5,
    treatmentDate: '2024-08-24',
    treatmentReason: 'Wound infection',
    veterinarian: 'Dr. Verma',
    status: 'active',
    notes: 'Wound healing well'
  },
  {
    id: 5,
    animalId: 'COW005',
    animalName: 'Ganga',
    animalType: 'Cow',
    farmer: 'Priya Sharma',
    drug: 'Ceftriaxone',
    dose: '1g',
    waitingPeriod: 8,
    daysLeft: 1,
    treatmentDate: '2024-08-28',
    treatmentReason: 'Fever',
    veterinarian: 'Dr. Sharma',
    status: 'active',
    notes: 'Temperature normalized'
  }
];


const TreatmentsComponent = ({ currentUser, setCurrentPage, language = 'en' }) => {
  const [treatments,settreatments] = useState(mockTreatments);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterAnimalType, setFilterAnimalType] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Language translations
  const translations = {
    en: {
      treatments: 'Treatments',
      treatmentHistory: 'Treatment History & Records',
      addTreatment: 'Add Treatment',
      searchTreatments: 'Search treatments...',
      allStatus: 'All Status',
      active: 'Active',
      completed: 'Completed',
      urgent: 'Urgent',
      allTypes: 'All Types',
      sortBy: 'Sort By',
      date: 'Date',
      animal: 'Animal',
      status: 'Status',
      daysLeft: 'Days Left',
      animalId: 'Animal ID',
      drug: 'Drug',
      dose: 'Dose',
      farmer: 'Farmer',
      veterinarian: 'Veterinarian',
      treatmentDate: 'Treatment Date',
      waitingPeriod: 'Waiting Period',
      reason: 'Reason',
      notes: 'Notes',
      actions: 'Actions',
      view: 'View',
      download: 'Download',
      treatmentDetails: 'Treatment Details',
      close: 'Close',
      readyToSell: 'Ready to sell',
      daysRemaining: 'days remaining',
      noTreatments: 'No treatments found',
      totalTreatments: 'Total Treatments',
      activeTreatments: 'Active Treatments',
      completedTreatments: 'Completed Treatments',
      urgentTreatments: 'Urgent Treatments'
    },
    hi: {
      treatments: 'उपचार',
      addTreatment: 'उपचार जोड़ें',
      searchTreatments: 'उपचार खोजें...',
      active: 'सक्रिय',
      completed: 'पूर्ण',
      urgent: 'तत्काल'
    },
    mr: {
      treatments: 'उपचार',
      addTreatment: 'उपचार जोडा',
      searchTreatments: 'उपचार शोधा...',
      active: 'सक्रिय',
      completed: 'पूर्ण',
      urgent: 'तातडीचे'
    }
  };

  const t = translations[language];

  // Filter and sort treatments
  const filteredTreatments = treatments.filter(treatment => {
    const matchesSearch = treatment.animalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         treatment.animalId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         treatment.drug.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         treatment.farmer.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'all' ||
                         (filterStatus === 'active' && treatment.daysLeft > 0) ||
                         (filterStatus === 'completed' && treatment.daysLeft === 0) ;

    const matchesAnimalType = filterAnimalType === 'all' || 
                             treatment.animalType.toLowerCase() === filterAnimalType.toLowerCase();

    // Filter by user role
    // const matchesUser = currentUser?.role === 'veterinarian' || 
    //                    treatment.farmer === currentUser?.name;

    return matchesSearch && matchesStatus && matchesAnimalType //&& matchesUser;
  }).sort((a, b) => {
    switch(sortBy) {
      case 'date':
        return new Date(b.treatmentDate) - new Date(a.treatmentDate);
      case 'daysLeft':
        return a.daysLeft - b.daysLeft;
      case 'animal':
        return a.animalName.localeCompare(b.animalName);
      default:
        return 0;
    }
  });

  // Get status styling
 const getStatusStyling = (treatment) => {
  if (treatment.daysLeft === 0) {
    return {
      className: 'bg-green-100 text-green-800',
      icon: CheckCircle,
      text: t.readyToSell
    };
  } else if (treatment.daysLeft <= 3) {
    return {
      className: 'bg-red-100 text-red-800',
      icon: AlertTriangle,
      text: `${treatment.daysLeft} ${t.daysRemaining} (${t.urgent})`
    };
  } else {
    return {
      className: 'bg-yellow-100 text-yellow-800',
      icon: Clock,
      text: `${treatment.daysLeft} ${t.daysRemaining}`
    };
  }
};


  // Get animal type color
  const getAnimalTypeColor = (type) => {
    switch(type.toLowerCase()) {
      case 'cow': return 'text-brown-600 bg-brown-100';
      case 'buffalo': return 'text-gray-600 bg-gray-100';
      case 'chicken': return 'text-yellow-600 bg-yellow-100';
      case 'goat': return 'text-green-600 bg-green-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  // Treatment details modal
  const TreatmentDetailsModal = ({ treatment, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-xl font-bold text-gray-900">{t.treatmentDetails}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Animal Information */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800 border-b border-gray-200 pb-2">
                Animal Information
              </h4>
              
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getAnimalTypeColor(treatment.animalType)}`}>
                  <Stethoscope className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{treatment.animalName}</p>
                  <p className="text-gray-600">{treatment.animalType} - {treatment.animalId}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t.farmer}:</span>
                  <span className="font-medium text-gray-900">{treatment.farmer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t.veterinarian}:</span>
                  <span className="font-medium text-gray-900">{treatment.veterinarian}</span>
                </div>
              </div>
            </div>

            {/* Treatment Information */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800 border-b border-gray-200 pb-2">
                Treatment Information
              </h4>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t.drug}:</span>
                  <span className="font-medium text-gray-900">{treatment.drug}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t.dose}:</span>
                  <span className="font-medium text-gray-900">{treatment.dose}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t.treatmentDate}:</span>
                  <span className="font-medium text-gray-900">{treatment.treatmentDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t.waitingPeriod}:</span>
                  <span className="font-medium text-gray-900">{treatment.waitingPeriod} days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t.reason}:</span>
                  <span className="font-medium text-gray-900">{treatment.treatmentReason}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-700">Current Status:</span>
              {(() => {
                const status = getStatusStyling(treatment);
                const Icon = status.icon;
                return (
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${status.className}`}>
                    <Icon className="w-4 h-4 mr-2" />
                    {status.text}
                  </div>
                );
              })()}
            </div>
          </div>

          {/* Notes */}
          {treatment.notes && (
            <div className="mt-6">
              <h4 className="font-semibold text-gray-800 mb-2">{t.notes}</h4>
              <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{treatment.notes}</p>
            </div>
          )}

          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
            >
              {t.close}
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>{t.download}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Calculate stats
  const totalTreatments = filteredTreatments.length;
  const activeTreatments = filteredTreatments.filter(t => t.daysLeft > 0).length;
  const completedTreatments = filteredTreatments.filter(t => t.daysLeft === 0).length;
  const urgentTreatments = filteredTreatments.filter(t => t.daysLeft <= 3 && t.daysLeft > 0).length;

  return (
    <div className="p-6">
      {/* Header */}
     
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{t.treatments}</h2>
          <p className="text-gray-600">{t.treatmentHistory}</p>
        </div>
        {currentUser?.role === 'veterinarian' && (
          <button
            onClick={() => setCurrentPage('add-treatment')}
            className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 flex items-center space-x-2 transition-colors duration-200"
          >
            <Plus className="w-4 h-4" />
            <span>{t.addTreatment}</span>
          </button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t.totalTreatments}</p>
              <p className="text-2xl font-bold text-gray-900">{totalTreatments}</p>
            </div>
            <Pill className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t.activeTreatments}</p>
              <p className="text-2xl font-bold text-yellow-600">{activeTreatments}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t.completedTreatments}</p>
              <p className="text-2xl font-bold text-green-600">{completedTreatments}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>

        
      </div>
      
      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="p-4 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder={t.searchTreatments}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="all">{t.allStatus}</option>
              <option value="active">{t.active}</option>
              <option value="completed">{t.completed}</option>
              
            </select>

            {/* Animal Type Filter */}
            <select
              value={filterAnimalType}
              onChange={(e) => setFilterAnimalType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="all">{t.allTypes}</option>
              <option value="cow">🐄 Cow</option>
              <option value="buffalo">🐃 Buffalo</option>
              <option value="chicken">🐔 Chicken</option>
              <option value="goat">🐐 Goat</option>
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="date">{t.date}</option>
              <option value="daysLeft">{t.daysLeft}</option>
              <option value="animal">{t.animal}</option>
            </select>
          </div>
        </div>

        {/* Treatments Table */}
        <div className="overflow-x-auto">
          {filteredTreatments.length > 0 ? (
            <>
              {/* Desktop Table */}
              <div className="hidden lg:block">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t.animal}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t.drug} / {t.dose}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t.farmer}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t.status}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t.treatmentDate}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t.actions}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredTreatments.map((treatment) => {
                      const status = getStatusStyling(treatment);
                      const Icon = status.icon;
                      return (
                        <tr key={treatment.id} className="hover:bg-gray-50 transition-colors duration-150">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${getAnimalTypeColor(treatment.animalType)}`}>
                                <Stethoscope className="w-5 h-5" />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">{treatment.animalName}</div>
                                <div className="text-sm text-gray-500">{treatment.animalType} - {treatment.animalId}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm text-gray-900">{treatment.drug}</div>
                              <div className="text-sm text-gray-500">{treatment.dose}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <User className="w-4 h-4 text-gray-400 mr-2" />
                              <span className="text-sm text-gray-900">{treatment.farmer}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${status.className}`}>
                              <Icon className="w-3 h-3 mr-1" />
                              {treatment.daysLeft === 0 ? t.completed : `${treatment.daysLeft}d`}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {treatment.treatmentDate}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => {
                                setSelectedTreatment(treatment);
                                setShowDetails(true);
                              }}
                              className="text-green-600 hover:text-green-900 flex items-center space-x-1"
                            >
                              <Eye className="w-4 h-4" />
                              <span>{t.view}</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="lg:hidden p-4">
                <div className="space-y-4">
                  {filteredTreatments.map((treatment) => {
                    const status = getStatusStyling(treatment);
                    const Icon = status.icon;
                    return (
                      <div key={treatment.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${getAnimalTypeColor(treatment.animalType)}`}>
                              <Stethoscope className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{treatment.animalName}</div>
                              <div className="text-sm text-gray-500">{treatment.animalType} - {treatment.animalId}</div>
                            </div>
                          </div>
                          <div className={`px-2 py-1 text-xs font-semibold rounded-full ${status.className}`}>
                            <Icon className="w-3 h-3 inline mr-1" />
                            {treatment.daysLeft === 0 ? t.completed : `${treatment.daysLeft}d`}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                          <div>
                            <span className="text-gray-500">{t.drug}: </span>
                            <span className="text-gray-900">{treatment.drug}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">{t.dose}: </span>
                            <span className="text-gray-900">{treatment.dose}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">{t.farmer}: </span>
                            <span className="text-gray-900">{treatment.farmer}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">{t.date}: </span>
                            <span className="text-gray-900">{treatment.treatmentDate}</span>
                          </div>
                        </div>
                        
                        <div className="flex justify-end">
                          <button
                            onClick={() => {
                              setSelectedTreatment(treatment);
                              setShowDetails(true);
                            }}
                            className="text-green-600 hover:text-green-900 text-sm flex items-center"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            {t.view}
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
              <Pill className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">{t.noTreatments}</p>
            </div>
          )}
        </div>
      </div>

      {/* Treatment Details Modal */}
      {showDetails && selectedTreatment && (
        <TreatmentDetailsModal
          treatment={selectedTreatment}
          onClose={() => {
            setShowDetails(false);
            setSelectedTreatment(null);
          }}
        />
      )}
    </div>
  );
};

export default TreatmentsComponent;