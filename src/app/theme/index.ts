import { createTheme } from "@mui/material";

interface MyTheme {
  breakpoints: any;
  palette: {
    primary: {
      main: string;
    };
    secondary: {
      main: string;
    };
  };
}

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "rgb(56,208,132)",
    },
    secondary: {
      main: "#000",
    },
  },
});

export default defaultTheme as MyTheme;
