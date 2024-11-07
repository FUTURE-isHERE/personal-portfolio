
import { useAdminContextProvider } from "@/context/admin-context-provider";
import FormControl from "./form-control";
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
    allData,
    isUpdating,
    handleDeleteClick,
    isModalOpen,
    setIsModalOpen,
    handleConfirmDelete,
    handleEdit,
    handleAddSection,
    isAddingNewSection
  } = useAdminContextProvider();

  const renderProjectsSection = () => {
    if (isUpdating) {
      return (
        <FormControl
          controls={controls}
          formData={projectsData}
        />
      );
    }

    if (allData?.projects?.length > 0) {
      return allData.projects.map((data: FormDataType) => (
        <div key={data._id}>
          <RenderDbData
            data={data}
            controls={controls}
            handleEdit={() => handleEdit(data._id)}
            handleDeleteClick={() => handleDeleteClick(data._id)}
          />
        </div>
      ));
    }

    return (
      <FormControl
        controls={controls}
        formData={projectsData}
      />
    );
  };
  return (
    <div className="bg-white p-8 shadow-md rounded-md">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-6">Projects Section</h2>
        <button
          onClick={handleAddSection}
          className="px-2 h-10 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-colors duration-300"
        >
          Add Section
        </button>
      </div>

      {renderProjectsSection()}

      <div>
        {isAddingNewSection && (
          <FormControl
            controls={controls}
            formData={projectsData}
          />
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
