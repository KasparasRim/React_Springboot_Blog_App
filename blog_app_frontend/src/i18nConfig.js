import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const translationEn = { language: "en", signUp: "Sign Up", logIn: "Login",
newPost: "New Post", allPosts: "All Posts", title: "Reactive Blog App", 
logOut: "Logout", createdOn: "Created on ", updatedOn: "Updated on ",
continueReading: "Continue reading ...", edit: "Edit", delete: "Delete",
loadingPosts: "Loading posts ...", comments: "Comments", otherPosts: "Other posts",
cancel: "Cancel", emailAdress: "Email Address", password: "Password", plzEnterYourPassandEmailToLogin: "Please enter your email and password",
noPostsFound: "No Posts Found :(", addNew: "Add New", adminCorner: "ADMIN Corner"}

const translationLt = { language: "lt", signUp: "Registruokis", 
logIn: "Prisijunk", newPost: "Naujas Įrašas", allPosts: "Visi įrašai",
 title: "Reaktivi Blogo Aplikacija", logOut: "Atsijungti", createdOn: "Sukurta ", updatedOn: "Atnaujinta ",
 continueReading: "Skaityti toliau ...", edit: "Koreguoti", delete: "Ištrinti",
 loadingPosts: "Įrašai kraunami ...", comments: "Komentarai", otherPosts: "Kiti įrašai",
cancel: "Atšaukti", emailAdress: "E-pašto adresas", password: "Slaptažodis", plzEnterYourPassandEmailToLogin: "Prašome įveskite savo e-pašto adresa ir slaptažodį",
noPostsFound: "Įrašų nerasta :(", addNew: "Prideti nauja", adminCorner: "ADMIN'o kampelis"};

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: translationEn },
    lt: { translation: translationLt },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export { i18n };