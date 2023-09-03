import { Box } from "@mui/material";
import { ReactNode } from "react";
import Navbar from "../Navbar";

const Layout = ({
  bgImg,
  children,
}: {
  bgImg?: string;
  children: ReactNode;
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <Box
        sx={{
          px: { xs: 4, sm: 8 },
          pb: 8,
          backgroundImage: `url(${bgImg})`,
          backgroundPosition: "right bottom",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#252525",
          backgroundSize: "contain",
          boxSizing: "border-box",
          flexGrow: 1,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
