import { controlsType, FormDataType } from "@/app/types";
import { useAdminContextProvider } from "@/context/admin-context-provider";
import React, { useState } from "react";

interface FormControlProps {
  controls: controlsType[];
  formData: FormDataType[];
  setFormData: React.Dispatch<React.SetStateAction<FormDataType[]>>;
}

function FormControl({
  controls,
  formData,
  setFormData,
}: Readonly<FormControlProps>) {
  const { handleSaveData, activeTab, isUpdating, isAddingNewSection } = useAdminContextProvider();

  const [newData, setNewData] = useState<FormDataType>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // setFormData((prevFormData) => [...prevFormData, newData]);
    handleSaveData(activeTab, newData);
    setNewData({});
  };

  // const handleAddObject = () => {
  // };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {controls.map((controlItem: controlsType) => (
        <div key={controlItem.name} className="flex flex-col">
          <label
            htmlFor={controlItem.name}
            className="text-lg font-semibold text-gray-700 mb-2"
          >
            {controlItem.label}
          </label>
          <input
            type={controlItem.type}
            placeholder={controlItem.placeholder}
            value={newData[controlItem.name] || ""}
            id={controlItem.name}
            required
            onChange={(e) =>
              setNewData({ ...newData, [controlItem.name]: e.target.value })
            }
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-300"
          />
        </div>
      ))}

      {!isUpdating && (
        <button
        type="submit"
        // onClick={handleAddObject}
          className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-300"
        >
          Add Info
        </button>
      )}
      {isAddingNewSection && (
        <button
          className="mt-4 px-6 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-300"
        >
          Cancel
        </button>
      )}
    </form>
  );
}

export default FormControl;

