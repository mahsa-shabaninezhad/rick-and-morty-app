import Layout from "../../components/Layout";
import EpisodesBG from "../../assets/img/episode.png";
import { Typography } from "@mui/material";
import GlassyWrapper from "../../components/GlassyWrapper";
import Search from "../../components/Search";

const Episodes = () => {
  return (
    <Layout bgImg={EpisodesBG}>
      <GlassyWrapper maxWidth={410}>
        <Typography
          sx={{ mt: { md: 15 } }}
          variant="h3"
          component="h1"
          gutterBottom
        >
          Finde your Favorite Episode
        </Typography>
        <Search type="episodes" />
      </GlassyWrapper>
    </Layout>
  );
};

export default Episodes;
