import { Box } from "@mui/material";
import Layout from "../Layout";
import loadingImg from "../../assets/img/episode.png";

const FallbackLoading = () => {
  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          minHeight: "calc(100vh - 100px)",
        }}
      >
        <Box
          sx={{
            "@keyframes spin": {
              from: {
                transform: "rotate(0deg)",
              },
              to: {
                transform: "rotate(360deg)",
              },
            },
            animationName: "spin",
            animationDuration: "1200ms",
            animationIterationCount: "infinite",
            animationTimingFunction: "linear",
            width: "50%",
            maxWidth: 400,
          }}
          component="img"
          src={loadingImg}
        />
      </Box>
    </Layout>
  );
};

export default FallbackLoading;
