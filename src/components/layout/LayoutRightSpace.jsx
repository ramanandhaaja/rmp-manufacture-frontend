import CMSHeader from "../CMSHeader";
import SidebarMenu from "../SidebarMenu";

const LayoutRightSpace = ({ children, content }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[calc(100%-20px)] mx-auto">
        <CMSHeader />
        <div className="flex mt-4">
          <SidebarMenu />
          <div className="flex-1 mx-4">
            <div className="p-6 bg-white rounded-lg">{children}</div>
          </div>
          <div className="w-[200px] rounded-lg p-4">{content}</div>
        </div>
      </div>
    </div>
  );
};

export default LayoutRightSpace;
