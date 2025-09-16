import React, { useState } from 'react';
import { Phone, Stethoscope } from 'lucide-react';
import { useApp } from './AppContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const { setCurrentUser, setCurrentPage, t, currentUser } = useApp();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setpassword] = useState('');
  const [passwordstate, setpasswordstate] = useState(false);
  const navigate=useNavigate()
  const [role,setrole]=useState('farmer');
  const handlepassword = () => {
    if (phoneNumber.length === 10) {
      setpasswordstate(true);
      // Simulate OTP sending
    }
  };

  const handleLogin = () => {
    if (password === '1234') {
      setCurrentUser({ 
        phone: phoneNumber, 
        role: phoneNumber.startsWith('9800') ? 'farmer' : 'veterinarian', 
        name: phoneNumber.startsWith('9800') ? 'Ram Kumar' : 'Dr. Sharma' 
      });
    }
    if(phoneNumber.startsWith('9800')){
      navigate('/dashboard');
    }else {
      navigate('/treatments');
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
                disabled={passwordstate}
              />
              <button
                onClick={handlepassword}
                disabled={passwordstate || phoneNumber.length !== 10}
                className="px-6 py-3 bg-green-600 text-white rounded-r-lg hover:bg-green-700 disabled:opacity-50 transition duration-200"
              >
                <Phone className="w-5 h-5" />
              </button>
            </div>
          </div>

          {passwordstate && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter Password"
              />
              <p className="text-sm text-gray-500 mt-1">Demo password: 1234</p>
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={!passwordstate }
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 transition duration-200"
          >
            Login
          </button>

          <div className="text-center">
            <Link to='/signup'><button
              className="text-green-600 hover:text-green-800 font-medium"
            >
              Don't have an account? SignUp
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;