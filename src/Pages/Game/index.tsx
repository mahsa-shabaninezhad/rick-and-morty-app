import { Typography } from "@mui/material";
import Layout from "../../components/Layout";
import GameBG from "../../assets/img/game.png";
import GlassyWrapper from "../../components/GlassyWrapper";

const Game = () => {
  return (
    <Layout bgImg={GameBG}>
      <GlassyWrapper maxWidth={410}>
        <Typography variant="h1">comming soon...</Typography>
      </GlassyWrapper>
    </Layout>
  );
};

export default Game;
