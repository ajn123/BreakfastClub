import { jsx, jsxs } from "react/jsx-runtime";
function QuestionInterface({ question, data, setData }) {
  var _a, _b;
  switch (question.type) {
    case "select":
      return /* @__PURE__ */ jsx("div", { className: "space-y-4", children: question.options.map((option) => {
        var _a2;
        return /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => {
              const currentAnswer = data.answers.find((a) => a.question_id === question.id);
              if (currentAnswer) {
                const newOptions = currentAnswer.options.includes(option.value) ? currentAnswer.options.filter((item) => item !== option.value) : [...currentAnswer.options, option.value];
                setData("answers", data.answers.map(
                  (a) => a.question_id === question.id ? { ...a, options: newOptions } : a
                ));
              }
            },
            className: `w-full p-4 rounded-lg text-left transition-all
                                    ${((_a2 = data.answers.find((a) => a.question_id === question.id)) == null ? void 0 : _a2.options.includes(option.value)) ? "bg-orange-100 text-orange-700 border-2 border-orange-500" : "bg-white text-gray-600 border-2 border-transparent hover:bg-orange-50"}`,
            children: option.label
          },
          option.value
        );
      }) });
    case "scale":
      return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsx("div", { className: "flex justify-between px-8", children: [1, 2, 3, 4, 5].map((value) => {
          var _a2;
          return /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setData("answers", data.answers.map(
                (a) => a.question_id === question.id ? { ...a, answer: value.toString() } : a
              )),
              className: `w-16 h-16 rounded-full flex items-center justify-center text-xl font-semibold transition-all
                                        ${((_a2 = data.answers.find((a) => a.question_id === question.id)) == null ? void 0 : _a2.answer) === value.toString() ? "bg-orange-500 text-white" : "bg-white text-gray-600 hover:bg-orange-100"}`,
              children: value
            },
            value
          );
        }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between px-6 text-sm text-gray-500", children: [
          /* @__PURE__ */ jsx("span", { children: question.labels[1] }),
          /* @__PURE__ */ jsx("span", { children: question.labels[3] }),
          /* @__PURE__ */ jsx("span", { children: question.labels[5] })
        ] })
      ] });
    case "multiSelect":
      return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-3", children: question.options.map((option) => {
        var _a2;
        return /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => {
              const currentAnswer = data.answers.find((a) => a.question_id === question.id);
              if (currentAnswer) {
                const newOptions = currentAnswer.options.includes(option) ? currentAnswer.options.filter((item) => item !== option) : [...currentAnswer.options, option];
                setData("answers", data.answers.map(
                  (a) => a.question_id === question.id ? { ...a, options: newOptions } : a
                ));
              }
            },
            className: `p-4 rounded-lg text-left transition-all
                                    ${((_a2 = data.answers.find((a) => a.question_id === question.id)) == null ? void 0 : _a2.options.includes(option)) ? "bg-orange-100 text-orange-700 border-2 border-orange-500" : "bg-white text-gray-600 border-2 border-transparent hover:bg-orange-200 hover:text-black"}`,
            children: option
          },
          option
        );
      }) });
    case "time":
      return /* @__PURE__ */ jsx(
        "input",
        {
          type: "time",
          value: ((_a = data.answers.find((a) => a.question_id === question.id)) == null ? void 0 : _a.answer) || "09:00",
          onChange: (e) => setData("answers", data.answers.map(
            (a) => a.question_id === question.id ? { ...a, answer: e.target.value } : a
          )),
          className: "w-full p-4 text-2xl text-center bg-white rounded-lg border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
        }
      );
    case "text":
      return /* @__PURE__ */ jsx(
        "textarea",
        {
          value: ((_b = data.answers.find((a) => a.question_id === question.id)) == null ? void 0 : _b.answer) || "",
          onChange: (e) => setData("answers", data.answers.map(
            (a) => a.question_id === question.id ? { ...a, answer: e.target.value } : a
          )),
          className: "w-full h-32 p-4 bg-white rounded-lg border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200",
          placeholder: "Type your answer here..."
        }
      );
  }
}
export {
  QuestionInterface as default
};
