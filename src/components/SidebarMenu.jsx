import React from "react";
import { ChevronDown, ChevronUp, NotepadText } from "lucide-react";

const SidebarMenu = () => {
  const [openMenus, setOpenMenus] = React.useState(["R&D"]);
  const [activeItem, setActiveItem] = React.useState("Prosedur");

  const toggleMenu = (menu) => {
    setOpenMenus((prev) =>
      prev.includes(menu)
        ? prev.filter((item) => item !== menu)
        : [...prev, menu]
    );
  };

  return (
    <nav className="w-60 min-h-screen py-8">
      <div className="space-y-1">
        {/* Target */}
        <div className="w-full">
          <button className="w-full flex items-center px-4 py-2.5 text-sm text-gray-400 hover:text-gray-600">
            <span className="w-5 h-5 mr-3 opacity-70">
              <NotepadText size={18} />
            </span>
            <span className="flex-1 text-left">Target</span>
          </button>
        </div>

        {/* Jadwal */}
        <div className="w-full">
          <button className="w-full flex items-center px-4 py-2.5 text-sm text-gray-400 hover:text-gray-600">
            <span className="w-5 h-5 mr-2 opacity-70">
              <NotepadText size={18} />
            </span>
            <span className="flex-1 text-left">Jadwal</span>
          </button>
        </div>

        {/* Monitoring */}
        <div className="w-full">
          <button className="w-full flex items-center px-4 py-2.5 text-sm text-gray-400 hover:text-gray-600">
            <span className="w-5 h-5 mr-2 opacity-70">
              <NotepadText size={18} />
            </span>
            <span className="flex-1 text-left">Monitoring</span>
            <span className="opacity-50">
              <ChevronDown size={14} />
            </span>
          </button>
        </div>

        {/* QA */}
        <div className="w-full">
          <button className="w-full flex items-center px-4 py-2.5 text-sm text-gray-400 hover:text-gray-600">
            <span className="w-5 h-5 mr-2 opacity-70">
              <NotepadText size={18} />
            </span>
            <span className="flex-1 text-left">QA</span>
            <span className="opacity-50">
              <ChevronDown size={14} />
            </span>
          </button>
        </div>

        {/* QC */}
        <div className="w-full">
          <button className="w-full flex items-center px-4 py-2.5 text-sm text-gray-400 hover:text-gray-600">
            <span className="w-5 h-5 mr-2 opacity-70">
              <NotepadText size={18} />
            </span>
            <span className="flex-1 text-left">QC</span>
            <span className="opacity-50">
              <ChevronDown size={14} />
            </span>
          </button>
        </div>

        {/* R&D */}
        <div className="w-full">
          <button
            onClick={() => toggleMenu("R&D")}
            className="w-full flex items-center px-4 py-2.5 text-sm text-gray-400 hover:text-gray-600"
          >
            <span className="w-5 h-5 mr-2 opacity-70">
              <NotepadText size={18} />
            </span>
            <span className="flex-1 text-left">R&D</span>
            <span className="opacity-50">
              {openMenus.includes("R&D") ? (
                <ChevronUp size={14} />
              ) : (
                <ChevronDown size={14} />
              )}
            </span>
          </button>
          {openMenus.includes("R&D") && (
            <div className="ml-12 space-y-2 py-1">
              <a
                href="#"
                className="block py-1.5 text-gray-400 hover:text-gray-600 text-[14px]"
              >
                Formulasi
              </a>
              <a
                href="#"
                className="block py-1.5 text-gray-400 hover:text-gray-600 text-[14px]"
              >
                Prosedur
              </a>
              <a
                href="#"
                className="block py-1.5 text-gray-400 hover:text-gray-600 text-[14px]"
              >
                Material
              </a>
            </div>
          )}
        </div>

        {/* Vendor Management */}

        <div className="w-full">
          <button
            onClick={() => toggleMenu("Vendor")}
            className="w-full flex items-center px-4 py-2.5 text-sm text-gray-400 hover:text-gray-600"
          >
            <span className="w-5 h-5 mr-2 opacity-70">
              <NotepadText size={18} />
            </span>
            <span className="flex-1 text-left">Vendor Management</span>
            <span className="opacity-50">
              {openMenus.includes("Vendor") ? (
                <ChevronUp size={14} />
              ) : (
                <ChevronDown size={14} />
              )}
            </span>
          </button>
          {openMenus.includes("Vendor") && (
            <div className="ml-12 space-y-2 py-1">
              <a
                href="/vendor-management/vendor-list"
                className="block py-1.5 text-gray-400 hover:text-gray-600 text-[14px]"
              >
                Vendor List
              </a>
              <a
                href="#"
                className="block py-1.5 text-gray-400 hover:text-gray-600 text-[14px]"
              >
                Add Vendor
              </a>
            </div>
          )}
        </div>

        {/* Pemeliharaan */}
        <div className="w-full">
          <button className="w-full flex items-center px-4 py-2.5 text-sm text-gray-400 hover:text-gray-600">
            <span className="w-5 h-5 mr-2 opacity-70">
              <NotepadText size={18} />
            </span>
            <span className="flex-1 text-left">Pemeliharaan</span>
            <span className="opacity-50">
              <ChevronDown size={14} />
            </span>
          </button>
        </div>

        {/* Produksi */}
        <div className="w-full">
          <button className="w-full flex items-center px-4 py-2.5 text-sm text-gray-400 hover:text-gray-600">
            <span className="w-5 h-5 mr-2 opacity-70">
              <NotepadText size={18} />
            </span>
            <span className="flex-1 text-left">Produksi</span>
            <span className="opacity-50">
              <ChevronDown size={14} />
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default SidebarMenu;
