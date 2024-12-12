const Button = ({ title, onClick, color }) => {
  return (
    <button
      className={` text-white text-sm py-2 px-4 rounded ${color}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};
export default Button;
