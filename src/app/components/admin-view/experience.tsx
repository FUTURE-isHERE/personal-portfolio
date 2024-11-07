import { useAdminContextProvider } from "@/context/admin-context-provider";
import FormControl from "./form-control";
import RenderDbData from "./render-db-data";
import Modal from "../modal";
import { FormDataType } from "@/app/types";

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
    allData,
    isUpdating,
    handleDeleteClick,
    isModalOpen,
    setIsModalOpen,
    handleConfirmDelete,
    isAddingNewSection,
    handleEdit,
    handleAddSection
  } = useAdminContextProvider();

  const renderExperienceSection = () => {
    if (isUpdating) {
      return (
        <FormControl
          controls={controls}
          formData={experienceData}
        />
      );
    }

    if (allData?.experience?.length > 0) {
      return allData.experience.map((data: FormDataType) => (
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
        formData={experienceData}
      />
    );
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

      {renderExperienceSection()}

      <div>
        {isAddingNewSection && (
          <FormControl
            controls={controls}
            formData={experienceData}
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

export default Experience;
