import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {

      // Login/Registration
      "login":            "Login",
      "register":         "Register",
      "forgot_password":  "Forgot Password",
      "email":            "Email",
      "password":         "Password",
      "username":         "Username",
      "confirm_password": "Confirm Password",

      // Header Values
      "dashboard":     "Dashboard",

      // Tab Buttons
      "overview":      "Overview",
      "births":        "Births",
      "deaths":        "Deaths",
      "rainfall":      "Rainfall",
      "temperatures":  "Temperatures",
      "areas":         "Areas",
      "team":          "Team",

      // Overview Screen
      "overview_title":       "Overview",
      "births_by_breed":      "Births by Breed",
      "deaths_by_cause":      "Deaths by Cause",
      "rainfall_by_month":    "Rainfall by Month",
      "temperature_by_month": "Temperature by Month",

      // Screen Titles
      "births_title":      "Births",
      "births_add":        "Add Birth",
      "deaths_title":      "Deaths",
      "deaths_add":        "Add Death",
      "rainfall_title":    "Rainfall",
      "rainfall_add":      "Add Rainfall",
      "temperature_title": "Temperatures",
      "temperature_add":   "Add Temperature",
      "areas_title":       "Areas",
      "area_add":          "Add Area",
      "team_title":        "Team",
      "team_add":          "Add Team Member",

      // Table Titles
      "tag":          "Tag",
      "breed":        "Breed",
      "cause":        "Cause",
      "sex":          "Sex",
      "pure":         "Pure",
      "area":         "Area",
      "date":         "Date",
      "who":          "Who",
      "from":         "From",
      "amount":       "Amount",
      "temperature":  "Temperature",
      "nicknames":    "Nicknames",
      "name":         "Name",
      "phone_number": "Phone Number",

      // Buttons 
      "add_button":   "Add",
    }
  },
  pt: {
    translation: {

      // Login/Registration
      "login":            "Conecte-se",
      "register":         "Cadastre-se",
      "forgot_password":  "Esqueceu sua senha",
      "email":            "E-mail",
      "password":         "Senha",
      "username":         "Nome de usuário",
      "confirm_password": "Confirme sua senha",

      // Header Values
      "dashboard":     "Painel Da Web",

      // Tab Buttons
      "overview":      "Visão Geral",
      "births":        "Nascimentos",
      "deaths":        "Mortes",
      "rainfall":      "Chuvas",
      "temperatures":  "Temperaturas",
      "areas":         "Áreas",
      "team":          "Equipe",

      // Overview Screen
      "overview_title":       "Visão Geral",
      "births_by_breed":      "Nascimentos por Raça",
      "deaths_by_cause":      "Mortes por Causa",
      "rainfall_by_month":    "Precipitação por Mês",
      "temperature_by_month": "Temperatura por Mês",

      // Screen Titles
      "births_title":      "Nascimentos",
      "births_add":        "Adicionar Nascimento",
      "deaths_title":      "Mortes",
      "deaths_add":        "Adicionar Mortes",
      "rainfall_title":    "Chuvas",
      "rainfall_add":      "Adicionar Chuvas",
      "temperature_title": "Temperaturas",
      "temperature_add":   "Adicionar Temperatura",
      "areas_title":       "Áreas",
      "area_add":          "Adicionar Área",
      "team_title":        "Equipe",
      "team_add":          "Adicionar membro da Equipe",

      // Table Titles
      "tag":          "Marcação",
      "breed":        "Raça",
      "cause":        "Causa",
      "sex":          "Sexo",
      "pure":         "Pura",
      "area":         "Área",
      "date":         "Data",
      "who":          "Quem",
      "from":         "De",
      "amount":       "Quantia",
      "temperature":  "Temperatura",
      "nicknames":    "Apelidos",
      "name":         "Nome",
      "phone_number": "Número de Telefone",

      // Buttons 
      "add_button":   "Adicionar",
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
