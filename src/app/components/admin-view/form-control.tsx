import { controlsType } from "@/app/types";
import React from "react";

// @ts-ignore
function FormControl({ controls, formData, setFormData }) {

  return (
    <div className="space-y-4">
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
            value={formData[controlItem.name]}
            id={controlItem.name}
            onChange={(e) =>
              setFormData({ ...formData, [controlItem.name]: e.target.value })
            }
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-300"
          />
        </div>
      ))}
    </div>
  );
}

export default FormControl;
