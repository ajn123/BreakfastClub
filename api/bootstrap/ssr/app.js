import { jsx } from "react/jsx-runtime";
/* empty css     */
import axios from "axios";
import { createInertiaApp } from "@inertiajs/react";
import { hydrateRoot } from "react-dom/client";
window.axios = axios;
window.axios.defaults.withCredentials = true;
window.axios.defaults.withXSRFToken = true;
window.axios.defaults.baseURL = window.location.protocol === "https:" ? "https://" + window.location.hostname : "http://" + window.location.hostname;
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
async function resolvePageComponent(path, pages) {
  for (const p of Array.isArray(path) ? path : [path]) {
    const page = pages[p];
    if (typeof page === "undefined") {
      continue;
    }
    return typeof page === "function" ? page() : page;
  }
  throw new Error(`Page not found: ${path}`);
}
const appName = "Laravel";
createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => resolvePageComponent(
    `./Pages/${name}.tsx`,
    /* @__PURE__ */ Object.assign({ "./Pages/Auth/ConfirmPassword.tsx": () => import("./assets/ConfirmPassword-iIWZtHxa.js"), "./Pages/Auth/ForgotPassword.tsx": () => import("./assets/ForgotPassword-BcF0mVBO.js"), "./Pages/Auth/Login.tsx": () => import("./assets/Login-D7QL8aA3.js"), "./Pages/Auth/Register.tsx": () => import("./assets/Register-BRJKhDwj.js"), "./Pages/Auth/ResetPassword.tsx": () => import("./assets/ResetPassword-CYPvQCZl.js"), "./Pages/Auth/VerifyEmail.tsx": () => import("./assets/VerifyEmail-Ck03OSLM.js"), "./Pages/Dashboard.tsx": () => import("./assets/Dashboard-Dx7FnJt_.js"), "./Pages/Profile/Edit.tsx": () => import("./assets/Edit-CSdn_ee_.js"), "./Pages/Profile/Partials/DeleteUserForm.tsx": () => import("./assets/DeleteUserForm-CRyoRFsl.js"), "./Pages/Profile/Partials/UpdatePasswordForm.tsx": () => import("./assets/UpdatePasswordForm-J2SbID-Q.js"), "./Pages/Profile/Partials/UpdateProfileInformationForm.tsx": () => import("./assets/UpdateProfileInformationForm-CUeNOF2I.js"), "./Pages/Questionnaire/Index.tsx": () => import("./assets/Index-B4FEBdpP.js"), "./Pages/Questionnaire/QuestionAnswerForm.tsx": () => import("./assets/QuestionAnswerForm-BRWHUKPF.js"), "./Pages/Questionnaire/QuestionHeader.tsx": () => import("./assets/QuestionHeader-VJ8o7wOz.js"), "./Pages/Questionnaire/QuestionInterface.tsx": () => import("./assets/QuestionInterface-CUuQQxQh.js"), "./Pages/Welcome.tsx": () => import("./assets/Welcome-BWbbfirE.js") })
  ),
  setup({ el, App, props }) {
    {
      hydrateRoot(el, /* @__PURE__ */ jsx(App, { ...props }));
      return;
    }
  },
  progress: {
    color: "#465163"
  }
});
