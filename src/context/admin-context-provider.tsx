"use client";

import {
  aboutDataType,
  educationDataType,
  experienceDataType,
  homeFormDataType,
  projectDataType,
} from "@/app/types";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type ContextType = {
  activeTab: string;
  handleSelectedTab: (tabId: string) => void;
  homeFormData: homeFormDataType;
  aboutData: aboutDataType;
  educationData: educationDataType;
  experienceData: experienceDataType;
  projectsData: projectDataType;
  setHomeFormData: React.Dispatch<React.SetStateAction<homeFormDataType>>;
  setAboutData: React.Dispatch<React.SetStateAction<aboutDataType>>;
  setEducationData: React.Dispatch<React.SetStateAction<educationDataType>>;
  setExperienceData: React.Dispatch<React.SetStateAction<experienceDataType>>;
  setProjectsData: React.Dispatch<React.SetStateAction<projectDataType>>;
};
const AdminContext = createContext<ContextType>({} as ContextType);

const initialHomeFormData: homeFormDataType = {
  heading: "",
  summary: "",
};

const initialAboutData: aboutDataType = {
  aboutme: "",
  noofprofects: "",
  yearofexperience: "",
  skills: "",
};

const initialEducationData: educationDataType = {
  degree: "",
  year: "",
  college: "",
};

const initialExperienceData: experienceDataType = {
  position: "",
  company: "",
  duration: "",
  location: "",
  jobprofile: "",
};

const initialProjectsData: projectDataType = {
  name: "",
  description: "",
  stack: "",
  website: "",
  github: "",
};
const AdminContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [homeFormData, setHomeFormData] = useState(initialHomeFormData);
  const [aboutData, setAboutData] = useState(initialAboutData);
  const [educationData, setEducationData] = useState(initialEducationData);
  const [experienceData, setExperienceData] = useState(initialExperienceData);
  const [projectsData, setProjectsData] = useState(initialProjectsData);

  const handleSelectedTab = useCallback((tabId: string) => {
    setActiveTab(tabId);
  }, []);

  const value = useMemo(
    () => ({
      activeTab,
      homeFormData,
      aboutData,
      educationData,
      experienceData,
      projectsData,
      setAboutData,
      setEducationData,
      setExperienceData,
      setProjectsData,
      handleSelectedTab,
      setHomeFormData,
    }),
    [activeTab, handleSelectedTab, homeFormData, aboutData, educationData, experienceData, projectsData]
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
