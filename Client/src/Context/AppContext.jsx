import React, { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast';

export const AppContent = createContext();

export const AppContextProvider = (props) => {
    axios.defaults.withCredentials = true;

    const backendUrl = import.meta.env.VITE_BACK_END;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const [isAppLoading, setIsAppLoading] = useState(true); // Add loading state

    useEffect(() => {
        checkLoginStatus();
    }, []);

    async function checkLoginStatus() {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/get-user');
            if (data.success) {
                setUserData(data.user);
                setIsLoggedIn(true);
                getAllNotes();
            } else {
                setUserData(null);
                setIsLoggedIn(false);
            }
        } catch (err) {
            // Don't toast error on startup, it's normal to be unauthenticated
            setUserData(null);
            setIsLoggedIn(false);
        } finally {
            setIsAppLoading(false); // done checking
        }
    }

    const [allNotes, setAllNotes] = useState([]);

    async function getAllNotes() {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/get-all-notes');
            if (data.success) setAllNotes(data.notes);
        } catch (err) {
            toast.error(err.message);
        }
    }

    const value = {
        backendUrl,
        isLoggedIn, setIsLoggedIn,
        userData, setUserData,
        getUserData: checkLoginStatus,
        allNotes, setAllNotes,
        getAllNotes,
        isAppLoading
    };

    return (
        <AppContent.Provider value={value}>
            {props.children}
        </AppContent.Provider>
    );
};
