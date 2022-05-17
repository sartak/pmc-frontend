import NextLink from "next/link";
import React from "react";
import { Link as MUILink } from "@mui/material";

type Props = {
  href: string;
  children: React.ReactNode;
  color?: string;
};

export const Link = (props: Props) => {
  return (
    <NextLink href={props.href}>
      <MUILink href={props.href} color={props.color} underline="hover">
        {props.children}
      </MUILink>
    </NextLink>
  );
};
