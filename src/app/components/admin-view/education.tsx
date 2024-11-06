"use client";

import { useAdminContextProvider } from "@/context/admin-context-provider";
import FormControl from "./form-control";
import RenderDbData from "./render-db-data";
import { FormDataType } from "@/app/types";
import { useState } from "react";
import Modal from "../modal";

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

  const {
    educationData,
    setEducationData,
    handleSaveData,
    allData,
    isUpdating,
    setIsUpdating,
    handleDeleteClick,
    isModalOpen,
    setIsModalOpen,
    handleConfirmDelete,
  } = useAdminContextProvider();

  const [prevEducationData, setPrevEducationData] =
    useState<FormDataType | null>(null);


  const handleEdit = () => {
    setPrevEducationData(educationData);
    setIsUpdating(true);
  };
  const handleCancel = () => {
    setEducationData(prevEducationData ?? {});
    setIsUpdating(false);
  };

  return (
    <div className="bg-white p-8 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6">Education Section</h2>
      {isUpdating ? (
        <FormControl
          controls={controls}
          formData={educationData}
          setFormData={setEducationData}
        />
      ) : allData?.education?.length > 0 ? (
        allData?.education?.map((data: FormDataType) => (
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
          formData={educationData}
          setFormData={setEducationData}
        />
      )}

      <div>
        {isUpdating && (
          <div className="flex gap-4">
            <button
              onClick={() => handleSaveData("education", true)}
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

export default Education;
