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

export interface FormDataType {
  [key: string]: string;
}
