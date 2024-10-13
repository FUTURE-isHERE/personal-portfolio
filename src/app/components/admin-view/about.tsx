"use client";

import { useAdminContextProvider } from "@/context/admin-context-provider";
import FormControl from "./form-control";

const About = () => {
  const controls = [
    {
      name: "aboutme",
      placeholder: "About Me",
      type: "text",
      label: "About Me",
    },
    {
      name: "noofprojects",
      placeholder: "No of projects",
      type: "text",
      label: "Enter no of projects",
    },
    {
      name: "yearofexperience",
      placeholder: "No of experience",
      type: "text",
      label: "Enter no of experience",
    },
    {
      name: "skills",
      placeholder: "skills",
      type: "text",
      label: "Skills",
    },
  ];
  const { aboutData, setAboutData } = useAdminContextProvider();

  return (
    <div className="bg-white p-8 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6">About Section</h2>
      <FormControl
        controls={controls}
        formData={aboutData}
        setFormData={setAboutData}
      />

      <button className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-300">
        Add Info
      </button>
    </div>
  );
};

export default About;
