function Button({ onClick, type, disabled, children, className }) {
  return (
    <button
      disabled={disabled || false}
      onClick={onClick}
      type={type}
      className={`${className} text-white uppercase bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-10 py-2.5 me-2  dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 disabled:bg-stone-400 `}
    >
      {children}
    </button>
  );
}

export default Button;
