import { FormDataType } from "@/app/types";

export async function addData(currentTab: string, formData: FormDataType) {
  try {
    const response = await fetch(`/api/${currentTab}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function getData(currentTab: string) {
  try {
    const response = await fetch(`/api/${currentTab}`);
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function updateData(currentTab: string, formData: FormDataType) {
  try {
    const response = await fetch(`/api/${currentTab}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function deleteData(currentTab: string, id: string){
  try {
    const response = await fetch(`/api/${currentTab}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id}),
    });
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}