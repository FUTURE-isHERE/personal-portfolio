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
    <div className="bg-gray-200 shadow-lg rounded-md flex justify-between">
      <div className="space-y-2 p-8">
        {controls.map((control) => (
          <p key={control.name}>
            {control.label}: {data[control.name]}
          </p>
        ))}
      </div>

      <div className="relative flex gap-4 top-2 right-3 h-fit w-fit">
        <button onClick={handleEdit}>
          <Image
            src="/icons/updateicon.svg"
            alt="edit"
            width={20}
            height={20}
          />
        </button>

        <button onClick={handleDeleteClick}>
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