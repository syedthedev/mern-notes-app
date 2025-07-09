import React from 'react';
import { MdOutlinePushPin,MdCreate,MdDelete } from 'react-icons/md';
import moment from 'moment';

function NoteCard({
    title,
    date,
    content,
    isPinned,
    onEdit,
    onDelete,
    onPinNote
}) {
  return (
    <>
    <div className='border-0 rounded p-4 bg-white drop-shadow hover:shadow-xl transition-all ease-in-out'>
        <div className='flex items-center justify-between'>
            <div>
                <h6 className='text-lg font-medium'>{title}</h6>
                <span className='text-xs text-slate-500'>{moment(date).format('Do MM YYYY')}</span>
            </div>
            <MdOutlinePushPin className={`icon-btn cursor-pointer ${isPinned ? 'text-[#2B85FF] ' : 'text-slate-300'}`} onClick={onPinNote} />
        </div>
        <p className='text-md text-slate-600 mt-2'>{content?.slice(0,60)}</p>
        <div className='flex items-center mt-2'>
            <div className='flex items-center gap-3'>
                <MdCreate className='icon-btn hover:text-yellow-400 cursor-pointer' onClick={onEdit} />
                <MdDelete className='icon-btn hover:text-red-500 cursor-pointer' onClick={onDelete} />
            </div>
        </div>
    </div>
    </>
  )
}

export default NoteCard