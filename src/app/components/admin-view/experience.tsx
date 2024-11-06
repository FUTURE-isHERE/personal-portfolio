"use client";

import { useAdminContextProvider } from "@/context/admin-context-provider";
import FormControl from "./form-control";
import RenderDbData from "./render-db-data";
import Modal from "../modal";
import { FormDataType } from "@/app/types";
import { useState } from "react";

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

  const {
    experienceData,
    setExperienceData,
    allData,
    isUpdating,
    setIsUpdating,
    handleDeleteClick,
    isModalOpen,
    setIsModalOpen,
    handleConfirmDelete,
    handleSaveData,
    isAddingNewSection,
    setIsAddingNewSection,
  } = useAdminContextProvider();

  const [prevExperienceData, setPrevExperienceData] =
    useState<FormDataType | null>(null);
  const [selectedFieldIndex, setSelectedFieldIndex] = useState<string | null>(
    
  )

  const handleEdit = (data: FormDataType, id: string) => {
    console.log('data in handleEdit', data);
    setSelectedFieldIndex(id)
    setPrevExperienceData(experienceData);
    setIsUpdating(true);
  };

  console.log('experienceData', experienceData);
  console.log('prevExperience', prevExperienceData);
  const handleCancel = () => {
    setExperienceData(prevExperienceData ?? {});
    setIsUpdating(false);
  };

  const handleAddSection = () => {
    setExperienceData({}); 
    setIsAddingNewSection(true); 
    setIsUpdating(false);
  };

  return (
    <div className="bg-white p-8 shadow-md rounded-md">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-6">Experience Section</h2>
        <button
          onClick={handleAddSection}
          className="px-2 h-10 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-colors duration-300"
        >
          Add Section
        </button>
      </div>
      {isUpdating ? (
        <FormControl
          controls={controls}
          formData={experienceData}
          setFormData={setExperienceData}
        />
      ) : allData?.experience?.length > 0 ? (
        allData?.experience?.map((data: FormDataType, index: number) => (
          <div key={data._id}>
            <RenderDbData
              data={data}
              controls={controls}
              handleEdit={() => handleEdit(data, data._id)}
              handleDeleteClick={() => handleDeleteClick(data._id)}
            />
          </div>
        ))
      ) : (
        <FormControl
          controls={controls}
          formData={experienceData}
          setFormData={setExperienceData}
        />
      )}

      {
        isAddingNewSection && (
          <FormControl
            controls={controls}
            formData={experienceData}
            setFormData={setExperienceData}
          />
        )
      }

      <div>
        {isUpdating && (
          <div className="flex gap-4">
            <button
              onClick={() => handleSaveData("experience", true)}
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

export default Experience;
