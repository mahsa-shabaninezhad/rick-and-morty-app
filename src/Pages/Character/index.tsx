import { Box, Typography } from "@mui/material";
import EpisodeCard from "../../components/EpisodeCard";
import Layout from "../../components/Layout";
import Avatar from "../../components/Avatar";
import Favorite from "../../components/Favorite";
import { TypedDocumentNode, gql, useSuspenseQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { CharacterQueryType } from "../../Types";
import { useScrollToTop } from "../../hooks/useScrollToTop";

export const GET_CHARACTER: TypedDocumentNode<CharacterQueryType> = gql`
  query getCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      image
      status
      species
      type
      origin {
        name
      }
      location {
        name
      }
      episode {
        id
        name
        episode
        air_date
      }
    }
  }
`;

const Character = () => {
  useScrollToTop();
  const { characterId } = useParams();
  const { data } = useSuspenseQuery(GET_CHARACTER, {
    variables: { id: characterId },
  });

  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          gap: 3,
          mb: 10,
          mt: 5,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Avatar
          width={"200PX"}
          height={"200px"}
          round={true}
          imgSrc={data.character.image}
          status={data.character.status}
          caption={data.character.status}
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CharacterName name={data.character.name} />
          <Typography variant="h5">
            origin: {data.character.origin.name}
          </Typography>
          <CharactereSpecies
            species={data.character.species}
            type={data.character.type}
          />
        </Box>
      </Box>

      <Typography sx={{ mb: 3 }} variant="h5">
        Episodes:
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
        {data.character.episode.map((ep) => (
          <EpisodeCard
            key={ep.id}
            name={ep.name}
            airDate={ep.air_date}
            episode={ep.episode}
            id={ep.id}
          />
        ))}
      </Box>
    </Layout>
  );
};

export default Character;

function CharacterName({ name }: { name: string }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        flexWrap: { xs: "wrap", sm: "nowrap" },
      }}
    >
      <Typography variant="h2" component="h1">
        {name}
      </Typography>
      <Favorite />
    </Box>
  );
}

function CharactereSpecies({
  species,
  type,
}: {
  species: string;
  type: string;
}) {
  return (
    <Box data-testid="species-box" sx={{ mt: "auto", display: "flex", gap: 1 }}>
      <Typography>{species}</Typography>
      <Typography>{type && "- " + type}</Typography>
    </Box>
  );
}
