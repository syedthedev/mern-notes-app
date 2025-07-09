// Controllers/userController.js
import jwt from 'jsonwebtoken';
import { hashPassword, comparePassword } from '../Helper/Helper.js';
import User from '../Schema/userSchema.js';
import Note from '../Schema/noteSchema.js';

// Register
export const register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.json({ success: false, msg: 'Missing details' });
    }

    try {
        const existUser = await User.findOne({ email });
        if (existUser) return res.json({ success: false, msg: 'User already exists' });

        const hash_pass = hashPassword(password);
        const user = new User({ name, email, password: hash_pass });
        const saveUser = await user.save();

        const token = jwt.sign({ id: saveUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.json({ success: true, msg: 'Registered successfully' });
    } catch (err) {
        res.json({ success: false, msg: err.message });
    }
};

// Login
export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.json({ success: false, msg: 'Email and Password are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) return res.json({ success: false, msg: 'User not found!' });

        const isMatch = comparePassword(password, user.password);
        if (!isMatch) return res.json({ success: false, msg: 'Invalid password' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.json({ success: true, msg: 'Login successful' });
    } catch (err) {
        res.json({ success: false, msg: err.message });
    }
};

// Logout
export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict'
        });
        res.json({ success: true, msg: 'Logged out' });
    } catch (err) {
        res.json({ success: false, msg: err.message });
    }
};

// Add Note
export const addNote = async (req, res) => {
    const { title, content } = req.body;
    const userId = req.user.id;
    if (!title || !content) return res.json({ success: false, msg: 'Missing details' });

    try {
        const note = new Note({ title, content, userId });
        await note.save();
        res.json({ success: true, msg: 'Note added' });
    } catch (err) {
        res.json({ success: false, msg: err.message });
    }
};

// Edit Note
export const editNote = async (req, res) => {
    const id = req.params.id;
    const { title, content, isPinned } = req.body;
    const userId = req.user.id;

    if (!id) return res.json({ success: false, msg: 'Missing Params' });
    if (!title && !content && isPinned === undefined) return res.json({ success: false, msg: 'No changes provided' });

    try {
        const note = await Note.findOne({ _id: id, userId });
        if (!note) return res.json({ success: false, msg: 'Note not found' });

        if (title) note.title = title;
        if (content) note.content = content;
        if (typeof isPinned === 'boolean') note.isPinned = isPinned;

        await note.save();
        res.json({ success: true, msg: 'Note updated' });
    } catch (err) {
        res.json({ success: false, msg: err.message });
    }
};

// Update Note Pin
export const updatePin = async (req, res) => {
    const id = req.params.id;
    const userId = req.user.id;

    if (!id) return res.json({ success: false, msg: 'Missing Params' });

    try {
        const note = await Note.findOne({ _id: id, userId });
        if (!note) return res.json({ success: false, msg: 'Note not found' });

        note.isPinned = !note.isPinned;
        await note.save();

        res.json({ success: true, msg: 'Note pinned/unpinned' });
    } catch (err) {
        res.json({ success: false, msg: err.message });
    }
};

// Delete Note
export const deleteNote = async (req, res) => {
    const id = req.params.id;
    const userId = req.user.id;

    if (!id) return res.json({ success: false, msg: 'Missing Params' });

    try {
        await Note.deleteOne({ _id: id, userId });
        res.json({ success: true, msg: 'Note deleted' });
    } catch (err) {
        res.json({ success: false, msg: err.message });
    }
};

// Search Note
export const searchNotes = async (req, res) => {
    const { query } = req.query;
    const userId = req.user.id;

    if (!query) return res.json({ success: false, msg: 'Search query is required' });

    try {
        const notes = await Note.find({
            userId,
            $or: [
                { title: { $regex: new RegExp(query, 'i') } },
                { content: { $regex: new RegExp(query, 'i') } }
            ]
        });

        res.json({ success: true, notes, msg: 'Notes retrieved' });
    } catch (err) {
        res.json({ success: false, msg: err.message });
    }
};

// Get All Notes
export const getAllNotes = async (req, res) => {
    const userId = req.user.id;
    try {
        const notes = await Note.find({ userId }).sort({ isPinned: -1 });
        res.json({ success: true, notes, msg: 'All notes retrieved successfully' });
    } catch (err) {
        res.json({ success: false, msg: err.message });
    }
};

// Get User
export const getUser = async (req, res) => {
    const userId = req.user.id;
    try {
        const user = await User.findById(userId).select("-password");
        if (!user) return res.sendStatus(401);
        res.json({ success: true, user });
    } catch (err) {
        res.json({ success: false, msg: err.message });
    }
};
