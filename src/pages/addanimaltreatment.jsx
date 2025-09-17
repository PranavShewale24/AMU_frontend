import React, { useState } from 'react';
import axios from "axios";
import {
  ArrowLeft,
  AlertTriangle,
  CheckCircle,
  Save,
  Stethoscope,
  Pill,
  Calendar,
  XCircle,
  Plus
} from 'lucide-react';

const bannedDrugs = [
  'Chloramphenicol',
  'Nitrofurans',
  'Nitroimidazoles',
  'Phenylbutazone',
  'Stilbenes'
];

const AddTreatment = ({ setCurrentPage }) => {
  const [treatmentData, setTreatmentData] = useState({
    animalType: 'cow',
    animalId: '',
    animalName: '',
    farmerPhone: '',
    drugs: [
      { name: '', morning: '', afternoon: '', evening: '', waitingPeriod: '' }
    ],
    disease: '',
    symptoms: '',
    startDate: '',
    endDate: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [drugWarnings, setDrugWarnings] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (field, value) => {
    setTreatmentData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleDrugChange = (index, field, value) => {
    const newDrugs = [...treatmentData.drugs];
    newDrugs[index][field] = value;
    setTreatmentData(prev => ({ ...prev, drugs: newDrugs }));

    if (field === 'name') {
      const isBanned = bannedDrugs.some(b =>
        value.toLowerCase().includes(b.toLowerCase())
      );
      setDrugWarnings(prev => ({ ...prev, [index]: isBanned }));
    }
  };

  const addDrug = () => {
    setTreatmentData(prev => ({
      ...prev,
      drugs: [...prev.drugs, { name: '', morning: '', afternoon: '', evening: '', waitingPeriod: '' }]
    }));
  };

  const removeDrug = (index) => {
    setTreatmentData(prev => ({
      ...prev,
      drugs: prev.drugs.filter((_, i) => i !== index)
    }));
    setDrugWarnings(prev => {
      const newWarnings = { ...prev };
      delete newWarnings[index];
      return newWarnings;
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!treatmentData.animalId) newErrors.animalId = 'Animal ID is required';
    if (!treatmentData.animalName) newErrors.animalName = 'Animal name is required';
    if (!treatmentData.farmerPhone) newErrors.farmerPhone = 'Farmer phone is required';
    if (!/^\d{10}$/.test(treatmentData.farmerPhone)) newErrors.farmerPhone = 'Enter valid 10-digit phone number';
    if (!treatmentData.disease) newErrors.disease = 'Disease is required';
    if (!treatmentData.startDate) newErrors.startDate = 'Start date is required';
    if (!treatmentData.endDate) newErrors.endDate = 'End date is required';
    if (treatmentData.drugs.length === 0) newErrors.drugs = 'At least one drug is required';

    treatmentData.drugs.forEach((drug, i) => {
      if (!drug.name) newErrors[`drugName${i}`] = 'Drug name required';
      if (!drug.waitingPeriod) newErrors[`drugWait${i}`] = 'Waiting period required';
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 // This is a corrected version of the handleSubmit function in your React component.
const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    const drugsToSubmit = treatmentData.drugs.filter(d => d.name);

    // 💡 Create the payload object to match the Postman input
    const payload = {
        "animalId": treatmentData.animalId,
        "species": treatmentData.animalType, // Mapped from state
        "owner": "68c1518cbcb26c8f58456285", // Replace with a dynamic user ID
        
        "disease": {
            "name": treatmentData.disease,
            "symptoms": treatmentData.symptoms.split(',').map(s => s.trim()) // Split string into array
        },
        "treatments": {
            "startDate": treatmentData.startDate,
            "endDate": treatmentData.endDate,
            "status": "active", // This can be a static value or a form input
            "reason": "Treatment initiated", // This can be a static value or a form input
            "notes": treatmentData.notes,
            "effectiveness": "successful", // This can be a static value or a form input
            "medicines": drugsToSubmit.map(drug => ({
                "name": drug.name,
                "category": "Antibiotic",//This might need to be a form input
                "dosageForms": "", // This might need to be a form input
                "withdrawalPeriod": drug.waitingPeriod,
                "morningDosage": drug.morning,
                "afternoonDosage": drug.afternoon,
                "nightDosage": drug.evening,
                "duration": "N/A", // This might need to be a form input
                "waitingPeriod": drug.waitingPeriod,
                "doseLogs": [] // This will be handled on the backend
            }))
        }
    };

    try {
        const response = await axios.post(
            "http://localhost:8000/user/add-treatment/68c03c6d1c588d9e28b428f4",
            payload, // Send the corrected payload
            { withCredentials: true }
        );

        console.log("Treatment saved successfully:", response.data);
        setShowSuccess(true);
        setTimeout(() => {
            setShowSuccess(false);
            setCurrentPage('animals');
        }, 2000);
    } catch (err) {
        console.error("Error saving treatment:", err.response ? err.response.data : err.message);
        alert("Failed to save treatment. Please check the console for details.");
    } finally {
        setIsSubmitting(false);
    }
};
  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-8 md:p-10">
      {/* Success Alert */}
      {showSuccess && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 transform scale-100 opacity-100">
          <div className="flex items-center p-4 rounded-lg text-white bg-green-500 shadow-lg">
            <CheckCircle className="w-5 h-5 mr-2" />
            <span className="font-medium">Treatment saved successfully!</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => setCurrentPage('animals')}
          className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span className="font-medium">Back to Animals</span>
        </button>
        <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">
          Add New Treatment
        </h2>
        <div></div> {/* Spacer to balance layout */}
      </div>

      <form onSubmit={handleSubmit} className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Animal Information Section */}
            <div className="p-6 border border-gray-200 rounded-2xl bg-gray-50">
              <div className="flex items-center text-blue-600 mb-5">
                <Stethoscope className="w-6 h-6 mr-3" />
                <h3 className="font-bold text-lg">Animal Information</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label htmlFor="animalId" className="block text-sm font-medium text-gray-700 mb-1">Animal ID</label>
                  <input
                    id="animalId"
                    type="text"
                    placeholder="e.g., A-1234"
                    value={treatmentData.animalId}
                    onChange={e => handleInputChange('animalId', e.target.value.toUpperCase())}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                  {errors.animalId && <p className="text-red-500 text-xs mt-1">{errors.animalId}</p>}
                </div>
                <div>
                  <label htmlFor="animalName" className="block text-sm font-medium text-gray-700 mb-1">Animal Name</label>
                  <input
                    id="animalName"
                    type="text"
                    placeholder="e.g., Bella"
                    value={treatmentData.animalName}
                    onChange={e => handleInputChange('animalName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                  {errors.animalName && <p className="text-red-500 text-xs mt-1">{errors.animalName}</p>}
                </div>
                <div>
                  <label htmlFor="farmerPhone" className="block text-sm font-medium text-gray-700 mb-1">Farmer Phone Number</label>
                  <input
                    id="farmerPhone"
                    type="tel"
                    placeholder="e.g., 9876543210"
                    value={treatmentData.farmerPhone}
                    onChange={e => handleInputChange('farmerPhone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                  {errors.farmerPhone && <p className="text-red-500 text-xs mt-1">{errors.farmerPhone}</p>}
                </div>
              </div>
            </div>

            {/* Treatment Details Section */}
            <div className="p-6 border border-gray-200 rounded-2xl bg-gray-50">
              <div className="flex items-center text-green-600 mb-5">
                <Pill className="w-6 h-6 mr-3" />
                <h3 className="font-bold text-lg">Treatment Details</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label htmlFor="disease" className="block text-sm font-medium text-gray-700 mb-1">Disease</label>
                  <input
                    id="disease"
                    type="text"
                    placeholder="e.g., Mastitis"
                    value={treatmentData.disease}
                    onChange={e => handleInputChange('disease', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition"
                  />
                  {errors.disease && <p className="text-red-500 text-xs mt-1">{errors.disease}</p>}
                </div>
                <div>
                  <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700 mb-1">Symptoms</label>
                  <textarea
                    id="symptoms"
                    placeholder="e.g., Swelling, redness, fever..."
                    rows="3"
                    value={treatmentData.symptoms}
                    onChange={e => handleInputChange('symptoms', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input
                      id="startDate"
                      type="date"
                      value={treatmentData.startDate}
                      onChange={e => handleInputChange('startDate', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition"
                    />
                    {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>}
                  </div>
                  <div>
                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <input
                      id="endDate"
                      type="date"
                      value={treatmentData.endDate}
                      onChange={e => handleInputChange('endDate', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition"
                    />
                    {errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Drugs Section */}
          <div className="mt-8">
            <div className="flex items-center text-indigo-600 mb-5">
              <Pill className="w-6 h-6 mr-3" />
              <h3 className="font-bold text-lg">Prescribed Drugs</h3>
            </div>
            {treatmentData.drugs.map((drug, i) => (
              <div key={i} className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-4 relative">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Drug Name</label>
                    <input
                      type="text"
                      placeholder="e.g., Amoxicillin"
                      value={drug.name}
                      onChange={e => handleDrugChange(i, 'name', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
                    />
                    {drugWarnings[i] && (
                      <p className="text-red-500 text-sm flex items-center mt-1">
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        <span className="font-semibold">Warning:</span> Banned drug!
                      </p>
                    )}
                    {errors[`drugName${i}`] && <p className="text-red-500 text-xs mt-1">{errors[`drugName${i}`]}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Morning Dose</label>
                    <input
                      type="text"
                      placeholder="e.g., 2 tablets"
                      value={drug.morning}
                      onChange={e => handleDrugChange(i, 'morning', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Afternoon Dose</label>
                    <input
                      type="text"
                      placeholder="e.g., 1 ml"
                      value={drug.afternoon}
                      onChange={e => handleDrugChange(i, 'afternoon', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Evening Dose</label>
                    <input
                      type="text"
                      placeholder="e.g., 1 injection"
                      value={drug.evening}
                      onChange={e => handleDrugChange(i, 'evening', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Waiting Period (days)</label>
                    <input
                      type="number"
                      placeholder="e.g., 7"
                      value={drug.waitingPeriod}
                      onChange={e => handleDrugChange(i, 'waitingPeriod', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
                    />
                    {errors[`drugWait${i}`] && <p className="text-red-500 text-xs mt-1">{errors[`drugWait${i}`]}</p>}
                  </div>
                </div>
                {treatmentData.drugs.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeDrug(i)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
                    aria-label="Remove drug"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addDrug}
              className="flex items-center px-4 py-2 text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Another Drug
            </button>
            {errors.drugs && <p className="text-red-500 text-sm mt-2">{errors.drugs}</p>}
          </div>

          {/* Notes Section */}
          <div className="mt-8">
            <h3 className="font-bold text-lg text-gray-800 mb-4">Additional Notes</h3>
            <textarea
              placeholder="Add any additional details about the treatment, the animal's condition, or future recommendations."
              rows="4"
              value={treatmentData.notes}
              onChange={e => handleInputChange('notes', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-gray-500 focus:border-gray-500 transition"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end mt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-8 py-3 rounded-lg text-white font-semibold transition-all duration-200 flex items-center justify-center
                ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-lg'}`}
            >
              {isSubmitting ? 'Saving...' : (
                <>
                  <Save className="w-5 h-5 mr-2" />
                  Save Treatment
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddTreatment;