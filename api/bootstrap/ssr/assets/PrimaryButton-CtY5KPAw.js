import { jsx } from "react/jsx-runtime";
function PrimaryButton({
  className = "",
  disabled,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...props,
      className: `inline-flex items-center rounded-md border border-transparent bg-white px-4 py-2 text-md font-semibold uppercase tracking-widest text-orange-500 transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 dark:white dark:text-orange-500 dark:focus:bg-white dark:focus:ring-offset-gray-800 dark:active:bg-gray-300 hover:bg-orange-50 transform hover:scale-105 transition shadow-lg hover:shadow-xl
                ${disabled && "opacity-25"} ` + className,
      disabled,
      children
    }
  );
}
export {
  PrimaryButton as P
};
