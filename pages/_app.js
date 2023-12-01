import "@/styles/globals.css";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../app/theme";
import { CommonContextProvider } from "../app/store/context/commonContextProvider";

export default function App({ Component, pageProps }) {
  return (
    <CommonContextProvider>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </CommonContextProvider>
  );
}
