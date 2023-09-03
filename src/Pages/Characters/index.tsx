import Layout from "../../components/Layout";
import { CharacterCard } from "../../components/CharacterCard";
import { Box } from "@mui/material";
import { TypedDocumentNode, gql, useSuspenseQuery } from "@apollo/client";
import Button from "../../components/Button";
import { useTransition } from "react";
import { CharactersQueryType } from "../../Types";
import { useScrollToTop } from "../../hooks/useScrollToTop";

const GET_CHARACTERS: TypedDocumentNode<CharactersQueryType> = gql`
  query getCharacters($page: Int!) {
    characters(page: $page) {
      info {
        next
      }
      results {
        id
        name
        image
        status
      }
    }
  }
`;

const Characters = () => {
  useScrollToTop()
  const [isPending, startTransition] = useTransition();

  const { data, fetchMore } = useSuspenseQuery(GET_CHARACTERS, {
    variables: { page: 1 },
  });

  function getNextPageCharacters() {
    startTransition(() => {
      fetchMore({ variables: { page: data.characters.info.next } });
    });
  }

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
        {data?.characters.results.map((char) => (
          <CharacterCard
            key={char.id}
            id={char.id}
            imgSrc={char.image}
            name={char.name}
            status={char.status}
          />
        ))}
      </Box>
      {data.characters.info.next && (
        <Button
          sx={{ m: `48px auto 0`, display: "block", width: 200 }}
          variant="contained"
          onClick={getNextPageCharacters}
          loading={isPending}
        >
          load more
        </Button>
      )}
    </Layout>
  );
};

export default Characters;
