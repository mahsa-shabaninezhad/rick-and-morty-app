import { Box, Skeleton } from "@mui/material";
import Layout from "../Layout";

const EpisodeLoading = () => {
  const list = new Array(17);
  return (
    <Layout>
      <Box
        data-testid="episode-page-loading"
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          color: "#fff",
          mt: 5,
        }}
      >
        <Skeleton variant="text" sx={{ fontSize: "1.2rem" }} width={80} />
        -
        <Skeleton variant="text" sx={{ fontSize: "1.2rem" }} width={150} />
      </Box>
      <Skeleton variant="text" sx={{ fontSize: "2.5rem", mb: 5 }} width="45%" />
      <Skeleton variant="text" sx={{ fontSize: "1.8rem", mb: 5 }} width={100} />
      <Box
        sx={{
          display: "flex",
          gap: 4,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {list.fill(1).map((_, index) => (
          <Skeleton key={index} variant="circular" width={100} height={100} />
        ))}
      </Box>
    </Layout>
  );
};

export default EpisodeLoading;
