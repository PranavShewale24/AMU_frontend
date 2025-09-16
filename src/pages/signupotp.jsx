import React, { useState } from 'react';
import { Phone, Stethoscope } from 'lucide-react';
import { useApp } from './AppContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const SignupOTP = () => {
  const { setCurrentUser, setCurrentPage, t } = useApp();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const navigate=useNavigate()

  const handleSendOTP = () => {
    if (phoneNumber.length === 10) {
      setOtpSent(true);
      // Simulate OTP sending
    }
  };

  const handleLogin = () => {
    if (otp === '1234') {
      setCurrentUser({ 
        phone: phoneNumber, 
        role: phoneNumber.startsWith('9800') ? 'farmer' : 'veterinarian', 
        name: phoneNumber.startsWith('9800') ? 'Ram Kumar' : 'Dr. Sharma' 
      });
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Stethoscope className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{t.title}</h1>
          <p className="text-gray-600">Secure Authentication</p>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.phoneNumber}
            </label>
            <div className="flex">
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="9876543210"
                disabled={otpSent}
              />
              <button
                onClick={handleSendOTP}
                disabled={otpSent || phoneNumber.length !== 10}
                className="px-6 py-3 bg-green-600 text-white rounded-r-lg hover:bg-green-700 disabled:opacity-50 transition duration-200"
              >
                <Phone className="w-5 h-5" />
              </button>
            </div>
          </div>

          {otpSent && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.enterOTP}
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter 4-digit OTP (1234)"
              />
              <p className="text-sm text-gray-500 mt-1">Demo OTP: 1234</p>
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={!otpSent || otp.length !== 4}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 transition duration-200"
          >
            Sign UP
          </button>

          <div className="text-center">
            <Link to='/signup'><button
              className="text-green-600 hover:text-green-800 font-medium"
            >
              Don't have an account? {t.signup}
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupOTP;