import React, { useState, useMemo } from 'react';
import { Clock, Pill, Check, ArrowLeft, Eye, Undo, Award, PartyPopper } from 'lucide-react';

const AnimalDoseDashboard = () => {
  // Sample data - in real app this would come from API
  const [animals] = useState([
    {
      id: 1,
      name: "Cow A1",
      lastMedicineDate: "2025-09-17",
      waitingPeriod: 7,
      productType: "Milk",
      drugs: [
        { id: 1, name: "Antibiotic", dose: "50ml", time: "morning", given: false, disease: "Infection", waitingDays: 7 },
        { id: 2, name: "Vitamin B12", dose: "25ml", time: "evening", given: false, disease: "Nutritional Deficiency", waitingDays: 0 }
      ]
    },
    {
      id: 2,
      name: "Cow A2",
      lastMedicineDate: "2025-09-12",
      waitingPeriod: 5,
      productType: "Milk",
      drugs: [
        { id: 3, name: "Pain Relief - Meloxicam", dose: "30ml", time: "morning", given: false, disease: "Joint Pain", waitingDays: 5 },
        { id: 4, name: "Pain Relief - Aspirin", dose: "20ml", time: "afternoon", given: false, disease: "Joint Pain", waitingDays: 3 },
        { id: 5, name: "Anti-inflammatory", dose: "25ml", time: "evening", given: false, disease: "Joint Pain", waitingDays: 4 },
        { id: 6, name: "Iron Supplement", dose: "40ml", time: "afternoon", given: false, disease: "Anemia", waitingDays: 0 }
      ]
    },
    {
      id: 3,
      name: "Cow A3",
      lastMedicineDate: "2025-09-10",
      waitingPeriod: 10,
      productType: "Milk",
      drugs: [
        { id: 11, name: "Deworming - Ivermectin", dose: "45ml", time: "morning", given: false, disease: "Parasitic Infection", waitingDays: 10 },
        { id: 12, name: "Deworming - Albendazole", dose: "30ml", time: "afternoon", given: false, disease: "Parasitic Infection", waitingDays: 7 },
        { id: 13, name: "Probiotic", dose: "20ml", time: "afternoon", given: false, disease: "Digestive Health", waitingDays: 0 },
        { id: 14, name: "Pain Relief - Ibuprofen", dose: "35ml", time: "morning", given: false, disease: "Muscle Pain", waitingDays: 3 },
        { id: 15, name: "Muscle Relaxant", dose: "25ml", time: "evening", given: false, disease: "Muscle Pain", waitingDays: 5 }
      ]
    },
    {
      id: 5,
      name: "Calf C1",
      lastMedicineDate: "2025-09-15",
      waitingPeriod: 14,
      productType: "Milk", // Changed to Milk to remove meat icon implication
      drugs: [
        { id: 16, name: "Growth Hormone", dose: "15ml", time: "evening", given: false, disease: "Growth Support", waitingDays: 14 },
        { id: 17, name: "Pain Relief - Acetaminophen", dose: "10ml", time: "morning", given: false, disease: "General Pain", waitingDays: 2 },
        { id: 18, name: "Anti-inflammatory - Cortisone", dose: "12ml", time: "afternoon", given: false, disease: "General Pain", waitingDays: 7 }
      ]
    },
    {
      id: 6,
      name: "Cow A4",
      lastMedicineDate: "2025-09-08",
      waitingPeriod: 7,
      productType: "Milk",
      drugs: [
        { id: 19, name: "Pain Relief - Tramadol", dose: "40ml", time: "morning", given: false, disease: "Chronic Pain", waitingDays: 7 },
        { id: 20, name: "Pain Relief - Morphine", dose: "15ml", time: "afternoon", given: false, disease: "Chronic Pain", waitingDays: 10 },
        { id: 21, name: "Nerve Blocker", dose: "20ml", time: "evening", given: false, disease: "Chronic Pain", waitingDays: 5 },
        { id: 22, name: "Physical Therapy Support", dose: "30ml", time: "morning", given: false, disease: "Chronic Pain", waitingDays: 0 }
      ]
    }
  ]);

  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [givenDoses, setGivenDoses] = useState(new Set());

  const calculateWaitingPeriod = (animal) => {
    const today = new Date();
    const lastMedicineDate = new Date(animal.lastMedicineDate);
    const daysSinceLastMedicine = Math.floor((today - lastMedicineDate) / (1000 * 60 * 60 * 24));
    
    const maxWaitingDays = Math.max(...animal.drugs.map(drug => drug.waitingDays || 0));
    const effectiveWaitingPeriod = Math.max(animal.waitingPeriod, maxWaitingDays);
    
    const daysRemaining = effectiveWaitingPeriod - daysSinceLastMedicine;
    return Math.max(0, daysRemaining);
  };

  const getAnimalsReadyForSale = () => {
    return animals.filter(animal => calculateWaitingPeriod(animal) === 0);
  };

  const pendingCounts = useMemo(() => {
    const counts = { morning: 0, afternoon: 0, evening: 0 };
    
    animals.forEach(animal => {
      animal.drugs.forEach(drug => {
        if (!drug.given && !givenDoses.has(drug.id)) {
          counts[drug.time]++;
        }
      });
    });
    
    return counts;
  }, [animals, givenDoses]);

  const getAnimalsForTimeSlot = (timeSlot) => {
    return animals.filter(animal => 
      animal.drugs.some(drug => 
        drug.time === timeSlot && !drug.given && !givenDoses.has(drug.id)
      )
    ).map(animal => ({
      ...animal,
      drugs: animal.drugs.filter(drug => 
        drug.time === timeSlot && !drug.given && !givenDoses.has(drug.id)
      )
    }));
  };

  const handleDoseGiven = (drugId) => {
    setGivenDoses(prev => new Set([...prev, drugId]));
  };

  const handleUndoDose = (drugId) => {
    setGivenDoses(prev => {
      const newSet = new Set(prev);
      newSet.delete(drugId);
      return newSet;
    });
  };

  const timeSlots = [
    {
      id: 'morning',
      name: 'Morning',
      icon: '🌅',
      gradient: 'from-orange-400 to-yellow-300',
      shadow: 'shadow-orange-200'
    },
    {
      id: 'afternoon',
      name: 'Afternoon',
      icon: '☀️',
      gradient: 'from-yellow-400 to-amber-300',
      shadow: 'shadow-yellow-200'
    },
    {
      id: 'evening',
      name: 'Evening',
      icon: '🌙',
      gradient: 'from-blue-500 to-indigo-400',
      shadow: 'shadow-blue-200'
    }
  ];

  // Animal Detail View
  if (selectedAnimal) {
    const animal = animals.find(a => a.id === selectedAnimal.id);
    const selectedSlot = timeSlots.find(slot => slot.id === selectedTimeSlot);
    const relevantDrugs = animal.drugs.filter(drug => drug.time === selectedTimeSlot);
    const totalDrugsForSlot = relevantDrugs.length;
    const completedDrugsForSlot = relevantDrugs.filter(drug => drug.given || givenDoses.has(drug.id)).length;
    const progressPercentage = totalDrugsForSlot > 0 ? (completedDrugsForSlot / totalDrugsForSlot) * 100 : 0;

    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 font-sans">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSelectedAnimal(null)}
                className="p-3 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </button>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold text-2xl">
                    {animal.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">
                    {animal.name}
                  </h1>
                  <p className="text-gray-600">
                    {selectedSlot.name} Treatment Details
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Treatment Details */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Treatment Schedule
            </h2>
            
            <div className="space-y-4">
              {relevantDrugs.map(drug => {
                const isGiven = drug.given || givenDoses.has(drug.id);
                
                return (
                  <div
                    key={drug.id}
                    className={`p-5 border-2 rounded-xl transition-all duration-300 ${
                      isGiven 
                        ? 'border-green-300 bg-green-50' 
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`p-3 rounded-full ${
                          isGiven ? 'bg-green-200' : 'bg-blue-100'
                        }`}>
                          <Pill className={`w-6 h-6 ${
                            isGiven ? 'text-green-600' : 'text-blue-500'
                          }`} />
                        </div>
                        
                        <div>
                          <h3 className={`text-xl font-bold ${
                            isGiven ? 'text-green-800' : 'text-gray-800'
                          }`}>
                            {drug.name}
                          </h3>
                          <div className="text-sm space-y-1 mt-1">
                            <p className="text-gray-600"><span className="font-medium">Disease:</span> {drug.disease}</p>
                            <p className="text-gray-600"><span className="font-medium">Dosage:</span> {drug.dose}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        {isGiven ? (
                          <button
                            onClick={() => handleUndoDose(drug.id)}
                            className="flex items-center gap-2 px-5 py-2 text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors shadow-sm"
                          >
                            <Undo className="w-4 h-4" />
                            <span className="font-medium hidden sm:inline">Undo</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => handleDoseGiven(drug.id)}
                            className="flex items-center gap-2 px-5 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors shadow-sm"
                          >
                            <Check className="w-4 h-4" />
                            <span className="font-medium hidden sm:inline">Mark as Given</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary for this animal */}
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl border border-blue-200 shadow-inner">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">📊</span>
                <h3 className="font-bold text-gray-800 text-lg">Daily Progress for {animal.name}</h3>
              </div>
              
              <div className="flex flex-col items-center gap-6">
                <div className="relative">
                  <svg width="150" height="150" className="transform -rotate-90">
                    <circle
                      cx="75"
                      cy="75"
                      r="65"
                      stroke="#e5e7eb"
                      strokeWidth="12"
                      fill="none"
                    />
                    <circle
                      cx="75"
                      cy="75"
                      r="65"
                      stroke="#10b981"
                      strokeWidth="12"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 65}`}
                      strokeDashoffset={`${2 * Math.PI * 65 * (1 - (progressPercentage / 100))}`}
                      className="transition-all duration-700 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-extrabold text-green-600">
                      {Math.round(progressPercentage)}%
                    </span>
                    <span className="text-sm text-gray-600">Complete</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="p-4 bg-white rounded-lg shadow-sm text-center">
                    <div className="text-xl font-bold text-blue-600">{totalDrugsForSlot}</div>
                    <div className="text-gray-700 font-medium text-sm">Total Doses</div>
                  </div>
                  <div className="p-4 bg-white rounded-lg shadow-sm text-center">
                    <div className="text-xl font-bold text-green-600">{completedDrugsForSlot}</div>
                    <div className="text-gray-700 font-medium text-sm">Doses Given</div>
                  </div>
                  <div className="col-span-2 p-4 bg-white rounded-lg shadow-sm text-center">
                    <div className="text-xl font-bold text-orange-600">{totalDrugsForSlot - completedDrugsForSlot}</div>
                    <div className="text-gray-700 font-medium text-sm">Doses Still Pending</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Time Slot Animal List View
  if (selectedTimeSlot) {
    const animalsForTimeSlot = getAnimalsForTimeSlot(selectedTimeSlot);
    const selectedSlot = timeSlots.find(slot => slot.id === selectedTimeSlot);

    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 font-sans">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSelectedTimeSlot(null)}
                className="p-3 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </button>
              <div className="flex items-center gap-4">
                <span className="text-4xl">{selectedSlot.icon}</span>
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">
                    {selectedSlot.name} Doses
                  </h1>
                  <p className="text-gray-600">
                    {animalsForTimeSlot.length} animal{animalsForTimeSlot.length !== 1 ? 's' : ''} with pending doses
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Animal List */}
          <div className="space-y-4">
            {animalsForTimeSlot.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center border-2 border-green-300 bg-green-50">
                <Check className="w-16 h-16 text-green-500 mx-auto mb-4 animate-bounce" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  All Done! 🎉
                </h3>
                <p className="text-gray-600">
                  No pending {selectedSlot.name.toLowerCase()} doses to give.
                </p>
              </div>
            ) : (
              animalsForTimeSlot.map(animal => (
                <div key={animal.id} className="bg-white rounded-xl shadow-md p-6 border-2 border-gray-200">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-2xl">
                          {animal.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">
                          {animal.name}
                        </h3>
                        <p className="text-gray-600">
                          {animal.drugs.length} dose{animal.drugs.length !== 1 ? 's' : ''} pending
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedAnimal(animal)}
                      className="flex items-center gap-2 px-5 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors shadow-sm"
                    >
                      <Eye className="w-4 h-4" />
                      <span className="font-medium">View Treatments</span>
                    </button>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex flex-wrap gap-2">
                      {animal.drugs.map(drug => (
                        <div
                          key={drug.id}
                          className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm"
                        >
                          <Pill className="w-3 h-3 text-blue-500" />
                          <span className="text-gray-700 font-medium">{drug.name}</span>
                          <span className="text-gray-500">({drug.dose})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }

  // Main Dashboard View
  const totalDoses = animals.reduce((total, animal) => total + animal.drugs.length, 0);
  const totalGivenDoses = givenDoses.size;
  const totalPendingDoses = totalDoses - totalGivenDoses;
  const overallProgress = totalDoses > 0 ? (totalGivenDoses / totalDoses) * 100 : 0;
  
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Main Title and Ready for Sale Notification */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight text-center sm:text-left mb-4 sm:mb-0">
            Animal Medication Dashboard
          </h1>
          {(() => {
            const readyAnimals = getAnimalsReadyForSale();
            if (readyAnimals.length > 0) {
              return (
                <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full border border-green-300 font-semibold animate-pulse">
                  <PartyPopper className="w-5 h-5" />
                  <span className="whitespace-nowrap">{readyAnimals.length} Animal{readyAnimals.length > 1 ? 's' : ''} Ready for Sale!</span>
                </div>
              );
            }
            return null;
          })()}
        </div>

        {/* Time Slot Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {timeSlots.map(slot => (
            <div
              key={slot.id}
              onClick={() => setSelectedTimeSlot(slot.id)}
              className={`relative flex flex-col justify-between h-48 rounded-3xl p-6 cursor-pointer transform transition-all duration-300
                          bg-gradient-to-br ${slot.gradient} 
                          shadow-lg ${slot.shadow} hover:shadow-xl hover:-translate-y-1`}
            >
              <div className="flex justify-between items-start">
                <div className="text-6xl leading-none">{slot.icon}</div>
                <div className="text-center">
                  <span className="block text-5xl font-extrabold text-white text-opacity-90 leading-none">
                    {pendingCounts[slot.id]}
                  </span>
                  <span className="block text-sm font-semibold text-white text-opacity-70 uppercase tracking-wider">
                    pending
                  </span>
                </div>
              </div>
              
              <div className="mt-4">
                <h2 className="text-3xl font-bold text-white mb-1">
                  {slot.name}
                </h2>
                <p className="text-sm text-white text-opacity-80">
                  Click to view schedule
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Overall Progress and Stats */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            🏠 Today's Progress at a Glance
          </h2>
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="relative flex-shrink-0">
              <svg width="200" height="200" className="transform -rotate-90">
                <circle
                  cx="100" cy="100" r="80"
                  stroke="#e5e7eb" strokeWidth="16" fill="none"
                />
                <circle
                  cx="100" cy="100" r="80"
                  stroke="#10b981" strokeWidth="16" fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 80}`}
                  strokeDashoffset={`${2 * Math.PI * 80 * (1 - (overallProgress / 100))}`}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-extrabold text-green-600">
                  {Math.round(overallProgress) || 0}%
                </span>
                <span className="text-lg font-medium text-gray-600">Complete</span>
              </div>
            </div>
            
            <div className="flex-1 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 rounded-xl p-4 border-l-4 border-blue-500">
                  <div className="text-2xl font-bold text-blue-600">{animals.length}</div>
                  <div className="text-blue-700 font-medium text-sm">Animals</div>
                </div>
                <div className="bg-green-50 rounded-xl p-4 border-l-4 border-green-500">
                  <div className="text-2xl font-bold text-green-600">{totalGivenDoses}</div>
                  <div className="text-green-700 font-medium text-sm">Doses Given</div>
                </div>
                <div className="bg-orange-50 rounded-xl p-4 border-l-4 border-orange-500">
                  <div className="text-2xl font-bold text-orange-600">{totalPendingDoses}</div>
                  <div className="text-orange-700 font-medium text-sm">Doses Pending</div>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 border-l-4 border-purple-500">
                  <div className="text-2xl font-bold text-purple-600">{totalDoses}</div>
                  <div className="text-purple-700 font-medium text-sm">Total Today</div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 text-center">
            {(() => {
              const completed = totalGivenDoses;
              const total = totalDoses;
              if (completed === total) {
                return <p className="text-green-800 text-lg font-medium bg-green-100 p-4 rounded-lg">🎉 All medicines have been given. Job well done!</p>;
              } else if (completed > 0 && completed < total) {
                return <p className="text-blue-800 text-lg font-medium bg-blue-100 p-4 rounded-lg">💪 You're on track! Keep going to complete all doses for the day.</p>;
              }
              return <p className="text-gray-800 text-lg font-medium bg-gray-100 p-4 rounded-lg">🗓️ Time to start the day's medication schedule!</p>;
            })()}
          </div>
        </div>

        {/* Waiting Period Section */}
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            ⏰ Product Waiting Periods
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {animals.map(animal => {
              const daysRemaining = calculateWaitingPeriod(animal);
              const isReady = daysRemaining === 0;
              const maxWaiting = Math.max(animal.waitingPeriod, ...animal.drugs.map(drug => drug.waitingDays || 0));
              const progressPercentage = (1 - (daysRemaining / maxWaiting)) * 100;
              
              return (
                <div
                  key={animal.id}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                    isReady
                      ? 'border-green-400 bg-green-50 shadow-md'
                      : daysRemaining <= 2
                        ? 'border-yellow-400 bg-yellow-50'
                        : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-4xl">🥛</div> {/* Always milk icon */}
                      <div>
                        <h4 className="text-xl font-bold text-gray-800">{animal.name}</h4>
                        <p className="text-sm text-gray-600">
                          Last treated: {new Date(animal.lastMedicineDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      {isReady ? (
                        <div className="flex items-center gap-2 text-green-600 font-bold">
                          <Award className="w-5 h-5" />
                          Ready
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <span className={`text-3xl font-bold ${
                            daysRemaining <= 2 ? 'text-yellow-600' : 'text-gray-600'
                          }`}>{daysRemaining}</span>
                          <span className={`text-sm ${
                            daysRemaining <= 2 ? 'text-yellow-700' : 'text-gray-600'
                          }`}>day{daysRemaining !== 1 ? 's' : ''} left</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        isReady ? 'bg-green-500' : (daysRemaining <= 2 ? 'bg-yellow-500' : 'bg-blue-500')
                      }`}
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Treatment start</span>
                    <span>Ready date</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalDoseDashboard;