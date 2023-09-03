import { Box, Skeleton } from "@mui/material";
import Layout from "../Layout";

function CharactersLoading() {
  const loadingArray = new Array(16);
  return (
    <Layout>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
            x1: "repeat(6, 1fr)",
          },
          gap: 4,
        }}
      >
        {loadingArray.fill(1).map((_, index) => (
          <Skeleton key={index} variant="rounded" width="100%" height={200} />
        ))}
      </Box>
    </Layout>
  );
}

export default CharactersLoading