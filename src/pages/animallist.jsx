import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  CheckCircle,
  Clock,
  Eye,
  History,
  Download,
  AlertTriangle,
  Stethoscope,
  Calendar,
  X,
  Pill,
  User
} from 'lucide-react';

// Mock animals data
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
    treatedDate: '2024-08-25',
    weight: '450kg',
    age: '3 years'
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
    treatedDate: '2024-08-15',
    weight: '550kg',
    age: '5 years'
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
    treatedDate: '2024-08-27',
    weight: '2kg',
    age: '8 months'
  },
  {
    id: 'GOT004',
    type: 'Goat',
    name: 'Chotu',
    farmer: 'Suresh Patil',
    drug: 'Penicillin',
    dose: '100ml',
    waitingPeriod: 10,
    daysLeft: 5,
    treatedBy: 'Dr. Verma',
    treatedDate: '2024-08-24',
    weight: '35kg',
    age: '2 years'
  }
];

// Mock treatment history data
const mockTreatmentHistory = {
  'COW001': [
    {
      id: 'T001',
      date: '2024-08-25',
      drug: 'Amoxicillin',
      dose: '500mg',
      condition: 'Mastitis',
      veterinarian: 'Dr. Sharma',
      waitingPeriod: 7,
      status: 'Active',
      notes: 'Bacterial infection in udder, responded well to treatment'
    },
    {
      id: 'T002',
      date: '2024-07-15',
      drug: 'Penicillin',
      dose: '300mg',
      condition: 'Respiratory Infection',
      veterinarian: 'Dr. Verma',
      waitingPeriod: 5,
      status: 'Completed',
      notes: 'Minor respiratory issues, full recovery achieved'
    },
    {
      id: 'T003',
      date: '2024-06-10',
      drug: 'Oxytetracycline',
      dose: '400ml',
      condition: 'Skin Infection',
      veterinarian: 'Dr. Sharma',
      waitingPeriod: 12,
      status: 'Completed',
      notes: 'Localized skin infection, healed completely'
    }
  ],
  'BUF002': [
    {
      id: 'T004',
      date: '2024-08-15',
      drug: 'Oxytetracycline',
      dose: '200ml',
      condition: 'Digestive Issues',
      veterinarian: 'Dr. Verma',
      waitingPeriod: 14,
      status: 'Completed',
      notes: 'Digestive problems resolved with treatment'
    },
    {
      id: 'T005',
      date: '2024-05-20',
      drug: 'Enrofloxacin',
      dose: '150mg',
      condition: 'Foot Infection',
      veterinarian: 'Dr. Sharma',
      waitingPeriod: 8,
      status: 'Completed',
      notes: 'Foot infection treated successfully'
    }
  ],
  'CHK003': [
    {
      id: 'T006',
      date: '2024-08-27',
      drug: 'Enrofloxacin',
      dose: '10mg',
      condition: 'Respiratory Issues',
      veterinarian: 'Dr. Sharma',
      waitingPeriod: 5,
      status: 'Active',
      notes: 'Treating respiratory infection in poultry'
    }
  ],
  'GOT004': [
    {
      id: 'T007',
      date: '2024-08-24',
      drug: 'Penicillin',
      dose: '100ml',
      condition: 'Wound Treatment',
      veterinarian: 'Dr. Verma',
      waitingPeriod: 10,
      status: 'Active',
      notes: 'Treating minor wound, healing progress good'
    },
    {
      id: 'T008',
      date: '2024-07-05',
      drug: 'Amoxicillin',
      dose: '200mg',
      condition: 'General Infection',
      veterinarian: 'Dr. Sharma',
      waitingPeriod: 7,
      status: 'Completed',
      notes: 'General bacterial infection treated successfully'
    }
  ]
};

