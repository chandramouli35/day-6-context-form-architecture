import { useContext, useRef } from "react";
import toast from "react-hot-toast";
import { FormContext } from "./FormContext";
import InputField from "./InputField";

function FormWrapper() {
  const nameRef = useRef(null);
  const { validateForm, setFormData, formData } = useContext(FormContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      toast.success("Form submitted successfully!");
      console.log("Form submitted:", formData);
      setFormData({ name: "", email: "", password: "", confirmPassword: "" });
      localStorage.removeItem("signupForm");
      localStorage.removeItem("signupErrors");
    } else {
      toast.error("Please fix form errors.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-md"
    >
      <InputField
        id="name"
        label="Name"
        type="text"
        placeholder="Enter Your Good Name"
        inputRef={nameRef}
      />
      <InputField
        id="email"
        label="Email"
        type="email"
        placeholder="Enter Your Email"
      />
      <InputField
        id="password"
        label="Password"
        type="password"
        placeholder="Enter Your Password"
      />
      <InputField
        id="confirmPassword"
        label="Confirm Password"
        type="password"
        placeholder="Confirm Your Password"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
      >
        Sign Up
      </button>
    </form>
  );
}

export default FormWrapper;
