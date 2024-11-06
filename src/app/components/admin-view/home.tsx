"use client";

import { controlsType, FormDataType } from "@/app/types";
import FormControl from "./form-control";
import { useAdminContextProvider } from "@/context/admin-context-provider";
import { useState } from "react";
import Modal from "../modal";
import RenderDbData from "./render-db-data";

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
  const {
    homeFormData,
    setHomeFormData,
    handleSaveData,
    allData,
    isUpdating,
    setIsUpdating,
    handleDeleteClick,
    isModalOpen,
    setIsModalOpen,
    handleConfirmDelete,
  } = useAdminContextProvider();

  const [prevHomeData, setPrevHomeData] = useState<FormDataType[] | null>(null);

  console.log('homeFormData', homeFormData);
  const handleEdit = () => {
    setPrevHomeData(homeFormData);
    setIsUpdating(true);
  };
  const handleCancel = () => {
    setHomeFormData(prevHomeData ?? []);
    setIsUpdating(false);
  };

  return (
    <div className="bg-white p-8 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6">Home Section</h2>

      {isUpdating ? (
        <FormControl
          controls={controls}
          formData={homeFormData}
          setFormData={setHomeFormData}
        />
      ) : allData?.home?.length > 0 ? (
        allData?.home?.map((data: FormDataType) => (
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
          formData={homeFormData}
          setFormData={setHomeFormData}
        />
      )}

      <div>
        {isUpdating && (
          <div className="flex gap-4">
            <button
              onClick={() => handleSaveData("home", true)}
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

export default Home;
