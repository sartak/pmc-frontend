import React from "react";
import { List, ListItem, Stack, Typography } from "@mui/material";

export const PropList = ({ children }: { children: React.ReactNode }) => {
  return <List dense>{children}</List>;
};

export const PropListItem = ({
  label,
  value,
}: {
  label?: React.ReactNode;
  value?: React.ReactNode;
}) => {
  return (
    <ListItem>
      <Stack sx={{ my: "6px" }}>
        <Typography color="text.primary" variant="body2" component="div">
          {label === null ? value : label}
        </Typography>
        {label !== null && (
          <Typography color="text.secondary" variant="body2" component="div">
            {value}
          </Typography>
        )}
      </Stack>
    </ListItem>
  );
};
