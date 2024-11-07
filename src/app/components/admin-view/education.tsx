import { useAdminContextProvider } from "@/context/admin-context-provider";
import FormControl from "./form-control";
import RenderDbData from "./render-db-data";
import { FormDataType } from "@/app/types";
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
    allData,
    isUpdating,
    handleDeleteClick,
    isModalOpen,
    setIsModalOpen,
    handleConfirmDelete,
    handleEdit,
    handleAddSection,
    isAddingNewSection,
  } = useAdminContextProvider();

  const renderEducationSection = () => {
    if (isUpdating) {
      return (
        <FormControl
          controls={controls}
          formData={educationData}
        />
      );
    }

    if (allData?.education?.length > 0) {
      return allData.education.map((data: FormDataType) => (
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
        formData={educationData}
      />
    );
  };

  return (
    <div className="bg-white p-8 shadow-md rounded-md">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-6">Education Section</h2>
        <button
          onClick={handleAddSection}
          className="px-2 h-10 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-colors duration-300"
        >
          Add Section
        </button>
      </div>

      {renderEducationSection()}

      <div>
        {isAddingNewSection && (
          <FormControl
            controls={controls}
            formData={educationData}
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

export default Education;
