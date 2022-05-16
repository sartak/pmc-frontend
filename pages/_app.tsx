import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../lib/theme";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => {
            if (!res.ok) {
              throw new Error(`Error ${res.status}`);
            }
            return res.json();
          }),
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider>
          <Component {...pageProps} />
        </SnackbarProvider>
      </ThemeProvider>
    </SWRConfig>
  );
}
