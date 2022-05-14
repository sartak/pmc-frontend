import React from "react";
import type { AppProps } from "next/app";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import CssBaseline from "@mui/material/CssBaseline";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <CssBaseline />
      <Component {...pageProps} />
    </React.Fragment>
  );
}
