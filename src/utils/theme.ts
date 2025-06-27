export const colors = {
  dark: {
    text: '#e3e3e3',
    placeholder: "#888",
    background: "#1e1f20", //'#1b1b1b',
    primary: "#131314",
    secondary: "#004a77",
    highlight: "#a8c7fa",

    btnHover: "#5b5b5b94",
    // ...
  },
  light: {
    text: '#000',
    placeholder: "#888",
    background: '#fff',
    primary: "",
    secondary: "",
    btnHover: "",
    highlight: "",
    // ...
  }
};

export type ITheme = keyof typeof colors;
