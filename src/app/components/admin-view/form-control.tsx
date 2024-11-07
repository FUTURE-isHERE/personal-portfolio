import { controlsType, FormDataType } from "@/app/types";
import { useAdminContextProvider } from "@/context/admin-context-provider";
import React, { useEffect, useRef, useState } from "react";

interface FormControlProps {
  controls: controlsType[];
  formData: FormDataType[];
}

function FormControl({ controls, formData }: Readonly<FormControlProps>) {
  const {
    handleSaveData,
    activeTab,
    isUpdating,
    isAddingNewSection,
    setIsAddingNewSection,
    selectedId,
    setIsUpdating,
  } = useAdminContextProvider();

  const [newData, setNewData] = useState<FormDataType>({});
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if ((isAddingNewSection || isUpdating || !selectedId) && inputRef.current) {
      inputRef.current?.focus();
    }
  }, [isAddingNewSection, isUpdating, selectedId]);

  useEffect(() => {
    if (selectedId) {
      const selectedData = formData.find((data) => data._id === selectedId);
      if (selectedData) {
        setNewData(selectedData);
      }
    }
  }, [selectedId, formData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSaveData(activeTab, newData);
    setNewData({});
  };

  const handleCancel = () => {
    setNewData({});
    setIsAddingNewSection(false);
    if (isUpdating) {
      setIsUpdating(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 shadow-lg rounded-lg border border-gray-200"
    >
      <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
        {isUpdating ? "Update Information" : "Add Information"}
      </h2>

      {controls.map((controlItem: controlsType, index: number) => (
        <div key={controlItem.name} className="flex flex-col">
          <label
            htmlFor={controlItem.name}
            className="text-lg font-semibold text-gray-700 mb-2"
          >
            {controlItem.label}
          </label>
          <input
            ref={index === 0 ? inputRef : null}
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

      <div className="flex justify-end gap-4">
        {!isUpdating && (
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-300"
          >
            Add Info
          </button>
        )}
        {isUpdating && (
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-300"
          >
            Update Info
          </button>
        )}
        {(isAddingNewSection || isUpdating) && (
          <button
            onClick={handleCancel}
            className="px-6 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition-colors duration-300"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default FormControl;
