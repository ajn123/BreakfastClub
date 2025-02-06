import { jsxs, jsx } from "react/jsx-runtime";
function QuestionHeader({ question }) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-gray-900 mb-2", children: question.title }),
    /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: question.subtitle })
  ] });
}
export {
  QuestionHeader as default
};
