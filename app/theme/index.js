import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          height: "52px",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "14px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          backgroundColor: "#1976d2",
          fontWeight: "900",
          boxShadow: "none",
          height: "42px",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "Poppins, sans-serif",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          width: "18px",
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: "none",
        },
        withBorderColor: {
          border: "none",
        },
        columnHeaderRow: {
          color: "black",
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          color: "#6B7584",
          fontSize: "14px",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontSize: "16px",
          fontWeight: 600,
          textTransform: "capitalize",
          color: "black",
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        flexContainer: {
          gap: "25px",
        },
      },
    },
  },
});
