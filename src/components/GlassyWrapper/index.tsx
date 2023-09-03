import { styled } from "@mui/material";

const GlassyWrapper = styled("div")(({ maxWidth }: { maxWidth?: number }) => ({
  backdropFilter: "blur(10px)",
  paddingBottom: '16px',
  maxWidth,
}));

export default GlassyWrapper;
