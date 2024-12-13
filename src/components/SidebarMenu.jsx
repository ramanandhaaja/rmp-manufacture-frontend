import React from "react";
import { ChevronDown, ChevronUp, NotepadText } from "lucide-react";
import { useLocation } from "react-router-dom";

const SidebarMenu = () => {
  const [openMenus, setOpenMenus] = React.useState([]);
  const [activeItem, setActiveItem] = React.useState("");
  const location = useLocation();

  React.useEffect(() => {
    const path = location.pathname;
    if (path.includes("/vendor-management/vendor")) {
      setActiveItem("vendor");
      setOpenMenus((prev) =>
        prev.includes("Vendor") ? prev : [...prev, "Vendor"]
      );
    }
    if (path.includes("/vendor-management/tipe-barang")) {
      setActiveItem("tipe-barang");
      setOpenMenus((prev) =>
        prev.includes("Vendor") ? prev : [...prev, "Vendor"]
      );
    }
    if (path.includes("/purchase-management/purchase-request")) {
      setActiveItem("purchase-request");
      setOpenMenus((prev) =>
        prev.includes("Purchase") ? prev : [...prev, "Purchase"]
      );
    }
    if (path.includes("/purchase-management/master-data-barang")) {
      setActiveItem("master-data-barang");
      setOpenMenus((prev) =>
        prev.includes("Purchase") ? prev : [...prev, "Purchase"]
      );
    }
  }, [location]);

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

        {/* Purchase Management */}

        <div className="w-full">
          <button
            onClick={() => toggleMenu("Purchase")}
            className="w-full flex items-center px-4 py-2.5 text-sm text-gray-400 hover:text-gray-600"
          >
            <span className="w-5 h-5 mr-2 opacity-70">
              <NotepadText size={18} />
            </span>
            <span className="flex-1 text-left">Purchase Management</span>
            <span className="opacity-50">
              {openMenus.includes("Purchase") ? (
                <ChevronUp size={14} />
              ) : (
                <ChevronDown size={14} />
              )}
            </span>
          </button>
          {openMenus.includes("Purchase") && (
            <div className="ml-12 space-y-2 py-1">
              <a
                href="/purchase-management/purchase-request"
                onClick={() => setActiveItem("purchase-request")}
                className={`block py-1.5 text-[14px] ${
                  activeItem === "purchase-request"
                    ? "text-blue-600 font-medium"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                Purchase Request
              </a>
              <a
                href="/purchase-management/master-data-barang"
                onClick={() => setActiveItem("master-data-barang")}
                className={`block py-1.5 text-[14px] ${
                  activeItem === "master-data-barang"
                    ? "text-blue-600 font-medium"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                Master Data Barang
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
                href="/vendor-management/vendor"
                onClick={() => setActiveItem("vendor")}
                className={`block py-1.5 text-[14px] ${
                  activeItem === "vendor"
                    ? "text-blue-600 font-medium"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                Vendor
              </a>

              <a
                href="/vendor-management/tipe-barang"
                onClick={() => setActiveItem("tipe-barang")}
                className={`block py-1.5 text-[14px] ${
                  activeItem === "tipe-barang"
                    ? "text-blue-600 font-medium"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                Tipe Barang
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
