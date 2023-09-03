import { styled } from "@mui/material";
import { Link, LinkProps } from "react-router-dom";

const RouterLink = styled(Link)<LinkProps>(({ theme }) => ({
  width: "100%",
  color: theme.palette.text.primary,
  textDecoration: "none",
  "&:active": { color: theme.palette.text.primary },
  "&:visited": { color: theme.palette.text.primary },
  "&:focus": { color: theme.palette.text.primary },
}));

export default RouterLink;
