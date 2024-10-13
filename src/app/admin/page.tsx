"use client";

import About from "../components/admin-view/about";
import Contact from "../components/admin-view/contact";
import Education from "../components/admin-view/education";
import Experience from "../components/admin-view/experience";
import Projects from "../components/admin-view/projects";
import Home from "../components/admin-view/home";
import { useAdminContextProvider } from "@/context/admin-context-provider";
import { menuListType } from "../types";

function Page() {
  const { activeTab, handleSelectedTab } = useAdminContextProvider();

  const menuList: menuListType[] = [
    {
      id: "home",
      label: "Home",
      component: <Home />,
    },
    {
      id: "about",
      label: "about",
      component: <About />,
    },
    {
      id: "experience",
      label: "Experience",
      component: <Experience />,
    },
    {
      id: "projects",
      label: "Projects",
      component: <Projects />,
    },
    {
      id: "education",
      label: "Education",
      component: <Education />,
    },
    {
      id: "contact",
      label: "Contact",
      component: <Contact />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      <nav className="flex justify-center space-x-14 bg-gray-800 p-4 shadow-lg">
        {menuList.map((item: menuListType) => (
          <button
            key={item.id}
            onClick={() => handleSelectedTab(item.id)}
            className={`px-4 py-2 text-white font-semibold transition-colors duration-300 rounded-lg ${
              activeTab === item.id
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-8 p-6 bg-white shadow-lg rounded-lg ">
        {
          menuList.find((item: menuListType) => item.id === activeTab)
            ?.component
        }
      </div>
    </div>

  );
}

export default Page;
