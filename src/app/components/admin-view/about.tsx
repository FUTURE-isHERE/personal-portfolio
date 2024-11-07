import { useAdminContextProvider } from "@/context/admin-context-provider";
import FormControl from "./form-control";
import Modal from "../modal";
import RenderDbData from "./render-db-data";
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
    allData,
    isUpdating,
    handleDeleteClick,
    isModalOpen,
    setIsModalOpen,
    handleConfirmDelete,
    handleEdit,
  } = useAdminContextProvider();

  const renderAboutSection = () => {
    if (isUpdating) {
      return (
        <FormControl
          controls={controls}
          formData={aboutData}
        />
      );
    }

    if (allData?.about?.length > 0) {
      return allData.about.map((data: FormDataType) => (
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
        formData={aboutData}
      />
    );
  };

  return (
    <div className="bg-white p-8 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6">About Section</h2>

      {renderAboutSection()}

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
