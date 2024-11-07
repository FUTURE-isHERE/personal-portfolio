import { controlsType, FormDataType } from "@/app/types";
import FormControl from "./form-control";
import { useAdminContextProvider } from "@/context/admin-context-provider";
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
    allData,
    isUpdating,
    handleDeleteClick,
    isModalOpen,
    setIsModalOpen,
    handleConfirmDelete,
    handleEdit
  } = useAdminContextProvider();


  const renderHomeSection = () => {
    if (isUpdating) {
      return (
        <FormControl
          controls={controls}
          formData={homeFormData}
        />
      );
    }

    if (allData?.home?.length > 0) {
      return allData.home.map((data: FormDataType) => (
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
        formData={homeFormData}
      />
    );
  };

  return (
    <div className="bg-white p-8 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6">Home Section</h2>

      {renderHomeSection()}

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
