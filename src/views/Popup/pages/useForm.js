import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
const useForm = (ValidateInfo) => {
  const [user, setUser] = useState(null);
  const [values, setValues] = useState({
    password: "",
    password2: "",
  });
  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(values);

    const { errors, ok } = ValidateInfo(values);
    setErrors(errors);
    setValid(ok);
    console.log("ERROR=======", errors, ok);
  };
  return { handleChange, values, handleSubmit, errors, valid };
};

export default useForm;
