import React, { useState, useMemo } from 'react';
import { Clock, Pill, Check, ArrowLeft, Eye, Undo } from 'lucide-react';

const AnimalDoseDashboard = () => {
  // Sample data - in real app this would come from API
  const [animals] = useState([
    {
      id: 1,
      name: "Cow A1",
      drugs: [
        { id: 1, name: "Antibiotic", dose: "50ml", time: "morning", given: false, disease: "Infection" },
        { id: 2, name: "Vitamin B12", dose: "25ml", time: "evening", given: false, disease: "Nutritional Deficiency" }
      ]
    },
    {
      id: 2,
      name: "Cow A2",
      drugs: [
        { id: 3, name: "Pain Relief - Meloxicam", dose: "30ml", time: "morning", given: false, disease: "Joint Pain" },
        { id: 4, name: "Pain Relief - Aspirin", dose: "20ml", time: "afternoon", given: false, disease: "Joint Pain" },
        { id: 5, name: "Anti-inflammatory", dose: "25ml", time: "evening", given: false, disease: "Joint Pain" },
        { id: 6, name: "Iron Supplement", dose: "40ml", time: "afternoon", given: false, disease: "Anemia" }
      ]
    },
    {
      id: 3,
      name: "Bull B1",
      drugs: [
        { id: 7, name: "Antibiotic - Penicillin", dose: "75ml", time: "morning", given: true, disease: "Bacterial Infection" },
        { id: 8, name: "Antibiotic - Streptomycin", dose: "50ml", time: "afternoon", given: false, disease: "Bacterial Infection" },
        { id: 9, name: "Calcium", dose: "60ml", time: "afternoon", given: false, disease: "Calcium Deficiency" },
        { id: 10, name: "Multivitamin", dose: "35ml", time: "evening", given: false, disease: "General Health" }
      ]
    },
    {
      id: 4,
      name: "Cow A3",
      drugs: [
        { id: 11, name: "Deworming - Ivermectin", dose: "45ml", time: "morning", given: false, disease: "Parasitic Infection" },
        { id: 12, name: "Deworming - Albendazole", dose: "30ml", time: "afternoon", given: false, disease: "Parasitic Infection" },
        { id: 13, name: "Probiotic", dose: "20ml", time: "afternoon", given: false, disease: "Digestive Health" },
        { id: 14, name: "Pain Relief - Ibuprofen", dose: "35ml", time: "morning", given: false, disease: "Muscle Pain" },
        { id: 15, name: "Muscle Relaxant", dose: "25ml", time: "evening", given: false, disease: "Muscle Pain" }
      ]
    },
    {
      id: 5,
      name: "Calf C1",
      drugs: [
        { id: 16, name: "Growth Hormone", dose: "15ml", time: "evening", given: false, disease: "Growth Support" },
        { id: 17, name: "Pain Relief - Acetaminophen", dose: "10ml", time: "morning", given: false, disease: "General Pain" },
        { id: 18, name: "Anti-inflammatory - Cortisone", dose: "12ml", time: "afternoon", given: false, disease: "General Pain" }
      ]
    },
    {
      id: 6,
      name: "Cow A4",
      drugs: [
        { id: 19, name: "Pain Relief - Tramadol", dose: "40ml", time: "morning", given: false, disease: "Chronic Pain" },
        { id: 20, name: "Pain Relief - Morphine", dose: "15ml", time: "afternoon", given: false, disease: "Chronic Pain" },
        { id: 21, name: "Nerve Blocker", dose: "20ml", time: "evening", given: false, disease: "Chronic Pain" },
        { id: 22, name: "Physical Therapy Support", dose: "30ml", time: "morning", given: false, disease: "Chronic Pain" }
      ]
    }
  ]);

  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [givenDoses, setGivenDoses] = useState(new Set());

  // Calculate pending doses for each time slot
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

  // Get animals with pending doses for selected time slot
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

  // Handle dose completion
  const handleDoseGiven = (drugId) => {
    setGivenDoses(prev => new Set([...prev, drugId]));
  };

  // Handle undo dose
  const handleUndoDose = (drugId) => {
    setGivenDoses(prev => {
      const newSet = new Set(prev);
      newSet.delete(drugId);
      return newSet;
    });
  };

  // Time slot data
  const timeSlots = [
    {
      id: 'morning',
      name: 'Morning',
      icon: '🌅',
      bgColor: 'bg-orange-100',
      borderColor: 'border-orange-300',
      textColor: 'text-orange-800'
    },
    {
      id: 'afternoon',
      name: 'Afternoon',
      icon: '☀️',
      bgColor: 'bg-yellow-100',
      borderColor: 'border-yellow-300',
      textColor: 'text-yellow-800'
    },
    {
      id: 'evening',
      name: 'Evening',
      icon: '🌙',
      bgColor: 'bg-blue-100',
      borderColor: 'border-blue-300',
      textColor: 'text-blue-800'
    }
  ];

  // Animal Detail View
  if (selectedAnimal) {
    const animal = animals.find(a => a.id === selectedAnimal.id);
    const selectedSlot = timeSlots.find(slot => slot.id === selectedTimeSlot);
    const relevantDrugs = animal.drugs.filter(drug => drug.time === selectedTimeSlot);

    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSelectedAnimal(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold text-lg">
                    {animal.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">
                    {animal.name} - Treatment Details
                  </h1>
                  <p className="text-gray-600">
                    {selectedSlot.name} doses ({relevantDrugs.length} treatments)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Treatment Details */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Treatment Schedule for {selectedSlot.name}
            </h2>
            
            <div className="space-y-4">
              {relevantDrugs.map(drug => {
                const isGiven = drug.given || givenDoses.has(drug.id);
                
                return (
                  <div
                    key={drug.id}
                    className={`p-6 border-2 rounded-lg transition-all duration-300 ${
                      isGiven 
                        ? 'border-green-300 bg-green-50' 
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-full ${
                          isGiven ? 'bg-green-200' : 'bg-blue-100'
                        }`}>
                          <Pill className={`w-6 h-6 ${
                            isGiven ? 'text-green-600' : 'text-blue-500'
                          }`} />
                        </div>
                        
                        <div>
                          <h3 className={`text-lg font-semibold ${
                            isGiven ? 'text-green-800' : 'text-gray-800'
                          }`}>
                            {drug.name}
                          </h3>
                          <div className="space-y-1">
                            <p className={`text-sm ${
                              isGiven ? 'text-green-600' : 'text-gray-600'
                            }`}>
                              <span className="font-medium">Disease:</span> {drug.disease}
                            </p>
                            <p className={`text-sm ${
                              isGiven ? 'text-green-600' : 'text-gray-600'
                            }`}>
                              <span className="font-medium">Dosage:</span> {drug.dose}
                            </p>
                            <p className={`text-sm ${
                              isGiven ? 'text-green-600' : 'text-gray-600'
                            }`}>
                              <span className="font-medium">Time:</span> {drug.time}
                            </p>
                            <p className={`text-sm font-medium ${
                              isGiven ? 'text-green-600' : 'text-orange-600'
                            }`}>
                              Status: {isGiven ? '✅ Given' : '⏳ Pending'}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        {isGiven ? (
                          <button
                            onClick={() => handleUndoDose(drug.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 border border-orange-300 rounded-lg hover:bg-orange-200 transition-colors"
                          >
                            <Undo className="w-4 h-4" />
                            <span className="font-medium">Undo</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => handleDoseGiven(drug.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 border border-green-300 rounded-lg hover:bg-green-200 transition-colors"
                          >
                            <Check className="w-4 h-4" />
                            <span className="font-medium">Mark as Given</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary for this animal - Farmer Friendly */}
            <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">📊</span>
                <h3 className="font-bold text-gray-800 text-lg">{animal.name}'s Medicine Progress</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Progress Circle for this animal */}
                <div className="flex items-center justify-center">
                  <div className="relative">
                    <svg width="120" height="120" className="transform -rotate-90">
                      <circle
                        cx="60"
                        cy="60"
                        r="45"
                        stroke="#e5e7eb"
                        strokeWidth="10"
                        fill="none"
                      />
                      <circle
                        cx="60"
                        cy="60"
                        r="45"
                        stroke="#10b981"
                        strokeWidth="10"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 45}`}
                        strokeDashoffset={`${2 * Math.PI * 45 * (1 - (relevantDrugs.filter(drug => drug.given || givenDoses.has(drug.id)).length / relevantDrugs.length))}`}
                        className="transition-all duration-700 ease-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold text-green-600">
                        {Math.round((relevantDrugs.filter(drug => drug.given || givenDoses.has(drug.id)).length / relevantDrugs.length) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Stats */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">💊</span>
                      <span className="text-gray-700 font-medium">Total medicines:</span>
                    </div>
                    <span className="text-xl font-bold text-blue-600">{relevantDrugs.length}</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">✅</span>
                      <span className="text-gray-700 font-medium">Given:</span>
                    </div>
                    <span className="text-xl font-bold text-green-600">
                      {relevantDrugs.filter(drug => drug.given || givenDoses.has(drug.id)).length}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">⏳</span>
                      <span className="text-gray-700 font-medium">Still needed:</span>
                    </div>
                    <span className="text-xl font-bold text-orange-600">
                      {relevantDrugs.filter(drug => !drug.given && !givenDoses.has(drug.id)).length}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Encouraging Message */}
              <div className="mt-4 text-center">
                {(() => {
                  const completed = relevantDrugs.filter(drug => drug.given || givenDoses.has(drug.id)).length;
                  const total = relevantDrugs.length;
                  
                  if (completed === total) {
                    return (
                      <div className="bg-green-100 border border-green-300 rounded-lg p-3">
                        <span className="text-green-800 font-medium">
                          🎉 {animal.name} is all set for {selectedSlot.name.toLowerCase()}!
                        </span>
                      </div>
                    );
                  } else {
                    return (
                      <div className="bg-blue-100 border border-blue-300 rounded-lg p-3">
                        <span className="text-blue-800 font-medium">
                          💪 Keep going! {animal.name} needs {total - completed} more medicine{total - completed > 1 ? 's' : ''}.
                        </span>
                      </div>
                    );
                  }
                })()}
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
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSelectedTimeSlot(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{selectedSlot.icon}</span>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">
                    {selectedSlot.name} Doses
                  </h1>
                  <p className="text-gray-600">
                    {animalsForTimeSlot.length} animals with pending doses
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Animal List */}
          <div className="space-y-4">
            {animalsForTimeSlot.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <Check className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  All Done! 🎉
                </h3>
                <p className="text-gray-600">
                  No pending {selectedSlot.name.toLowerCase()} doses
                </p>
              </div>
            ) : (
              animalsForTimeSlot.map(animal => (
                <div key={animal.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-semibold">
                          {animal.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {animal.name}
                        </h3>
                        <p className="text-gray-600">
                          {animal.drugs.length} dose{animal.drugs.length > 1 ? 's' : ''} pending
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedAnimal(animal)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 border border-blue-300 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      <span className="font-medium">View Treatments</span>
                    </button>
                  </div>

                  {/* Quick preview of drugs */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex flex-wrap gap-2">
                      {animal.drugs.map(drug => (
                        <div
                          key={drug.id}
                          className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm"
                        >
                          <Pill className="w-3 h-3 text-blue-500" />
                          <span className="text-gray-700">{drug.name}</span>
                          <span className="text-gray-500">({drug.dose})</span>
                          <span className="text-xs text-blue-600 ml-1">• {drug.disease}</span>
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
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Animal Medication Dashboard
          </h1>
          <p className="text-gray-600">
            Track and manage daily medication doses for your animals
          </p>
        </div>

        {/* Time Slot Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {timeSlots.map(slot => (
            <div
              key={slot.id}
              onClick={() => setSelectedTimeSlot(slot.id)}
              className={`${slot.bgColor} ${slot.borderColor} border-2 rounded-xl p-6 cursor-pointer transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl`}
            >
              <div className="text-center">
                <div className="text-4xl mb-4">{slot.icon}</div>
                
                <h2 className={`text-2xl font-bold ${slot.textColor} mb-2`}>
                  {slot.name}
                </h2>
                
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Clock className={`w-5 h-5 ${slot.textColor}`} />
                  <span className={`${slot.textColor} font-medium`}>
                    {slot.id === 'morning' && '6:00 - 10:00 AM'}
                    {slot.id === 'afternoon' && '12:00 - 4:00 PM'}
                    {slot.id === 'evening' && '6:00 - 9:00 PM'}
                  </span>
                </div>

                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                  pendingCounts[slot.id] > 0 
                    ? 'bg-red-100 border border-red-300' 
                    : 'bg-green-100 border border-green-300'
                }`}>
                  <span className={`text-2xl font-bold ${
                    pendingCounts[slot.id] > 0 ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {pendingCounts[slot.id]}
                  </span>
                  <span className={`font-medium ${
                    pendingCounts[slot.id] > 0 ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {pendingCounts[slot.id] === 1 ? 'dose' : 'doses'} pending
                  </span>
                </div>

                <div className={`mt-4 text-sm ${slot.textColor} opacity-75`}>
                  Click to view animals
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats with Graph - Farmer Friendly */}
        <div className="mt-8 space-y-6">
          {/* Progress Circle */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              🏠 Today's Medicine Progress
            </h3>
            
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Circular Progress Chart */}
              <div className="relative flex items-center justify-center">
                <svg width="200" height="200" className="transform -rotate-90">
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    stroke="#e5e7eb"
                    strokeWidth="16"
                    fill="none"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    stroke="#10b981"
                    strokeWidth="16"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 80}`}
                    strokeDashoffset={`${2 * Math.PI * 80 * (1 - (givenDoses.size / (givenDoses.size + pendingCounts.morning + pendingCounts.afternoon + pendingCounts.evening)))}`}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-green-600">
                    {Math.round((givenDoses.size / (givenDoses.size + pendingCounts.morning + pendingCounts.afternoon + pendingCounts.evening)) * 100) || 0}%
                  </span>
                  <span className="text-gray-600 font-medium">Complete</span>
                </div>
              </div>
              
              {/* Farmer-friendly Stats */}
              <div className="flex-1 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Total Animals */}
                  <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">🐄</div>
                      <div>
                        <div className="text-3xl font-bold text-blue-600">
                          {animals.length}
                        </div>
                        <div className="text-blue-700 font-medium">Animals to Care For</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Medicines Given */}
                  <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-500">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">✅</div>
                      <div>
                        <div className="text-3xl font-bold text-green-600">
                          {givenDoses.size}
                        </div>
                        <div className="text-green-700 font-medium">Medicines Given</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Medicines Pending */}
                  <div className="bg-orange-50 rounded-xl p-6 border-l-4 border-orange-500">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">⏳</div>
                      <div>
                        <div className="text-3xl font-bold text-orange-600">
                          {pendingCounts.morning + pendingCounts.afternoon + pendingCounts.evening}
                        </div>
                        <div className="text-orange-700 font-medium">Still Need Medicine</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Today's Goal */}
                  <div className="bg-purple-50 rounded-xl p-6 border-l-4 border-purple-500">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">🎯</div>
                      <div>
                        <div className="text-3xl font-bold text-purple-600">
                          {givenDoses.size + pendingCounts.morning + pendingCounts.afternoon + pendingCounts.evening}
                        </div>
                        <div className="text-purple-700 font-medium">Total for Today</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Progress Message */}
            <div className="mt-6 text-center">
              {(() => {
                const percentage = Math.round((givenDoses.size / (givenDoses.size + pendingCounts.morning + pendingCounts.afternoon + pendingCounts.evening)) * 100) || 0;
                if (percentage === 100) {
                  return (
                    <div className="bg-green-100 border border-green-300 rounded-lg p-4">
                      <div className="text-2xl mb-2">🎉 Excellent Work!</div>
                      <div className="text-green-800 font-medium text-lg">
                        All animals have received their medicines today. Your farm is healthy! 
                      </div>
                    </div>
                  );
                } else if (percentage >= 75) {
                  return (
                    <div className="bg-blue-100 border border-blue-300 rounded-lg p-4">
                      <div className="text-2xl mb-2">👏 Great Progress!</div>
                      <div className="text-blue-800 font-medium text-lg">
                        You're almost done! Just {pendingCounts.morning + pendingCounts.afternoon + pendingCounts.evening} more medicines to give.
                      </div>
                    </div>
                  );
                } else if (percentage >= 50) {
                  return (
                    <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4">
                      <div className="text-2xl mb-2">💪 Keep Going!</div>
                      <div className="text-yellow-800 font-medium text-lg">
                        Halfway there! Your animals are counting on you.
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div className="bg-orange-100 border border-orange-300 rounded-lg p-4">
                      <div className="text-2xl mb-2">🌅 Let's Get Started!</div>
                      <div className="text-orange-800 font-medium text-lg">
                        Time to give your animals their medicine. Start with the morning doses!
                      </div>
                    </div>
                  );
                }
              })()}
            </div>
          </div>
          
          {/* Time-based Progress Bars */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
              📅 Medicine Schedule Progress
            </h3>
            
            <div className="space-y-4">
              {timeSlots.map(slot => {
                const totalForSlot = animals.reduce((count, animal) => {
                  return count + animal.drugs.filter(drug => drug.time === slot.id).length;
                }, 0);
                const completedForSlot = animals.reduce((count, animal) => {
                  return count + animal.drugs.filter(drug => 
                    drug.time === slot.id && (drug.given || givenDoses.has(drug.id))
                  ).length;
                }, 0);
                const progressPercentage = totalForSlot > 0 ? (completedForSlot / totalForSlot) * 100 : 0;
                
                return (
                  <div key={slot.id} className={`${slot.bgColor} rounded-lg p-4`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{slot.icon}</span>
                        <div>
                          <h4 className={`font-bold ${slot.textColor} text-lg`}>
                            {slot.name} Time
                          </h4>
                          <p className={`${slot.textColor} text-sm`}>
                            {completedForSlot} of {totalForSlot} medicines given
                          </p>
                        </div>
                      </div>
                      <div className={`text-xl font-bold ${slot.textColor}`}>
                        {Math.round(progressPercentage)}%
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-white bg-opacity-50 rounded-full h-3">
                      <div 
                        className="h-3 rounded-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-700 ease-out"
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalDoseDashboard;