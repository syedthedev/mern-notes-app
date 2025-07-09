import axios from 'axios';
import React, { useState,useContext } from 'react';
import { AppContent } from '../Context/AppContext';
import toast from 'react-hot-toast';
import { MdClose } from 'react-icons/md';

function AddEditNote({ onClose,noteData,type }) {

  const [title,setTitle] = useState(noteData?.title || "");
  const [content,setContent] = useState(noteData?.content || "");
  const [error,setError] = useState("");

  const { backendUrl,getAllNotes } = useContext(AppContent);

  // Add Note
  const addNote = async () => {
    try {
        axios.defaults.withCredentials = true;
        const { data } = await axios.post(backendUrl + '/api/user/add-note',{
            title,content
        });
        if(data.success){
            toast.success(data.msg);
            getAllNotes()
            onClose()
        }
    } catch (err) {
        toast.error(err.message);
    }
  };

  // Edit Note
  const editNote = async () => {
    try {
        const id = noteData._id;
        axios.defaults.withCredentials = true;
        const { data } = await axios.put(backendUrl + `/api/user/edit-note/${id}`,{
            title,content
        });
        if(data.success){
            toast.success(data.msg);
            getAllNotes()
            onClose()
        }
    } catch (err) {
        toast.error(err.message);
    }
  };

  async function handleAddNote() {
    try {
        if(!title) return setError("Please enter the title");
        if(!content) return setError("Please enter the content");
        setError("");

        if(type === 'edit'){
            editNote()
        }else{
            addNote();
        }

    } catch (err) {
        toast.error(err.message);
    }
  }

  return (
   <div className="w-full relative">

        <button onClick={onClose} className='w-10 h-10 rounded-full flex items-center cursor-pointer justify-center absolute -top-3 -right-3'>
            <MdClose className='text-xl text-slate-400 hover:text-red-600' />
        </button>

        <div className="flex flex-col gap-2">
            <label htmlFor="title" className="input-label">TITLE</label>
            <input
            id="title"
            type="text"
            className="text-2xl text-slate-800 outline-none w-full"
            placeholder="Go To Gym At 5AM"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />
        </div>

        <div className="flex flex-col gap-2 mt-4">
            <label htmlFor="content" className="input-label">CONTENT</label>
            <textarea
            className="text-2xl text-slate-800 p-2 bg-slate-50 rounded outline-none w-full"
            placeholder="Content"
            rows={8}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            />
        </div>
        {error && <p className='text-red-500 text-md mt-1 mb-2'>{error}</p>}
        <div className="mt-5 w-full">
            <button className="w-full py-3 cursor-pointer px-4 rounded-md bg-[#2B85FF] hover:bg-blue-600 text-white font-medium transition-all" onClick={handleAddNote}>
            {type === 'edit' ? 'Update Note' : 'Add Note'}
            </button>
        </div>
    </div>

  )
}

export default AddEditNote