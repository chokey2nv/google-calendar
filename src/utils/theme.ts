export const colors = {
  dark: {
    name: "dark",
    text: '#e3e3e3',
    placeholder: "#888",
    background: "#1e1f20", //'#1b1b1b',
    primary: "#131314",
    secondary: "#004a77",
    highlight: "#a8c7fa",

    btnHover: "#5b5b5b94",
    borderLine: "#333537",
    // ...
  },
  light: {
    name: "light",
    text: '#444746',
    placeholder: "#888",
    background: '#f8fafd',
    primary: "#fff",
    secondary: "",
    btnHover: "#fff",
    highlight: "#0b57d0", //"#c2e7ff",
    borderLine: "#dde3ea",
    // ...
  }
};

export type ITheme = keyof typeof colors;
