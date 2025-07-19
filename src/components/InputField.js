import { useContext } from "react";
import { FormContext } from "./FormContext";

function InputField({ id, label, type, placeholder, inputRef }) {
  const { formData, handleChange, handleBlur, errors } =
    useContext(FormContext);

  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="font-semibold mb-1 text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        value={formData[id] || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        required
        ref={inputRef}
        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors[id] && <p className="text-red-500 text-sm mt-1">{errors[id]}</p>}
    </div>
  );
}

export default InputField;
