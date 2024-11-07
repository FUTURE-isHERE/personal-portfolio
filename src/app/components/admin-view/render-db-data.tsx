import { controlsType, FormDataType } from "@/app/types";
import Image from "next/image";

const RenderDbData = ({
  data,
  controls,
  handleEdit,
  handleDeleteClick,
}: {
  data: FormDataType;
  controls: controlsType[];
  handleEdit: () => void;
  handleDeleteClick: () => void;
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6 my-5 flex flex-col md:flex-row items-start md:items-center justify-between border border-gray-200 transition-transform duration-300 hover:shadow-2xl hover:-translate-y-1">
      <div className="space-y-3 flex-grow">
        {controls.map((control) => (
          <p key={control.name} className="text-gray-800 text-md">
            <span className="font-semibold text-gray-700">
              {control.label}: 
            </span>
            &nbsp;&nbsp;{data[control.name]}
          </p>
        ))}
      </div>
      <div className="flex gap-4 mt-4 md:mt-0">
        <button
          onClick={handleEdit}
          title="Update Section"
          className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 transition-colors rounded-full p-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <Image
            src="/icons/updateicon.svg"
            alt="edit"
            width={20}
            height={20}
          />
        </button>

        <button
          onClick={handleDeleteClick}
          title="Delete Section"
          className="flex items-center justify-center bg-red-500 hover:bg-red-600 transition-colors rounded-full p-2 shadow-md focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <Image
            src="/icons/deleteicon.svg"
            alt="delete"
            width={20}
            height={20}
          />
        </button>
      </div>
    </div>
  );
};

export default RenderDbData;
