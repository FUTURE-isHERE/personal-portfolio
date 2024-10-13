"use client";

import { useAdminContextProvider } from "@/context/admin-context-provider";
import FormControl from "./form-control";

const Experience = () => {
  const controls = [
    {
      name: "position",
      placeholder: "Position",
      type: "text",
      label: "Position",
    },
    {
      name: "company",
      placeholder: "Company",
      type: "text",
      label: "Company",
    },
    {
      name: "duration",
      placeholder: "Duration",
      type: "text",
      label: "Duration",
    },
    {
      name: "location",
      placeholder: "Location",
      type: "text",
      label: "Location",
    },
    {
      name: "jobprofile",
      placeholder: "Job Profile",
      type: "text",
      label: "Job Profile",
    },
  ];

  const { experienceData, setExperienceData } = useAdminContextProvider();

  return (
    <div className="bg-white p-8 shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-6">Experience Section</h2>
        <FormControl
          controls={controls}
          formData={experienceData}
          setFormData={setExperienceData}
        />

        <button className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-300">
          Add Info
        </button>
    </div>
  );
};

export default Experience;
