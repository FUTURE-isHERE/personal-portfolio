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
  selectedId: string | null;
  setSelectedId: React.Dispatch<React.SetStateAction<string | null>>;
  handleEdit: (sectionId: string) => void;
  handleAddSection: () => void;
};
const AdminContext = createContext<ContextType>({} as ContextType);

const initialHomeFormData: FormDataType[] = [];

const initialAboutData: FormDataType[] = [];

const initialEducationData: FormDataType[] = [];

const initialExperienceData: FormDataType[] = [];

const initialProjectsData: FormDataType[] = [];

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

  const handleSelectedTab = useCallback((tabId: string) => {
    setActiveTab(tabId);
  }, []);

  const handleAddSection = () => {
    const dataMap = {
      home: homeFormData,
      about: aboutData,
      education: educationData,
      experience: experienceData,
      projects: projectsData,
    };
    const stateData = dataMap[activeTab as keyof typeof dataMap];
    if (isUpdating) {
      setIsUpdating(false);
      setSelectedId(null);
    }
    if (stateData.length !== 0) {
      setIsAddingNewSection(true);
      setIsUpdating(false);
    }
  };

  const handleEdit = (sectionId: string) => {
    setSelectedId(sectionId);
    setIsUpdating(true);
  };

  const handleSaveData = async (currentTab: string, data: FormDataType) => {
    let response;

    if (selectedId && isUpdating) {
      response = await updateData(currentTab, selectedId, data);
      setIsUpdating(false);
      setSelectedId(null);
    } else {
      response = await addData(currentTab, data);
    }

    if (response?.success) {
      extractDataFromDb(currentTab);
      setIsAddingNewSection(false);
    }
  };
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

    if (data) {
      setAllData({
        ...allData,
        [currentTab]: data.data,
      });
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
    setIsAddingNewSection(false);
    extractDataFromDb(activeTab);
  }, [activeTab]);
  useEffect(() => {
    if (!isModalOpen || !isUpdating) {
      setIsAddingNewSection(false);
    }
  }, [isModalOpen, isUpdating]);

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
      selectedId,
      setSelectedId,
      handleEdit,
      handleAddSection,
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
      isAddingNewSection,
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
