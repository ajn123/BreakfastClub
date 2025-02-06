import { jsx, jsxs } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-nijE6zx6.js";
import { motion } from "framer-motion";
import { Link } from "@inertiajs/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import "@headlessui/react";
import "react";
function Dashboard({ auth, hasCompletedQuestions, toast }) {
  return /* @__PURE__ */ jsx(
    Authenticated,
    {
      children: /* @__PURE__ */ jsxs("div", { className: "py-12", children: [
        toast && /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            transition: { duration: 0.9 },
            className: "py-4 px-6 m-12 mx-auto max-w-5xl p-4 bg-green-100 text-green-800 border-l-4 border-green-500 rounded-lg shadow-lg toast",
            children: /* @__PURE__ */ jsx("button", { onClick: () => {
              const toastElement = document.querySelector(".toast");
              if (toastElement) {
                toastElement.classList.add("opacity-0");
                setTimeout(() => {
                  toastElement.classList.add("hidden");
                }, 0);
              }
            }, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
              /* @__PURE__ */ jsx(XMarkIcon, { className: "w-6 h-6" }),
              /* @__PURE__ */ jsx("p", { className: "text-lg font-semibold", children: toast.message })
            ] }) })
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6", children: [
          /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              className: "bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg",
              children: /* @__PURE__ */ jsxs("div", { className: "p-6 text-center", children: [
                /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-orange-600 mb-4", children: "Welcome to Touch Grass DC" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-300", children: "Your next adventure awaits!" })
              ] })
            }
          ),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.2 },
              className: "grid grid-cols-1 md:grid-cols-3 gap-6",
              children: !hasCompletedQuestions && /* @__PURE__ */ jsx(
                Link,
                {
                  href: route("question-answers.index"),
                  className: "bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg hover:shadow-lg transition",
                  children: /* @__PURE__ */ jsx("div", { className: "p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-orange-100 dark:bg-orange-900/50 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6 text-orange-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" }) }) }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900 dark:text-gray-100", children: "Complete Profile" }),
                      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Fill out your questionnaire" })
                    ] })
                  ] }) })
                }
              )
            }
          ),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.4 },
              className: "bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg",
              children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
                /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4", children: "Featured Events" }),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-8", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-gray-500 dark:text-gray-400 text-center mb-2", children: "No events scheduled yet" }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 dark:text-gray-500 text-center", children: "Check back soon for upcoming events!" })
                ] })
              ] })
            }
          ),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.6 },
              className: "grid grid-cols-1 md:grid-cols-3 gap-6"
            }
          )
        ] })
      ] })
    }
  );
}
export {
  Dashboard as default
};
