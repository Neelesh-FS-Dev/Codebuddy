import React, {createContext, useContext, useState} from 'react';

const DataContext = createContext();

export const DataProvider = ({children}) => {
  const [screen1Data, setScreen1Data] = useState({
    emailId: '',
    password: '',
  });

  const [screen2Data, setScreen2Data] = useState({
    firstName: '',
    lastName: '',
    address: '',
  });

  return (
    <DataContext.Provider
      value={{screen1Data, setScreen1Data, screen2Data, setScreen2Data}}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);
