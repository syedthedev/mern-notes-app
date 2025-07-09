import React, { useContext, useState } from 'react';
import ProfileInfo from './ProfileInfo';
import SearchBar from './SearchBar';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { AppContent } from '../Context/AppContext';
import { useNavigate } from 'react-router-dom';

function Navbar({ setIsSearch }) {
  const [queryStr, setQueryStr] = useState("");
  const navigate = useNavigate();

  const { backendUrl, setIsLoggedIn, setUserData, setAllNotes,getAllNotes } = useContext(AppContent);

  async function handleSearch(query) {
    try {
      axios.defaults.withCredentials = true;

      const { data } = await axios.get(backendUrl + '/api/user/search-notes', {
        params: { query }
      });

      if (data.success) {
        setIsSearch(true);
        setAllNotes(data.notes);
      } else {
        toast.error(data.msg || "Search failed");
      }
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function onLogout() {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/user/logout');
      if (data.success) {
        setIsLoggedIn(false);
        setUserData(false);
        toast.success(data.msg);
        navigate('/login');
      } else {
        toast.error(data.msg);
      }
    } catch (err) {
      toast.error(err.message);
    }
  }

  const handleClearSearch = () => {
    setQueryStr("");
    setIsSearch(false);
    getAllNotes();
  };

  return (
    <>
      <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
        <h2 className='text-xl font-medium text-black py-2 mr-2'>Notes</h2>

        <SearchBar
          value={queryStr}
          onChange={(e) => setQueryStr(e.target.value)}
          handleClearSearch={handleClearSearch}
          handleSearch={() => handleSearch(queryStr)}
        />

        <ProfileInfo onLogout={onLogout} />
      </div>
    </>
  );
}

export default Navbar;
