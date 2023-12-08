import "@/styles/globals.css";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../app/theme";
import { CommonContextProvider } from "../app/store/context/commonContextProvider";
import Toast from "@/app/components/Toast";

export default function App({ Component, pageProps }) {
  return (
    <CommonContextProvider>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
        <Toast />
      </ThemeProvider>
    </CommonContextProvider>
  );
}
