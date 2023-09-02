import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    mode: "dark",
    text: {
      primary: "#fff",
    },
    background:{
        default: '#252525',
        paper: '#252525'
    },
    primary: { main: "#17abc7" },
    secondary: { main: "#69f43e" },
  },
  typography: {
    allVariants: {
      color: "#fff",
    },
  },
  shape:{
    borderRadius: 24
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 450,
      md: 700,
      lg: 1200,
      xl: 1534
    },
  },
});
