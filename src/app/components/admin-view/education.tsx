"use client";

import { useAdminContextProvider } from "@/context/admin-context-provider";
import FormControl from "./form-control";

const Education = () => {
  const controls = [
    {
      name: "degree",
      placeholder: "Degree Name",
      type: "text",
      label: "Enter Degree Name",
    },
    {
      name: "year",
      placeholder: "Year",
      type: "text",
      label: "Year",
    },
    {
      name: "college",
      placeholder: "College Name",
      type: "text",
      label: "Enter College Name",
    },
  ];

  const { educationData, setEducationData } = useAdminContextProvider();

  return (
    <div className="bg-white p-8 shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-6">Education Section</h2>
        <FormControl
          controls={controls}
          formData={educationData}
          setFormData={setEducationData}
        />

        <button className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-300">
          Add Info
        </button>
    </div>
  );
};

export default Education;
