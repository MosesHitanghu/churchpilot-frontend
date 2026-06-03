import { createTheme } from "@mui/material/styles";

export type AppThemeMode = "light" | "dark";

export const createAppTheme = (mode: AppThemeMode) =>
  createTheme({
  palette: {
    mode,
    primary: {
      main: "#0e093d",
    },
    secondary: {
      main: "#65ebdc",
      contrastText: "#0e093d",
    },
    background: {
      default: mode === "dark" ? "#080620" : "#f6f8fb",
      paper: mode === "dark" ? "#15122f" : "#ffffff",
    },
    text: {
      primary: mode === "dark" ? "#ffffff" : "#0e093d",
      secondary: mode === "dark" ? "#c6c7d4" : "#5d6475",
    },
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
    h1: {
      letterSpacing: 0,
    },
    h2: {
      letterSpacing: 0,
    },
    h3: {
      letterSpacing: 0,
    },
    h4: {
      letterSpacing: 0,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiTextField: {
      defaultProps: {
        size: "small",
      },
    },
    MuiSelect: {
      defaultProps: {
        size: "small",
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        size: "small",
      },
    },
    MuiFormControl: {
      defaultProps: {
        size: "small",
      },
    },
    MuiInputBase: {
      defaultProps: {
        size: "small",
      },
    },
    MuiOutlinedInput: {
      defaultProps: {
        size: "small",
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 700,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          color: "#d32f2f",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        root: ({ theme }) => ({
          zIndex: theme.zIndex.modal,
        }),
        paper: {
          top: "0 !important",
          height: "100dvh",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 700,
        },
      },
    },
  },
});
