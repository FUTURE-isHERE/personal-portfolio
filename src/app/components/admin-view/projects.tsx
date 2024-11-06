"use client";

import { useAdminContextProvider } from "@/context/admin-context-provider";
import FormControl from "./form-control";
import { useState } from "react";
import { FormDataType } from "@/app/types";
import RenderDbData from "./render-db-data";
import Modal from "../modal";

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

  const {
    projectsData,
    setProjectsData,
    handleSaveData,
    allData,
    isUpdating,
    setIsUpdating,
    handleDeleteClick,
    isModalOpen,
    setIsModalOpen,
    handleConfirmDelete,
  } = useAdminContextProvider();

  const [prevProjectsData, setPrevProjectsData] = useState<FormDataType | null>(
    null
  );

  const handleEdit = () => {
    setPrevProjectsData(projectsData);
    setIsUpdating(true);
  };
  const handleCancel = () => {
    setProjectsData(prevProjectsData ?? {});
    setIsUpdating(false);
  };

  return (
    <div className="bg-white p-8 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6">Projects Section</h2>
      {isUpdating ? (
        <FormControl
          controls={controls}
          formData={projectsData}
          setFormData={setProjectsData}
        />
      ) : allData?.projects?.length > 0 ? (
        allData?.projects?.map((data: FormDataType) => (
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
          formData={projectsData}
          setFormData={setProjectsData}
        />
      )}

      <div>
        {isUpdating && (
          <div className="flex gap-4">
            <button
              onClick={() => handleSaveData("projects", true)}
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

export default Projects;
