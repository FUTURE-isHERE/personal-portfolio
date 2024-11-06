"use client";

import { useAdminContextProvider } from "@/context/admin-context-provider";
import FormControl from "./form-control";
import Modal from "../modal";
import RenderDbData from "./render-db-data";
import { useState } from "react";
import { FormDataType } from "@/app/types";

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
  const {
    aboutData,
    setAboutData,
    handleSaveData,
    allData,
    isUpdating,
    setIsUpdating,
    handleDeleteClick,
    isModalOpen,
    setIsModalOpen,
    handleConfirmDelete,
  } = useAdminContextProvider();

  const [prevAboutData, setPrevAboutData] = useState<FormDataType | null>(null);

  const handleEdit = () => {
    setPrevAboutData(aboutData);
    setIsUpdating(true);
  };
  const handleCancel = () => {
    setAboutData(prevAboutData ?? {});
    setIsUpdating(false);
  };

  return (
    <div className="bg-white p-8 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6">About Section</h2>
      {isUpdating ? (
        <FormControl
          controls={controls}
          formData={aboutData}
          setFormData={setAboutData}
        />
      ) : allData?.about?.length > 0 ? (
        allData?.about?.map((data: FormDataType) => (
          <div key={data._id}>
            <RenderDbData
              data={data}
              controls={controls}
              handleEdit={handleEdit}
              handleDeleteClick={() => handleDeleteClick(data._id)}
            />
          </div>
        ))
      ) : (
        <FormControl
          controls={controls}
          formData={aboutData}
          setFormData={setAboutData}
        />
      )}

      <div>
        {isUpdating && (
          <div className="flex gap-4">
            <button
              onClick={() => handleSaveData("about", true)}
              className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-300"
            >
              Update Info
            </button>
            <button
              onClick={handleCancel}
              className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-300"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        title="Confirm Deletion"
        message="Are you sure you want to delete this field?"
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default About;
