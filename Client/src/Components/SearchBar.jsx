import React, { useContext } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { IoMdClose } from 'react-icons/io';
import { AppContent } from '../Context/AppContext';

function SearchBar({ value, onChange, handleClearSearch, handleSearch }) {
  const { userData } = useContext(AppContent);

  return (
    <>
      {userData &&
        <div className='w-80 flex items-center px-4 bg-slate-100 rounded-md'>
          <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder='Search notes'
            className='w-full text-sm bg-transparent outline-none py-[11px]'
          />
          {value &&
            <IoMdClose
              className='text-slate-500 mr-3 cursor-pointer hover:text-black'
              onClick={handleClearSearch}
            />}
          <FaMagnifyingGlass
            className='text-slate-400 cursor-pointer hover:text-black'
            onClick={handleSearch}
          />
        </div>}
    </>
  );
}

export default SearchBar;
