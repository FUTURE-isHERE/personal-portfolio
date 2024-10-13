"use client";

import { controlsType } from "@/app/types";
import FormControl from "./form-control";
import { useAdminContextProvider } from "@/context/admin-context-provider";

const controls: controlsType[] = [
  {
    name: "heading",
    placeholder: "Enter Heading Text",
    type: "text",
    label: "Heading",
  },
  {
    name: "summary",
    placeholder: "Enter Summary Text",
    type: "text",
    label: "Summary",
  },
];
const Home = () => {
  const { homeFormData, setHomeFormData } = useAdminContextProvider();
  return (
    <div className="bg-white p-8 shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-6">Home Section</h2>
        <FormControl
          controls={controls}
          formData={homeFormData}
          setFormData={setHomeFormData}
        />

        <button className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-300">Add Info</button>
    </div>
  );
};

export default Home;
