import React, { useState,useContext, useEffect } from 'react';
import Navbar from '../Components/Navbar.jsx';
import NoteCard from '../Components/NoteCard.jsx';
import { MdAdd } from 'react-icons/md';
import AddEditNote from './AddEditNote.jsx';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Modal from 'react-modal';
import { AppContent } from '../Context/AppContext.jsx';
import addNote from '../assets/add-note.png';
import noNote from '../assets/no-note.png';

function Home() {

  const [openAddEditModal,setOpenAddEditModal] = useState({
    isShown : false,
    type : "add",
    data : null
  });

  const [isSearch, setIsSearch] = useState(false);

  const { backendUrl,getUserData,allNotes,setAllNotes,getAllNotes } = useContext(AppContent);
  
  const handleEdit = (noteDeatils) => {
    setOpenAddEditModal({ isShown : true,data : noteDeatils,type : "edit"});
  }

  const handleDelete = async (note) => {
    try {
      const id = note._id;
      axios.defaults.withCredentials = true;
      const { data } = await axios.delete(backendUrl + `/api/user/delete-note/${id}`);
      data.success && getAllNotes()
      data.success && getUserData()
      toast.success(data.msg);
    } catch (err) {
      toast.error(err.message);
    }
  }

  const handleUpdatePin = async (note) => {
    try {
      const id = note._id;
      axios.defaults.withCredentials = true;
      const { data } = await axios.put(backendUrl + `/api/user/update-note-pin/${id}`);
      data.success && getAllNotes()
      data.success && getUserData()
      toast.success(data.msg);
    } catch (err) {
      toast.error(err.message);
    }
  }

  useEffect(() => {
    getAllNotes(),
    getUserData()
  },[]);

  return (
    <>  
        <Navbar setIsSearch={setIsSearch} />
        <div className='container mx-auto px-4'>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10'>

            {allNotes.length > 0 ? (
              allNotes.map((item, index) => (
                <NoteCard 
                  key={item._id}
                  title={item.title} 
                  date={item.createdOn} 
                  content={item.content} 
                  isPinned={item.isPinned}
                  onEdit={() => handleEdit(item)}
                  onDelete={() => handleDelete(item)}
                  onPinNote={() => handleUpdatePin(item)}
                />
              ))
            ) : (
              <div className='col-span-3 flex flex-col justify-center w-full items-center'>
                <img src={isSearch ? noNote : addNote} className={isSearch ? "w-40 opacity-80" : "w-80 opacity-80"} />
                <p className='w-full sm:w-3/4 md:w-1/2 font-medium text-center leading-7 mt-5 text-slate-700 px-4'>
                  {isSearch ? `Oops! No notes found matching your search`: `Start creating your first note! Click the 'Add' button to jot down your thoughts, ideas, and reminders. Let's get started!`}
                </p>
              </div>
            )}

          </div>
        </div>
        <button onClick = {(e) => setOpenAddEditModal({ isShown : true,type : 'add',data : null})} className='w-12 h-12 cursor-pointer flex items-center justify-center rounded-xl bg-[#2B85FF] hover:bg-blue-600 fixed right-6 bottom-6 z-50'>
          <MdAdd className='text-white text-[32px]' />
        </button>
        <Modal
          isOpen={openAddEditModal.isShown}
          onRequestClose={() => {}}
          style={{
            overlay : {
              backgroundColor : "rgba(0,0,0,0.2)",
            }
          }}
          contentLabel = ""
          className = "w-[90%] sm:w-[60%] md:w-[40%] border-0 drop-shadow-xl max-h-[80vh] mx-auto bg-white mt-14 p-6 rounded-md outline-none"
        >
        <AddEditNote onClose = {(e) => setOpenAddEditModal({ isShown : false,type : 'add',data : null})}
        type={openAddEditModal.type}
        noteData={openAddEditModal.data} 
        />
        </Modal>
        
    </>
  )
}

export default Home
