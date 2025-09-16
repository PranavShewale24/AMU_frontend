import { useState, useMemo } from 'react';
import { Search, Filter, Users, PawPrint, Activity, Calendar, X, FileText, Clock, Stethoscope } from 'lucide-react';

const Client = () => {
  const [clients] = useState([
    { 
      id: 'C001', 
      farmerName: 'John Smith', 
      totalAnimals: 3, 
      activeAnimals: 2, 
      currentMonthCount: 1,
      animals: [
        {
          id: 'A001',
          name: 'Bella',
          type: 'Cow',
          treatments: [
            { date: '2025-01-15', treatment: 'Vaccination - FMD', doctor: 'Dr. Wilson', status: 'Completed' },
            { date: '2025-01-10', treatment: 'Health Checkup', doctor: 'Dr. Smith', status: 'Completed' },
            { date: '2024-12-20', treatment: 'Deworming', doctor: 'Dr. Wilson', status: 'Completed' }
          ]
        },
        {
          id: 'A002',
          name: 'Max',
          type: 'Bull',
          treatments: [
            { date: '2025-01-12', treatment: 'Injury Treatment', doctor: 'Dr. Johnson', status: 'Ongoing' },
            { date: '2024-12-28', treatment: 'Vaccination - Anthrax', doctor: 'Dr. Smith', status: 'Completed' }
          ]
        },
        {
          id: 'A003',
          name: 'Luna',
          type: 'Calf',
          treatments: [
            { date: '2025-01-08', treatment: 'Growth Assessment', doctor: 'Dr. Wilson', status: 'Completed' }
          ]
        }
      ]
    },
    { 
      id: 'C002', 
      farmerName: 'Maria Garcia', 
      totalAnimals: 5, 
      activeAnimals: 4, 
      currentMonthCount: 2,
      animals: [
        {
          id: 'A004',
          name: 'Rocky',
          type: 'Horse',
          treatments: [
            { date: '2025-01-14', treatment: 'Hoof Care', doctor: 'Dr. Martinez', status: 'Completed' },
            { date: '2025-01-02', treatment: 'Dental Checkup', doctor: 'Dr. Brown', status: 'Completed' }
          ]
        },
        {
          id: 'A005',
          name: 'Daisy',
          type: 'Cow',
          treatments: [
            { date: '2025-01-11', treatment: 'Mastitis Treatment', doctor: 'Dr. Martinez', status: 'Ongoing' }
          ]
        }
      ]
    },
    { 
      id: 'C003', 
      farmerName: 'David Johnson', 
      totalAnimals: 2, 
      activeAnimals: 2, 
      currentMonthCount: 0,
      animals: [
        {
          id: 'A006',
          name: 'Storm',
          type: 'Horse',
          treatments: [
            { date: '2024-12-15', treatment: 'Regular Checkup', doctor: 'Dr. Lee', status: 'Completed' }
          ]
        }
      ]
    },
    { 
      id: 'C004', 
      farmerName: 'Sarah Wilson', 
      totalAnimals: 7, 
      activeAnimals: 6, 
      currentMonthCount: 3,
      animals: [
        {
          id: 'A007',
          name: 'Thunder',
          type: 'Bull',
          treatments: [
            { date: '2025-01-16', treatment: 'Breeding Examination', doctor: 'Dr. Taylor', status: 'Scheduled' },
            { date: '2025-01-05', treatment: 'Nutrition Consultation', doctor: 'Dr. Green', status: 'Completed' }
          ]
        }
      ]
    },
    { 
      id: 'C005', 
      farmerName: 'Michael Brown', 
      totalAnimals: 1, 
      activeAnimals: 1, 
      currentMonthCount: 1,
      animals: [
        {
          id: 'A008',
          name: 'Princess',
          type: 'Cow',
          treatments: [
            { date: '2025-01-13', treatment: 'Pregnancy Check', doctor: 'Dr. Adams', status: 'Completed' }
          ]
        }
      ]
    },
    { 
      id: 'C006', 
      farmerName: 'Emily Davis', 
      totalAnimals: 4, 
      activeAnimals: 3, 
      currentMonthCount: 1,
      animals: []
    },
    { 
      id: 'C007', 
      farmerName: 'Robert Miller', 
      totalAnimals: 6, 
      activeAnimals: 5, 
      currentMonthCount: 2,
      animals: []
    },
    { 
      id: 'C008', 
      farmerName: 'Lisa Anderson', 
      totalAnimals: 2, 
      activeAnimals: 1, 
      currentMonthCount: 0,
      animals: []
    },
    { 
      id: 'C009', 
      farmerName: 'James Taylor', 
      totalAnimals: 8, 
      activeAnimals: 7, 
      currentMonthCount: 4,
      animals: []
    },
    { 
      id: 'C010', 
      farmerName: 'Jennifer White', 
      totalAnimals: 3, 
      activeAnimals: 3, 
      currentMonthCount: 1,
      animals: []
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');
  const [filterType, setFilterType] = useState('all');
  const [selectedClient, setSelectedClient] = useState(null);

  // Filter and search logic
  const filteredAndSortedClients = useMemo(() => {
    let filtered = clients.filter(client => {
      const matchesSearch = client.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           client.farmerName.toLowerCase().includes(searchTerm.toLowerCase());
      
      switch (filterType) {
        case 'high-activity':
          return matchesSearch && client.activeAnimals >= 5;
        case 'recent-visits':
          return matchesSearch && client.currentMonthCount > 0;
        case 'inactive':
          return matchesSearch && client.currentMonthCount === 0;
        default:
          return matchesSearch;
      }
    });

    return filtered.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      
      if (sortDirection === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
  }, [clients, searchTerm, sortField, sortDirection, filterType]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return '↕️';
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  const totalClients = clients.length;
  const totalAnimals = clients.reduce((sum, client) => sum + client.totalAnimals, 0);
  const totalActiveAnimals = clients.reduce((sum, client) => sum + client.activeAnimals, 0);
  const totalMonthlyVisits = clients.reduce((sum, client) => sum + client.currentMonthCount, 0);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'ongoing':
        return 'bg-blue-100 text-blue-800';
      case 'scheduled':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleRowClick = (client) => {
    setSelectedClient(client);
  };

  const closeModal = () => {
    setSelectedClient(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Client</h1>
          <p className="text-gray-600">Manage and monitor your veterinary clients</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Clients</p>
                <p className="text-3xl font-bold text-gray-800">{totalClients}</p>
              </div>
              <Users className="w-12 h-12 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Animals</p>
                <p className="text-3xl font-bold text-gray-800">{totalAnimals}</p>
              </div>
              <PawPrint className="w-12 h-12 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Animals</p>
                <p className="text-3xl font-bold text-gray-800">{totalActiveAnimals}</p>
              </div>
              <Activity className="w-12 h-12 text-orange-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Visits</p>
                <p className="text-3xl font-bold text-gray-800">{totalMonthlyVisits}</p>
              </div>
              <Calendar className="w-12 h-12 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by Client ID or Farmer Name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="text-gray-400 w-5 h-5" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="all">All Clients</option>
                <option value="high-activity">High Activity (5+ Animals)</option>
                <option value="recent-visits">Recent Visits</option>
                <option value="inactive">No Recent Visits</option>
              </select>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('id')}
                  >
                    Client ID {getSortIcon('id')}
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('farmerName')}
                  >
                    Farmer Name {getSortIcon('farmerName')}
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('totalAnimals')}
                  >
                    Total Animals {getSortIcon('totalAnimals')}
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('activeAnimals')}
                  >
                    Active Animals {getSortIcon('activeAnimals')}
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('currentMonthCount')}
                  >
                    Current Month Visits {getSortIcon('currentMonthCount')}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAndSortedClients.map((client, index) => (
                  <tr 
                    key={client.id} 
                    className={`hover:bg-blue-50 transition-colors cursor-pointer ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}
                    onClick={() => handleRowClick(client)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{client.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{client.farmerName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <PawPrint className="w-4 h-4 text-blue-500 mr-2" />
                        <span className="text-gray-900">{client.totalAnimals}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Activity className="w-4 h-4 text-green-500 mr-2" />
                        <span className="text-gray-900">{client.activeAnimals}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 text-purple-500 mr-2" />
                        <span className="text-gray-900">{client.currentMonthCount}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        client.currentMonthCount > 0 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {client.currentMonthCount > 0 ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredAndSortedClients.length === 0 && (
            <div className="text-center py-12">
              <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No clients found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center text-gray-500">
          <p>Showing {filteredAndSortedClients.length} of {totalClients} clients</p>
        </div>

        {/* Treatment History Modal */}
        {selectedClient && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-green-500 to-green-300 text-white p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold">{selectedClient.farmerName}</h2>
                    <p className="text-blue-100">Client ID: {selectedClient.id}</p>
                    <div className="flex gap-4 mt-2 text-sm">
                      <span>Total Animals: {selectedClient.totalAnimals}</span>
                      <span>Active: {selectedClient.activeAnimals}</span>
                      <span>Monthly Visits: {selectedClient.currentMonthCount}</span>
                    </div>
                  </div>
                  <button
                    onClick={closeModal}
                    className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6" style={{maxHeight: 'calc(90vh - 200px)'}}>
                {selectedClient.animals && selectedClient.animals.length > 0 ? (
                  <div className="space-y-6">
                    {selectedClient.animals.map((animal) => (
                      <div key={animal.id} className="bg-gray-50 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <PawPrint className="w-6 h-6 text-blue-600" />
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">{animal.name}</h3>
                            <p className="text-gray-600">{animal.type} - ID: {animal.id}</p>
                          </div>
                        </div>

                        {animal.treatments && animal.treatments.length > 0 ? (
                          <div className="space-y-3">
                            <h4 className="font-medium text-gray-700 flex items-center gap-2">
                              <FileText className="w-4 h-4" />
                              Treatment History
                            </h4>
                            <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                              {animal.treatments.map((treatment, idx) => (
                                <div key={idx} className="bg-white rounded-lg p-4 border border-gray-200">
                                  <div className="flex justify-between items-start mb-2">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-1">
                                        <Stethoscope className="w-4 h-4 text-indigo-600" />
                                        <span className="font-medium text-gray-800">{treatment.treatment}</span>
                                      </div>
                                      <div className="flex items-center gap-4 text-sm text-gray-600">
                                        <div className="flex items-center gap-1">
                                          <Clock className="w-3 h-3" />
                                          {treatment.date}
                                        </div>
                                        <span>Dr: {treatment.doctor}</span>
                                      </div>
                                    </div>
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(treatment.status)}`}>
                                      {treatment.status}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <p className="text-gray-500 italic">No treatment history available</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <PawPrint className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Animal Data Available</h3>
                    <p className="text-gray-500">Treatment history will be displayed when animal data is available.</p>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="bg-gray-50 px-6 py-4 flex justify-end flex-shrink-0">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Client;