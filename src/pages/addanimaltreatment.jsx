import React, { useState } from 'react';
import { 
  ArrowLeft,
  AlertTriangle,
  CheckCircle,
  Save,
  Stethoscope,
  Pill,
  Calendar
} from 'lucide-react';

const bannedDrugs = [
  'Chloramphenicol',
  'Nitrofurans', 
  'Nitroimidazoles',
  'Phenylbutazone',
  'Stilbenes'
];

const AddTreatment = ({ currentUser, setCurrentPage, language = 'en' }) => {
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

  // Handle input changes
  const handleInputChange = (field, value) => {
    setTreatmentData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleDrugChange = (index, field, value) => {
    const newDrugs = [...treatmentData.drugs];
    newDrugs[index][field] = value;
    setTreatmentData(prev => ({ ...prev, drugs: newDrugs }));

    // banned drug check
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
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};
    if (!treatmentData.animalId) newErrors.animalId = 'Animal ID is required';
    if (!treatmentData.animalName) newErrors.animalName = 'Animal name is required';
    if (!treatmentData.farmerPhone) newErrors.farmerPhone = 'Farmer phone is required';
    if (!/^\d{10}$/.test(treatmentData.farmerPhone)) newErrors.farmerPhone = 'Enter valid 10-digit phone';
    if (!treatmentData.disease) newErrors.disease = 'Disease is required';
    if (!treatmentData.startDate) newErrors.startDate = 'Start date is required';
    if (!treatmentData.endDate) newErrors.endDate = 'End date is required';
    if (treatmentData.drugs.length === 0) newErrors.drugs = 'At least one drug required';

    treatmentData.drugs.forEach((drug, i) => {
      if (!drug.name) newErrors[`drugName${i}`] = 'Drug name required';
      if (!drug.waitingPeriod) newErrors[`drugWait${i}`] = 'Waiting period required';
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setCurrentPage('animals');
      }, 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setCurrentPage('animals')}
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-2xl font-bold">Add New Treatment</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Animal Information */}
          <div className="bg-white rounded-xl border p-6">
            <div className="flex items-center mb-4">
              <Stethoscope className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="font-semibold">Animal Information</h3>
            </div>

            {/* Animal ID */}
            <input
              type="text"
              placeholder="Animal ID"
              value={treatmentData.animalId}
              onChange={e => handleInputChange('animalId', e.target.value.toUpperCase())}
              className="w-full mb-3 px-4 py-2 border rounded"
            />
            {errors.animalId && <p className="text-red-500 text-sm">{errors.animalId}</p>}

            {/* Animal Name */}
            <input
              type="text"
              placeholder="Animal Name"
              value={treatmentData.animalName}
              onChange={e => handleInputChange('animalName', e.target.value)}
              className="w-full mb-3 px-4 py-2 border rounded"
            />
            {errors.animalName && <p className="text-red-500 text-sm">{errors.animalName}</p>}

            {/* Farmer Phone */}
            <input
              type="text"
              placeholder="Farmer Phone Number"
              value={treatmentData.farmerPhone}
              onChange={e => handleInputChange('farmerPhone', e.target.value)}
              className="w-full mb-3 px-4 py-2 border rounded"
            />
            {errors.farmerPhone && <p className="text-red-500 text-sm">{errors.farmerPhone}</p>}
          </div>

          {/* Treatment Details */}
          <div className="bg-white rounded-xl border p-6">
            <div className="flex items-center mb-4">
              <Pill className="w-5 h-5 text-green-600 mr-2" />
              <h3 className="font-semibold">Treatment Details</h3>
            </div>

            {/* Disease */}
            <input
              type="text"
              placeholder="Disease"
              value={treatmentData.disease}
              onChange={e => handleInputChange('disease', e.target.value)}
              className="w-full mb-3 px-4 py-2 border rounded"
            />
            {errors.disease && <p className="text-red-500 text-sm">{errors.disease}</p>}

            {/* Symptoms */}
            <textarea
              placeholder="Symptoms"
              rows="3"
              value={treatmentData.symptoms}
              onChange={e => handleInputChange('symptoms', e.target.value)}
              className="w-full mb-3 px-4 py-2 border rounded"
            />

            {/* Start & End Date */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm">Start Date</label>
                <input
                  type="date"
                  value={treatmentData.startDate}
                  onChange={e => handleInputChange('startDate', e.target.value)}
                  className="w-full px-4 py-2 border rounded"
                />
                {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate}</p>}
              </div>
              <div>
                <label className="block text-sm">End Date</label>
                <input
                  type="date"
                  value={treatmentData.endDate}
                  onChange={e => handleInputChange('endDate', e.target.value)}
                  className="w-full px-4 py-2 border rounded"
                />
                {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Drugs Section */}
        <div className="bg-white rounded-xl border p-6 mt-6">
          <h3 className="font-semibold mb-4">Drugs</h3>
          {treatmentData.drugs.map((drug, i) => (
            <div key={i} className="border rounded p-4 mb-4 relative">
              <input
                type="text"
                placeholder="Drug Name"
                value={drug.name}
                onChange={e => handleDrugChange(i, 'name', e.target.value)}
                className="w-full mb-2 px-3 py-2 border rounded"
              />
              {drugWarnings[i] && (
                <p className="text-red-500 text-sm flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-1" /> Banned drug!
                </p>
              )}
              <div className="grid grid-cols-4 gap-2">
                <input
                  type="text"
                  placeholder="Morning dose"
                  value={drug.morning}
                  onChange={e => handleDrugChange(i, 'morning', e.target.value)}
                  className="px-2 py-1 border rounded"
                />
                <input
                  type="text"
                  placeholder="Afternoon dose"
                  value={drug.afternoon}
                  onChange={e => handleDrugChange(i, 'afternoon', e.target.value)}
                  className="px-2 py-1 border rounded"
                />
                <input
                  type="text"
                  placeholder="Evening dose"
                  value={drug.evening}
                  onChange={e => handleDrugChange(i, 'evening', e.target.value)}
                  className="px-2 py-1 border rounded"
                />
                <input
                  type="number"
                  placeholder="Waiting Period (days)"
                  value={drug.waitingPeriod}
                  onChange={e => handleDrugChange(i, 'waitingPeriod', e.target.value)}
                  className="px-2 py-1 border rounded"
                />
              </div>
              <button
                type="button"
                onClick={() => removeDrug(i)}
                className="absolute top-2 right-2 text-red-500 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addDrug}
            className="px-4 py-2 bg-gray-100 rounded"
          >
            + Add Drug
          </button>
          {errors.drugs && <p className="text-red-500 text-sm">{errors.drugs}</p>}
        </div>

        {/* Notes */}
        <div className="bg-white rounded-xl border p-6 mt-6">
          <textarea
            placeholder="Additional Notes"
            rows="4"
            value={treatmentData.notes}
            onChange={e => handleInputChange('notes', e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 flex items-center"
          >
            {isSubmitting ? 'Saving...' : <><Save className="w-4 h-4 mr-2" /> Save Treatment</>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTreatment;
