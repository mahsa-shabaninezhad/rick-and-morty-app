import Layout from "../../components/Layout";
import { Box, Typography } from "@mui/material";
import Avatar from "../../components/Avatar";
import { Link, useParams } from "react-router-dom";
import { ROUTES } from "../../Routes";
import { TypedDocumentNode, gql, useSuspenseQuery } from "@apollo/client";
import { EpisodeQueryType, IdVariableType } from "../../Types";
import { useScrollToTop } from "../../hooks/useScrollToTop";

const GET_EPISODE: TypedDocumentNode<EpisodeQueryType, IdVariableType> = gql`
  query getEpisode($id: ID!) {
    episode(id: $id) {
      id
      name
      air_date
      episode
      characters {
        id
        image
      }
    }
  }
`;

const Episode = () => {
  useScrollToTop()
  const { episodeId } = useParams();
  const { data } = useSuspenseQuery(GET_EPISODE, {
    variables: { id: episodeId! },
  });

  return (
    <Layout>
      <Box sx={{ display: "flex", gap: 2, marginTop: 5 }}>
        <Typography>{data.episode.episode}</Typography>
        <Typography>{data.episode.air_date}</Typography>
      </Box>
      <Typography sx={{ mt: 1, mb: 4 }} variant="h2">
        {data.episode.name}
      </Typography>
      <Typography sx={{ mb: 5 }} variant="h5">
        chracters:
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 4,
          justifyContent: "center",
        }}
      >
        {data.episode.characters.map((char) => (
          <Link to={ROUTES.CHARACTER(char.id)}>
            <Avatar
              imgSrc={char.image}
              round
              width={"100px"}
              height={"100px"}
              zoomOnHover
            />
          </Link>
        ))}
      </Box>
    </Layout>
  );
};

export default Episode;
