import { createContext } from "react";
import useLocalStorage from "./hooks/useLocalStorage";

export const FormContext = createContext();

export function FormProvider({ children }) {
  const [formData, setFormData] = useLocalStorage("signupForm", {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useLocalStorage("signupErrors", {});

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  const validateField = (name, value, allValues) => {
    const newErrors = { ...errors };
    if (name === "name") {
      if (!value.trim()) {
        newErrors.name = "Name is required";
      } else {
        delete newErrors.name;
      }
    }
    if (name === "email") {
      if (!emailRegex.test(value)) {
        newErrors.email = "Valid email is required";
      } else {
        delete newErrors.email;
      }
    }
    if (name === "password") {
      if (!passwordRegex.test(value)) {
        newErrors.password =
          "Password must be 6+ characters with letters and numbers";
      } else {
        delete newErrors.password;
      }
      // Re-validate confirmPassword if password changes
      if (allValues.confirmPassword && value !== allValues.confirmPassword) {
        newErrors.confirmPassword = "Passwords must match";
      } else {
        delete newErrors.confirmPassword;
      }
    }
    if (name === "confirmPassword") {
      if (value !== allValues.password) {
        newErrors.confirmPassword = "Passwords must match";
      } else {
        delete newErrors.confirmPassword;
      }
    }
    return newErrors;
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!emailRegex.test(formData.email))
      newErrors.email = "Valid email is required";
    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be 6+ characters with letters and numbers";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords must match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors(validateField(name, value, { ...formData, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors(validateField(name, value, formData));
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        setFormData,
        errors,
        validateForm,
        handleChange,
        handleBlur,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}
