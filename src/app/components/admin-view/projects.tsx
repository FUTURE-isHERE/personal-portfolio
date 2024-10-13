"use client";

import { useAdminContextProvider } from "@/context/admin-context-provider";
import FormControl from "./form-control";

const Projects = () => {
  const controls = [
    //* to-do: adding image
    // {
    //   name: "image",
    //   placeholder: "Upload Image",
    //   type: "image",
    //   label: "Image",
    // },
    {
      name: "name",
      placeholder: "Project Name",
      type: "text",
      label: "Project Name",
    },
    {
      name: "description",
      placeholder: "Description",
      type: "text",
      label: "Description",
    },
    {
      name: "stack",
      placeholder: "Enter Technologies/Tech Stack",
      type: "text",
      label: "Enter Technologies/Tech Stack",
    },
    {
      name: "website",
      placeholder: "Website",
      type: "text",
      label: "Website",
    },
    {
      name: "github",
      placeholder: "Github",
      type: "text",
      label: "github",
    },
  ];

  const { projectsData, setProjectsData } = useAdminContextProvider();

  return (
    <div className="bg-white p-8 shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-6">Projects Section</h2>
        <FormControl
          controls={controls}
          formData={projectsData}
          setFormData={setProjectsData}
        />

        <button className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-300">
          Add Info
        </button>
    </div>
  );
};

export default Projects;
