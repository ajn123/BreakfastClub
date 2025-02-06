import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import QuestionHeader from "./QuestionHeader-VJ8o7wOz.js";
import QuestionInterface from "./QuestionInterface-CUuQQxQh.js";
function QuestionAnswerForm({ questions, currentQuestionIndex, data, setData, handleBack, handleNext, processing }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(QuestionHeader, { question: questions[currentQuestionIndex] }),
    /* @__PURE__ */ jsx("div", { className: "mb-8", children: /* @__PURE__ */ jsx(QuestionInterface, { question: questions[currentQuestionIndex], data, setData }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleBack,
          disabled: currentQuestionIndex === 0,
          className: "px-6 py-3 text-orange-500 disabled:opacity-50 disabled:cursor-not-allowed",
          children: "Back"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleNext,
          disabled: processing,
          className: "px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed",
          children: currentQuestionIndex === questions.length - 1 ? "Complete" : "Next"
        }
      )
    ] })
  ] });
}
export {
  QuestionAnswerForm as default
};
