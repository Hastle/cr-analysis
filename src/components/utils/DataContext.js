import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext(undefined);

export const DataProvider = ({ children }) => {
    const [dataArrExample, setData] = useState(null); // Инициализируйте значение данных как null

    const value = {
        dataArrExample,
        setData,
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    return useContext(DataContext);
};
