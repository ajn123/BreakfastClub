import { jsx, jsxs } from "react/jsx-runtime";
import { useForm, Head } from "@inertiajs/react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QuestionAnswerForm from "./QuestionAnswerForm-BRWHUKPF.js";
import { A as Authenticated } from "./AuthenticatedLayout-nijE6zx6.js";
import "./QuestionHeader-VJ8o7wOz.js";
import "./QuestionInterface-CUuQQxQh.js";
import "@headlessui/react";
function Questionnaire({ initialQuestions }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState(initialQuestions);
  const [submissionErrors, setSubmissionErrors] = useState({});
  const { data, setData, post, processing, errors } = useForm({
    answers: initialQuestions.map((q) => ({
      question_id: q.id,
      answer: q.type === "time" ? "09:00" : "",
      options: []
    }))
  });
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmit();
    }
  };
  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  const handleSubmit = () => {
    post(route("question-answers.store"), {
      onError: (errors2) => {
        console.error("Submission errors:", errors2);
      }
    });
  };
  return /* @__PURE__ */ jsx(Authenticated, { children: /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50", children: [
    /* @__PURE__ */ jsx(Head, { title: "Questionnaire - The Breakfast Club" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-4 py-12", children: [
      questions.length > 0 && /* @__PURE__ */ jsxs(
        motion.div,
        {
          className: "text-center mb-6 text-2xl font-bold text-orange-500",
          initial: { x: 20, opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: -20, opacity: 0 },
          transition: { duration: 0.3 },
          children: [
            "Question ",
            currentQuestionIndex + 1,
            " of ",
            questions.length
          ]
        },
        currentQuestionIndex
      ),
      /* @__PURE__ */ jsx("div", { className: "flex justify-center gap-2 mb-8", children: questions.length > 0 && questions.map((_, index) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setCurrentQuestionIndex(index),
          className: `w-[30px] h-[30px] rounded-full transition-colors flex items-center justify-center text-sm font-medium ${index === currentQuestionIndex ? "bg-orange-500 text-white" : "bg-orange-200 hover:bg-orange-300 text-gray-700"}`,
          "aria-label": `Go to question ${index + 1}`,
          children: index + 1
        },
        index
      )) }),
      Object.keys(submissionErrors).length > 0 && /* @__PURE__ */ jsxs("div", { className: "mb-8 bg-red-50 border-2 border-red-200 rounded-lg p-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-red-700 font-semibold mb-2", children: "Please correct the following errors:" }),
        /* @__PURE__ */ jsx("ul", { className: "list-disc list-inside text-red-600", children: "Fill out all questions to complete your profile." })
      ] }),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          className: "h-1 bg-orange-200 rounded-full mb-12",
          initial: { width: "0%" },
          children: /* @__PURE__ */ jsx(
            motion.div,
            {
              className: "h-1 bg-orange-500 rounded-full",
              animate: { width: `${(currentQuestionIndex + 1) / questions.length * 100}%` }
            }
          )
        }
      ),
      /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: 20 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: -20 },
          transition: { duration: 0.3 },
          className: "bg-white rounded-2xl shadow-xl p-8",
          children: [
            questions.length > 0 && /* @__PURE__ */ jsx(
              QuestionAnswerForm,
              {
                questions,
                currentQuestionIndex,
                data,
                setData,
                handleBack,
                handleNext,
                processing
              }
            ),
            questions.length == 0 && /* @__PURE__ */ jsx("div", { className: "mb-8 text-center", children: /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-gray-900 mb-2", children: "No questions found" }) })
          ]
        },
        currentQuestionIndex
      ) })
    ] })
  ] }) });
}
export {
  Questionnaire as default
};
