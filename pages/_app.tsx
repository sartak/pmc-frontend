import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import { AppProps } from "next/app";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../lib/theme";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>
        <Component {...pageProps} />
      </SnackbarProvider>
    </ThemeProvider>
  );
}
