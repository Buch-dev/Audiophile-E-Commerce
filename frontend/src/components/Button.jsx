const Button = ({ children, ...props }) => {
  return (
    <button
      className="bg-[#D87D4A] hover:bg-[#FBAF85] cursor-pointer text-white py-[15px] px-[30px] text-[13px] font-bold tracking-[0.08em] transition-all duration-300 hover:shadow-[0_0_20px_rgba(216,125,74,0.6)]"
      {...props}
    >
      {children || "SEE PRODUCT"}
    </button>
  );
};

export default Button;