const AnimalsList = ({ currentUser, setCurrentPage, language = 'en' }) => {
  const [animals] = useState(mockAnimals);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedAnimalHistory, setSelectedAnimalHistory] = useState(null);

  // Language translations
  const translations = {
    en: {
      animals: 'Animals',
      addTreatment: 'Add Treatment',
      searchAnimals: 'Search animals...',
      allTypes: 'All Types',
      allStatus: 'All Status',
      waiting: 'Waiting',
      ready: 'Ready',
      urgent: 'Urgent',
      animal: 'Animal',
      treatment: 'Treatment',
      status: 'Status',
      treatedBy: 'Treated By',
      actions: 'Actions',
      view: 'View',
      history: 'History',
      daysLeft: 'days left',
      readyToSell: 'Ready to sell',
      safeToSell: 'Safe to sell',
      activeWaiting: 'Active waiting',
      animalDetails: 'Animal Details',
      treatmentHistory: 'Treatment History',
      close: 'Close',
      downloadReport: 'Download Report',
      weight: 'Weight',
      age: 'Age',
      lastTreated: 'Last Treated',
      waitingPeriod: 'Waiting Period',
      farmer: 'Farmer',
      noAnimalsFound: 'No animals found matching your criteria',
      noHistoryFound: 'No treatment history found for this animal',
      condition: 'Condition',
      dose: 'Dose',
      notes: 'Notes',
      active: 'Active',
      completed: 'Completed',
      treatmentDate: 'Treatment Date',
      veterinarian: 'Veterinarian'
    },
    hi: {
      animals: 'पशु',
      addTreatment: 'उपचार जोड़ें',
      searchAnimals: 'पशु खोजें...',
      allTypes: 'सभी प्रकार',
      view: 'देखें',
      history: 'इतिहास',
      treatmentHistory: 'उपचार इतिहास',
      close: 'बंद करें'
    },
    mr: {
      animals: 'जनावरे',
      addTreatment: 'उपचार जोडा',
      searchAnimals: 'जनावरे शोधा...',
      allTypes: 'सर्व प्रकार',
      view: 'पहा',
      history: 'इतिहास',
      treatmentHistory: 'उपचार इतिहास',
      close: 'बंद करा'
    }
  };

  const t = translations[language];

  // Filter animals based on search and filters
  const filteredAnimals = animals.filter(animal => {
    const matchesSearch = animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         animal.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         animal.farmer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || animal.type.toLowerCase() === filterType.toLowerCase();
    
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'waiting' && animal.daysLeft > 0) ||
                         (filterStatus === 'ready' && animal.daysLeft === 0) ||
                         (filterStatus === 'urgent' && animal.daysLeft <= 3 && animal.daysLeft > 0);
    
    return matchesSearch && matchesType && matchesStatus;
  });

  // Get status badge styling
  const getStatusBadge = (animal) => {
    if (animal.daysLeft === 0) {
      return {
        className: 'bg-green-100 text-green-800',
        icon: CheckCircle,
        text: t.readyToSell || 'Ready to sell'
      };
    } else if (animal.daysLeft <= 3) {
      return {
        className: 'bg-red-100 text-red-800',
        icon: AlertTriangle,
        text: `${animal.daysLeft} ${t.daysLeft || 'days left'} (Urgent)`
      };
    } else {
      return {
        className: 'bg-yellow-100 text-yellow-800',
        icon: Clock,
        text: `${animal.daysLeft} ${t.daysLeft || 'days left'}`
      };
    }
  };

  // Get animal type icon color
  const getAnimalTypeColor = (type) => {
    switch(type.toLowerCase()) {
      case 'cow': return 'text-brown-600 bg-brown-100';
      case 'buffalo': return 'text-gray-600 bg-gray-100';
      case 'chicken': return 'text-yellow-600 bg-yellow-100';
      case 'goat': return 'text-green-600 bg-green-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  // Handle history button click
  const handleHistoryClick = (animal) => {
    setSelectedAnimalHistory({
      animal: animal,
      history: mockTreatmentHistory[animal.id] || []
    });
    setShowHistory(true);
  };

  // Get treatment status color
  const getStatusColor = (status) => {
    return status === 'Active' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800';
  };

  // Animal Details Modal
  const AnimalDetailsModal = ({ animal, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-xl font-bold text-gray-900">{t.animalDetails}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className={`w-16 h-16 rounded-lg flex items-center justify-center ${getAnimalTypeColor(animal.type)}`}>
                <Stethoscope className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900">{animal.name}</h4>
                <p className="text-gray-600">{animal.type} - {animal.id}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-700">{t.farmer}</p>
                <p className="text-gray-900">{animal.farmer}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">{t.weight}</p>
                <p className="text-gray-900">{animal.weight}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">{t.age}</p>
                <p className="text-gray-900">{animal.age}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">{t.treatedBy}</p>
                <p className="text-gray-900">{animal.treatedBy}</p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h5 className="font-medium text-gray-900 mb-2">Current Treatment</h5>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Drug:</span>
                  <span className="font-medium">{animal.drug}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dose:</span>
                  <span className="font-medium">{animal.dose}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t.waitingPeriod}:</span>
                  <span className="font-medium">{animal.waitingPeriod} days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t.lastTreated}:</span>
                  <span className="font-medium">{animal.treatedDate}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              {(() => {
                const status = getStatusBadge(animal);
                const Icon = status.icon;
                return (
                  <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${status.className}`}>
                    <Icon className="w-4 h-4 mr-2" />
                    {status.text}
                  </div>
                );
              })()}
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
            >
              {t.close}
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>{t.downloadReport}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Treatment History Modal
  const TreatmentHistoryModal = ({ animalData, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getAnimalTypeColor(animalData.animal.type)}`}>
                <Stethoscope className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{t.treatmentHistory}</h3>
                <p className="text-gray-600">{animalData.animal.name} ({animalData.animal.type} - {animalData.animal.id})</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {animalData.history.length > 0 ? (
            <div className="space-y-4">
              {animalData.history.map((treatment, index) => (
                <div key={treatment.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Pill className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{treatment.condition}</h4>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>{treatment.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(treatment.status)}`}>
                      {treatment.status}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Pill className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">Drug:</span>
                        <span className="font-medium text-gray-900">{treatment.drug}</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 text-sm">
                        <span className="text-gray-600">{t.dose}:</span>
                        <span className="font-medium text-gray-900">{treatment.dose}</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 text-sm">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">{t.veterinarian}:</span>
                        <span className="font-medium text-gray-900">{treatment.veterinarian}</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">{t.waitingPeriod}:</span>
                        <span className="font-medium text-gray-900">{treatment.waitingPeriod} days</span>
                      </div>
                    </div>
                  </div>

                  {treatment.notes && (
                    <div className="border-t border-gray-200 pt-4">
                      <p className="text-sm font-medium text-gray-700 mb-1">{t.notes}:</p>
                      <p className="text-sm text-gray-600">{treatment.notes}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <History className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">{t.noHistoryFound}</p>
            </div>
          )}

          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
            >
              {t.close}
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>{t.downloadReport}</span>
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
          <h2 className="text-2xl font-bold text-gray-800">{t.animals}</h2>
          <p className="text-gray-600">Manage and monitor your animals</p>
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

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder={t.searchAnimals}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            
            {/* Type Filter */}
            <div className="sm:w-40">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">{t.allTypes}</option>
                <option value="cow">🐄 Cow</option>
                <option value="buffalo">🐃 Buffalo</option>
                <option value="chicken">🐔 Chicken</option>
                <option value="goat">🐐 Goat</option>
              </select>
            </div>
            
            {/* Status Filter */}
            <div className="sm:w-40">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">{t.allStatus}</option>
                <option value="waiting">{t.waiting}</option>
                <option value="ready">{t.ready}</option>
                <option value="urgent">{t.urgent}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Animals Table/Cards */}
        <div className="overflow-x-auto">
          {filteredAnimals.length > 0 ? (
            <>
              {/* Desktop Table View */}
              <div className="hidden md:block">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t.animal}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t.treatment}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t.status}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t.treatedBy}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t.actions}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredAnimals.map((animal) => {
                      const status = getStatusBadge(animal);
                      const Icon = status.icon;
                      return (
                        <tr key={animal.id} className="hover:bg-gray-50 transition-colors duration-150">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${getAnimalTypeColor(animal.type)}`}>
                                <Stethoscope className="w-5 h-5" />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">{animal.name}</div>
                                <div className="text-sm text-gray-500">{animal.type} - {animal.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm text-gray-900">{animal.drug}</div>
                              <div className="text-sm text-gray-500">{animal.dose}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${status.className}`}>
                              <Icon className="w-3 h-3 mr-1" />
                              {status.text}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {animal.treatedBy}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => {
                                  setSelectedAnimal(animal);
                                  setShowDetails(true);
                                }}
                                className="text-green-600 hover:text-green-900 flex items-center space-x-1"
                              >
                                <Eye className="w-4 h-4" />
                                <span>{t.view}</span>
                              </button>
                              <button 
                                onClick={() => handleHistoryClick(animal)}
                                className="text-blue-600 hover:text-blue-900 flex items-center space-x-1"
                              >
                                <History className="w-4 h-4" />
                                <span>{t.history}</span>
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
                  {filteredAnimals.map((animal) => {
                    const status = getStatusBadge(animal);
                    const Icon = status.icon;
                    return (
                      <div key={animal.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${getAnimalTypeColor(animal.type)}`}>
                              <Stethoscope className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{animal.name}</div>
                              <div className="text-sm text-gray-500">{animal.type} - {animal.id}</div>
                            </div>
                          </div>
                          <div className={`px-2 py-1 text-xs font-semibold rounded-full ${status.className}`}>
                            <Icon className="w-3 h-3 inline mr-1" />
                            {animal.daysLeft === 0 ? t.ready : `${animal.daysLeft}d`}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                          <div>
                            <span className="text-gray-500">Drug: </span>
                            <span className="text-gray-900">{animal.drug}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Dose: </span>
                            <span className="text-gray-900">{animal.dose}</span>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-gray-600">{animal.treatedBy}</div>
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => {
                                setSelectedAnimal(animal);
                                setShowDetails(true);
                              }}
                              className="text-green-600 hover:text-green-900 text-sm flex items-center"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              {t.view}
                            </button>
                            <button 
                              onClick={() => handleHistoryClick(animal)}
                              className="text-blue-600 hover:text-blue-900 text-sm flex items-center"
                            >
                              <History className="w-4 h-4 mr-1" />
                              {t.history}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <div className="p-8 text-center">
              <Stethoscope className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">{t.noAnimalsFound}</p>
            </div>
          )}
        </div>
      </div>

      {/* Animal Details Modal */}
      {showDetails && selectedAnimal && (
        <AnimalDetailsModal
          animal={selectedAnimal}
          onClose={() => {
            setShowDetails(false);
            setSelectedAnimal(null);
          }}
        />
      )}

      {/* Treatment History Modal */}
      {showHistory && selectedAnimalHistory && (
        <TreatmentHistoryModal
          animalData={selectedAnimalHistory}
          onClose={() => {
            setShowHistory(false);
            setSelectedAnimalHistory(null);
          }}
        />
      )}
    </div>
  );
};

export default AnimalsList;