export type menuListType = {
  id: string;
  label: string;
  component: React.ReactNode;
};

export type controlsType = {
  name: string;
  placeholder: string;
  type: string;
  label: string;
};

export type homeFormDataType = {
  heading: string;
  summary: string;
};

export type aboutDataType = {
  aboutme: string;
  noofprofects: string;
  yearofexperience: string;
  skills: string;
};

export type educationDataType = {
  degree: string;
  year: string;
  college: string;
};

export type experienceDataType = {
  position: string;
  company: string;
  duration: string;
  location: string;
  jobprofile: string;
};

export type projectDataType = {
  name: string;
  description: string;
  stack: string;
  website: string;
  github: string;
};
