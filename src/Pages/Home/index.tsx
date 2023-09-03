import { Typography } from "@mui/material";
import HomeBG from "../../assets/img/home.jpg";
import Layout from "../../components/Layout";
import Search from "../../components/Search";
import GlassyWrapper from "../../components/GlassyWrapper";
import { useScrollToTop } from "../../hooks/useScrollToTop";

const Home = () => {
  useScrollToTop()
  return (
    <Layout bgImg={HomeBG}>
      <GlassyWrapper maxWidth={410}>
        <Typography sx={{ maxWidth: "410px" }} variant="h1" gutterBottom>
          Rick & Morty API
        </Typography>
        <Search type="characters" />
      </GlassyWrapper>
    </Layout>
  );
};

export default Home;
