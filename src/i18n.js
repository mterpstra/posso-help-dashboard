import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      "dashboard": "Dashboard (en)"
    }
  },
  pt: {
    translation: {
      "dashboard": "Dashboard (pt)"
    }
  }
};

const getLang = () => {
  console.log("getLang()", navigator.language);

  const user = localStorage.getItem('zapmanejo_user');
  if ((user === null) || (user === undefined)) {
    console.log("no user, using browser default language");
    return navigator.language;
  }

  const juser = JSON.parse(user);
  if ((juser.lang === "en-US") || (juser.lang === "pt-BR")) {
    console.log("user lang found, using", juser.lang);
    return juser.lang;
  }

  console.log("using default browser language")
  return navigator.language;
}

i18n
  .use(initReactI18next) 
  .init({
    resources,
    lng: getLang(),
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
