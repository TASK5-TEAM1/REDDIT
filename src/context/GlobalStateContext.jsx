import React, { createContext, useContext, useState } from 'react';

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
    const [hotPosts, setHotPosts] = useState([]);
    
    const [isLoading, setIsLoading] = useState(false);

    const updateHotPosts = (newPosts) => {
        setHotPosts(newPosts);
    };

    const value = {
        hotPosts,
        updateHotPosts,
        isLoading,
        setIsLoading,
    };

    return (
        <GlobalStateContext.Provider value={value}>
            {children}
        </GlobalStateContext.Provider>
    );
};

export const useGlobalState = () => {
    return useContext(GlobalStateContext);
};