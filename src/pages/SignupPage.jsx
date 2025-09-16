import React, { useState } from 'react';
import { User } from 'lucide-react';
import { useApp } from './AppContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const SignupPage = () => {
  const { setCurrentUser, setCurrentPage, t } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: '',
    role: 'farmer'
  });
 const navigate=useNavigate();
  const handleSignup = () => {
    setCurrentUser(formData);
    
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{t.signup}</h1>
          <p className="text-gray-600">Create your account</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.name}</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.phoneNumber}</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter 10-digit phone number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.role}</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="farmer">{t.farmer}</option>
              <option value="veterinarian">{t.veterinarian}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter password"
            />
          </div>
          

         <Link to='/otp'><button
            onClick={handleSignup}
            disabled={!formData.name || formData.phone.length !== 10}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 transition duration-200"
          >
            Send OTP
          </button>
          </Link> 

          <div className="text-center">
           <Link to='/login'> <button
              
              className="text-green-600 hover:text-green-800 font-medium"
            >
              Already have an account? {t.login}
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;