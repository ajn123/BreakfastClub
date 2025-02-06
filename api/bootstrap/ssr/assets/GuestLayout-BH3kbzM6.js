import { jsx } from "react/jsx-runtime";
function Guest({ children }) {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen flex-col items-center  pt-6 sm:justify-center sm:pt-0 orange-body", children: /* @__PURE__ */ jsx("div", { className: "mt-6 w-full overflow-hidden px-6 py-4 shadow-xl sm:max-w-md sm:rounded-lg orange-body-dark", children }) });
}
export {
  Guest as G
};
