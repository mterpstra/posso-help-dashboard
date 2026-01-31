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
      "password_requirements": "Password must be contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character.",

      // Header Values
      "dashboard":     "Dashboard",

      // Tab Buttons
      "overview":      "Overview",
      "births":        "Herd",
      "deaths":        "Deaths",
      "rain":          "Rain",
      "temperatures":  "Temperatures",
      "areas":         "Areas",
      "reproduction":  "Reproduction",
      "team":          "Team",

      // Overview Screen
      "overview_title":       "Overview",
      "herd_by_breed":        "Herd by Breed",
      "herd_by_cause_of_death":  "Deaths by Cause",
      "rainfall_by_month":    "Rainfall by Month",
      "temperature_by_month": "Average Temperature by Month",
      "all":                  "All",
      "age_category":         "Calves Weaning off Milk",
      "seven_months":         "7 months",
      "eight_months":         "8 months",
      "nine_months":          "9 months",
      "ten_twelve_months":    "10-12 months",
      "not_started":          "Not Started",
      "in_progress":          "In Progress",
      "not_pregnant":         "Not Pregnant",
      "pregnancy_abort":      "Pregnancy and Abortion",
      "pregnancy_birth":      "Pregnancy and Birth",

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

      // Search
      "find_tag":     "Find tag...",

      // Table Titles
      "tag":          "Tag",
      "breed":        "Breed",
      "cause":        "Situation",
      "sex":          "Sex",
      "age":          "Age",
      "area":         "Area",
      "birth_date":   "Date",
      "date":         "Date",
      "who":          "Who",
      "from":         "From",
      "amount":       "Amount",
      "temperature":  "Temperature",
      "nickname":     "Nickname",
      "nicknames":    "Nicknames",
      "name":         "Name",
      "phone_number": "Phone Number",
      "protocol_name":"Protocol",
      "start_date":   "Start Date",
      "current_day":  "Current Day",
      "predicted_iatf":"Predicted IATF",
      "status":       "Days Completed",
      "notes":        "Notes",
      "language":     "Language",

      // Buttons 
      "add_button":   "Add",

      // Reproduction
      "hide-protocol-view": "Hide Protocol View",
      "show-protocol-view": "Show Protocol View",
      "hide-notes-view":    "Hide Notes View",
      "show-notes-view":    "Show Notes View",
      "reproduction-results-for-month":"Inseminations for",
      "iatf-success-rate-by-group":"IATF Success by Group",
      "birth-rate-percentage":"Birth Rate Percentage",


      "treatments": "Treatments",
      "medication": "Medication",
      "device":     "Device",
      "proceedure": "Proceedure",
      "notes":      "Notes",

      // Breeds
      "angus":         "Angus",
      "brangus":       "Brangus",
      "cruzada":       "Cruzada",
      "nelore":        "Nelore",
      "sta_zelia":     "Sta. Zelia",
      "murrah":        "Murrah",
      "mediterrâneo":  "Mediterrâneo",
      "jafarabadi":    "Jafarabadi",
      "carabao":       "Carabao",
      "marchigiana":   "Marchigiana",
      "charolais":     "Charolais",
      "sindi":         "Sindi",

      // Death Causes
      "aborto":       "Aborto",
      "morreu":       "Morreu",
      "morto":        "Morto",
      "nasceu-morto": "Nasceu Morto",
      "natimorto":    "Natimorto",
      "natimortos":   "Natimortos",
      "viva":         "Viva",
      "other":        "Other",

      // Profile
      "profile":          "Profile",
      "change_pref_lang": "Change your preferred language",
      "change_password":  "Change your password",
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
      "password_requirements": "A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial.",

      // Header Values
      "dashboard":     "Painel Da Web",

      // Tab Buttons
      "overview":      "Visão Geral",
      "births":        "Rebanho",
      "deaths":        "Mortes",
      "rain":          "Chuvas",
      "temperatures":  "Temperaturas",
      "areas":         "Áreas",
      "reproduction":  "Reprodução",
      "team":          "Equipe",

      // Overview Screen
      "overview_title":       "Visão Geral",
      "herd_by_breed":        "Rebanho por raça",
      "herd_by_cause_of_death": "Mortes por Causa",
      "rainfall_by_month":    "Precipitação por Mês",
      "temperature_by_month": "Temperatura média por mês",
      "all":                  "Todos",
      "age_category":         "Bezerros desmamando do leite",
      "seven_months":         "7 meses",
      "eight_months":         "8 meses",
      "nine_months":          "9 meses",
      "ten_twelve_months":    "10-12 meses",
      "not_started":          "Não iniciado",
      "in_progress":          "Em andamento",
      "not_pregnant":         "Não está grávida",
      "pregnancy_abort":      "Gravidez e Aborto",
      "pregnancy_birth":      "Gravidez e Parto",

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

      // Search
      "find_tag":     "Buscar brinco...",

      // Table Titles
      "tag":          "Brinco",
      "breed":        "Raça",
      "cause":        "Situação",
      "sex":          "Sexo",
      "age":          "Idade",
      "area":         "Área",
      "date":         "Data",
      "birth_date":   "Idade",
      "who":          "Quem",
      "from":         "De",
      "amount":       "Quantia",
      "temperature":  "Temperatura",
      "nickname":     "Apelido",
      "nicknames":    "Apelidos",
      "name":         "Nome",
      "phone_number": "Número de Telefone",
      "protocol_name":"Protocolo",
      "start_date":   "Data de início",
      "current_day":  "Dia atual",
      "predicted_iatf":"IATF previsto",
      "status":        "Dias concluídos",
      "notes":        "Notas",
      "language":     "Language",

      // Buttons 
      "add_button":   "Adicionar",

      // Reproduction
      "hide-protocol-view": "Ocultar visualização do protocolo",
      "show-protocol-view": "Mostrar visualização do protocolo",
      "hide-notes-view":    "Ocultar visualização de notas",
      "show-notes-view":    "Visualizar notas do programa",

      "treatments": "Tratamentos",
      "medication": "Medicamento",
      "device":     "Dispositivo",
      "proceedure": "Procedimento",
      "notes":      "Notas",

      "reproduction-results-for-month":"Inseminações",
      "iatf-success-rate-by-group":"Sucesso da IATF por grupo",
      "birth-rate-percentage":"Porcentagem da taxa de natalidade",

      // Breeds
      "angus":         "Angus",
      "brangus":       "Brangus",
      "cruzada":       "Cruzada",
      "nelore":        "Nelore",
      "sta_zelia":     "Sta. Zelia",
      "murrah":        "Murrah",
      "mediterrâneo":  "Mediterrâneo",
      "jafarabadi":    "Jafarabadi",
      "carabao":       "Carabao",
      "marchigiana":   "Marchigiana",
      "charolais":     "Charolais",
      "sindi":         "Sindi",

      // Death Causes
      "aborto":       "Aborto",
      "morreu":       "Morreu",
      "morto":        "Morto",
      "nasceu-morto": "Nasceu Morto",
      "natimorto":    "Natimorto",
      "natimortos":   "Natimortos",
      "viva":         "Viva",
      "other":        "Other",

      // Profile
      "profile":      "Perfil",
      "change_pref_lang": "Altere seu idioma preferido",
      "change_password":  "Altere sua senha",
    }
  }
};

export const getLang = () => {
  const user = localStorage.getItem('zapmanejo_user');
  if ((user === null) || (user === undefined)) {
    return navigator.language;
  }
  const juser = JSON.parse(user);
  if ((juser.lang === "en-US") || (juser.lang === "pt-BR")) {
    return juser.lang;
  }
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
