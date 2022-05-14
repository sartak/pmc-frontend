import { List, ListItem, ListItemText } from "@mui/material";

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
      <ListItemText
        primary={label === null ? value : label}
        secondary={label === null ? null : value}
      />
    </ListItem>
  );
};
