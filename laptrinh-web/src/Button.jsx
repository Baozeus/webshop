function Button({ children, className, ...rest }) {
  return (
    <button
      className={` px-8 py-3 cursor-pointer ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
export default Button;