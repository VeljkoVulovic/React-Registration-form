import React, { useState, createContext } from "react";

const FormDataContext = createContext({});

export const FormDataProvider = ({ children }) => {
  const [data, setData] = useState({
    fname: "",
    lname: "",
    address: "",
    terms: false,
    username: "",
    email: "",
    password: "",
    password_confirm: "",
  });

  const setValues = (values) => {
    setData({
      ...data,
      ...values,
    });
  };

  return (
    <FormDataContext.Provider value={{ data, setData, setValues }}>
      {children}
    </FormDataContext.Provider>
  );
};

export default FormDataContext;
