const Tabs = ({ tabData, activeTab, setActiveTab }) => {
  return (
    <div className="mb-4">
      <div className="border-b border-gray-200 mb-4">
        <div className="flex gap-8">
          {tabData.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(tab.name)}
              className={`pb-2 ${
                activeTab === tab.name
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-400"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
