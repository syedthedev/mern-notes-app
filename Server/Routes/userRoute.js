import express from 'express';
import { register,login,logout, addNote, editNote, deleteNote, getAllNotes, updatePin, searchNotes, getUser } from '../Controllers/userController.js';
import userAuth from '../Middleware/userAuth.js';

const userRoute = express.Router();

// Routes
userRoute.post('/register',register);
userRoute.post('/login',login);
userRoute.post('/logout',logout);
userRoute.post('/add-note',userAuth,addNote);
userRoute.put('/edit-note/:id',userAuth,editNote);
userRoute.put('/update-note-pin/:id',userAuth,updatePin);
userRoute.delete('/delete-note/:id',userAuth,deleteNote);
userRoute.get('/search-notes',userAuth,searchNotes);
userRoute.get('/get-all-notes',userAuth,getAllNotes);
userRoute.get('/get-user',userAuth,getUser);


export default userRoute;