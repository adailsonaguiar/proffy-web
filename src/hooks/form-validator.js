import { useState, useEffect } from 'react';

export function useFormValidator({ initialValues, validate }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouchedField] = useState({});

  useEffect(() => {
    validateValues(values);
  }, [values]);

  function handleChange(e) {
    console.log(values);
    const fieldName = e.target.getAttribute('name');
    const value = e.target.value;
    setValues({ ...values, [fieldName]: value });
  }

  function handleBlur(e) {
    const fieldName = e.target.getAttribute('name');
    setTouchedField({ ...touched, [fieldName]: true });
  }

  function validateValues(values) {
    setErrors(validate(values));
  }

  return {
    handleChange,
    values,
    errors,
    setErrors,
    touched,
    handleBlur,
  };
}
