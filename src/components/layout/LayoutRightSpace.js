const LayoutRightSpace = ({ children, content }) => {
  return (
    <div className="flex mt-4">
      <div className="flex-1 mx-4">
        <div className="p-6 bg-white rounded-lg">{children}</div>
      </div>
      <div className="w-[200px] h-[100vh] ">{content}</div>
    </div>
  );
};
export default LayoutRightSpace;
