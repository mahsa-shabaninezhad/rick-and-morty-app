import { Box, Skeleton } from "@mui/material";
import Layout from "../Layout";

const CharacterLoading = () => {
  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          color: "#fff",
          gap: 3,
          mb: 10,
          mt: 10,
        }}
      >
        <Skeleton variant="circular" width={200} height={200} />
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}>
          <Skeleton variant="text" sx={{ fontSize: "2.5rem" }} width="50%" />
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Skeleton variant="text" sx={{ fontSize: "1.7rem" }} width="80px" />
            :
            <Skeleton variant="text" sx={{ fontSize: "1.7rem" }} width="20%" />
          </Box>
          <Box sx={{ display: "flex", gap: 1, mt: "auto" }}>
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} width="80px" />
            -
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} width="20%" />
          </Box>
        </Box>
      </Box>
      <Skeleton variant="text" sx={{ fontSize: "1.8rem", mb: 3 }} width={120} />
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
        <Skeleton variant="rounded" width={150} height={100} />
        <Skeleton variant="rounded" width={280} height={100} />
        <Skeleton variant="rounded" width={150} height={100} />
        <Skeleton variant="rounded" width={250} height={100} />
        <Skeleton variant="rounded" width={170} height={100} />
        <Skeleton variant="rounded" width={250} height={100} />
        <Skeleton variant="rounded" width={180} height={100} />
        <Skeleton variant="rounded" width={300} height={100} />
        <Skeleton variant="rounded" width={220} height={100} />
      </Box>
    </Layout>
  );
};

export default CharacterLoading;
