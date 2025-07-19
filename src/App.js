import { Toaster } from "react-hot-toast";
import "./App.css";
import { FormProvider } from "./components/FormContext";
import FormWrapper from "./components/FormWrapper";

function App() {
  return (
    <FormProvider>
      <div className="flex flex-col items-center min-h-screen p-4 sm:p-6 bg-gray-100">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
          Welcome Boss
        </h1>
        <FormWrapper />
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      </div>
    </FormProvider>
  );
}

export default App;
