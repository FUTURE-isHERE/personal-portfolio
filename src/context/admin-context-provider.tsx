"use client";

import { FormDataType } from "@/app/types";
import { addData, deleteData, getData, updateData } from "@/services";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type ContextType = {
  activeTab: string;
  handleSelectedTab: (tabId: string) => void;
  homeFormData: FormDataType[];
  aboutData: FormDataType[];
  educationData: FormDataType[];
  experienceData: FormDataType[];
  projectsData: FormDataType[];
  allData: { [key: string]: FormDataType[] };
  isUpdating: boolean;
  setHomeFormData: React.Dispatch<React.SetStateAction<FormDataType[]>>;
  setAboutData: React.Dispatch<React.SetStateAction<FormDataType[]>>;
  setEducationData: React.Dispatch<React.SetStateAction<FormDataType[]>>;
  setExperienceData: React.Dispatch<React.SetStateAction<FormDataType[]>>;
  setProjectsData: React.Dispatch<React.SetStateAction<FormDataType[]>>;
  handleSaveData: (
    currentTab: string,
    data: FormDataType,
    isUpdatingFields?: boolean
  ) => Promise<void>;
  resetFormData: () => void;
  setIsUpdating: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteClick: (id: string) => void;
  handleConfirmDelete: () => Promise<void>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isAddingNewSection: boolean;
  setIsAddingNewSection: React.Dispatch<React.SetStateAction<boolean>>;
};
const AdminContext = createContext<ContextType>({} as ContextType);

const initialHomeFormData: FormDataType[] = [];

const initialAboutData: FormDataType[] = [
  {
    aboutme: "",
    noofprojects: "",
    yearofexperience: "",
    skills: "",
  },
];

const initialEducationData: FormDataType[] = [
  { degree: "", year: "", college: "" },
];

const initialExperienceData: FormDataType[] = [];

const initialProjectsData: FormDataType[] = [
  { name: "", description: "", stack: "", website: "", github: "" },
];

const AdminContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [homeFormData, setHomeFormData] = useState(initialHomeFormData);
  const [aboutData, setAboutData] = useState(initialAboutData);
  const [educationData, setEducationData] = useState(initialEducationData);
  const [experienceData, setExperienceData] = useState(initialExperienceData);
  const [projectsData, setProjectsData] = useState(initialProjectsData);
  const [allData, setAllData] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isAddingNewSection, setIsAddingNewSection] = useState(false);

  console.log("homeFormData", homeFormData);
  // console.log("aboutData", aboutData);
  // console.log("educationData", educationData);
  console.log("experienceData", experienceData);
  // console.log("projectsData", projectsData);

  const handleSelectedTab = useCallback((tabId: string) => {
    setActiveTab(tabId);
  }, []);

  const extractDataFromDb = async (currentTab: string) => {
    const data = await getData(currentTab);

    const setterMap = {
      home: setHomeFormData,
      about: setAboutData,
      education: setEducationData,
      experience: setExperienceData,
      projects: setProjectsData,
    };

    if (data.data?.length) {
      const setter = setterMap[currentTab as keyof typeof setterMap];

      if (setter) {
        setter(data.data);
      }
    }

    // if (currentTab === "home" && data?.data?.length) {
    //   setHomeFormData(data.data[0]);
    // }
    if (data) {
      setAllData({
        ...allData,
        [currentTab]: data.data,
      });
    }
  };

  const handleSaveData = async (
    currentTab: string,
    data: FormDataType,
    isUpdatingFields?: boolean
  ) => {
    const dataMap = {
      home: homeFormData,
      about: aboutData,
      education: educationData,
      experience: experienceData,
      projects: projectsData,
    };

    const dataToSave = dataMap[currentTab as keyof typeof dataMap];
    console.log("dataToSave", dataToSave);

    const response = await addData(currentTab, data);

    if (isUpdating) {
      setIsUpdating(false);
    }

    if (response?.success) {
      // resetFormData();
      extractDataFromDb(currentTab);
      setIsAddingNewSection(false);
    }
  };

  const resetFormData = () => {
    setHomeFormData(initialHomeFormData);
    setAboutData(initialAboutData);
    setEducationData(initialEducationData);
    setExperienceData(initialExperienceData);
    setProjectsData(initialProjectsData);
  };

  const handleDeleteClick = (id: string) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedId) return;
    const result = await deleteData(activeTab, selectedId);
    setIsModalOpen(false);
    setSelectedId(null);
    if (result.success) {
      resetFormData();
      await extractDataFromDb(activeTab);
    }
  };

  useEffect(() => {
    setIsUpdating(false);
    extractDataFromDb(activeTab);
  }, [activeTab]);

  const value = useMemo(
    () => ({
      activeTab,
      homeFormData,
      aboutData,
      educationData,
      experienceData,
      projectsData,
      allData,
      isUpdating,
      setAboutData,
      setEducationData,
      setExperienceData: setExperienceData,
      setProjectsData,
      handleSelectedTab,
      setHomeFormData,
      handleSaveData,
      resetFormData,
      setIsUpdating,
      handleDeleteClick,
      handleConfirmDelete,
      isModalOpen,
      setIsModalOpen,
      isAddingNewSection,
      setIsAddingNewSection,
    }),
    [
      activeTab,
      handleSelectedTab,
      homeFormData,
      aboutData,
      educationData,
      experienceData,
      projectsData,
      isUpdating,
      allData,
      isModalOpen,
    ]
  );
  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

const useAdminContextProvider = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error(
      "useAdminContextProvider must be used within AdminProvider"
    );
  }
  return context;
};

export { AdminContextProvider, useAdminContextProvider };
