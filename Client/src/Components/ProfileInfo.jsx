import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../Context/AppContext';

function ProfileInfo({ onLogout }) {
  const navigate = useNavigate();
  const { userData } = useContext(AppContent);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  };

  return (
    <>
      {userData && (
        <div className="relative ml-3">
          <div
            onClick={toggleDropdown}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-black text-white cursor-pointer"
          >
            {userData.name[0].toUpperCase()}
          </div>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-28 bg-gray-100 rounded shadow-md z-50">
              <ul className="text-sm font-semibold">
                <li
                  onClick={onLogout}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ProfileInfo;
