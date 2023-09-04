import { Box, Typography, Button, Skeleton, styled } from "@mui/material";
import { useState, Suspense } from "react";
import { ROUTES } from "../../Routes";
import { Link } from "react-router-dom";
import Avatar from "../Avatar";
import { TypedDocumentNode, gql, useSuspenseQuery } from "@apollo/client";
import { CharacterQueryType, CharacterStatusType } from "../../Types";
import ErrorBoundary from "../ErrorBoundary";
import pickleRick from "../../assets/img/pickle-rick.png";

export const GET_CHARACTER_LOCATION: TypedDocumentNode<CharacterQueryType> = gql`
  query getCharacter($id: ID!) {
    character(id: $id) {
      id
      species
      origin {
        name
      }
      location {
        name
      }
    }
  }
`;

export const CharacterCard = ({
  imgSrc,
  name,
  status,
  id,
}: {
  imgSrc: string;
  name: string;
  status: CharacterStatusType;
  id: string;
}) => {
  const [isHover, setIsHover] = useState(false);

  function toggleHover() {
    setIsHover((prev) => !prev);
  }

  return (
    <CardExternalWrapper>
      <CardInternalWrapper
        className="test"
        onMouseEnter={toggleHover}
        onMouseLeave={toggleHover}
      >
        <Avatar
          width={"100%"}
          height={"200px"}
          imgSrc={imgSrc}
          status={status}
          caption={name}
        />
        {isHover && (
          <ErrorBoundary fallback={<CardBodyError />}>
            <Suspense fallback={<CardBodyLoading />}>
              <CardBody id={id} status={status} />
            </Suspense>
          </ErrorBoundary>
        )}
      </CardInternalWrapper>
    </CardExternalWrapper>
  );
};

function CardBody({ id, status }: { id: string; status: string }) {
  const { data } = useSuspenseQuery(GET_CHARACTER_LOCATION, {
    variables: { id },
  });

  return (
    <CardBodyWrapper>
      <Typography>{`${status} - ${data.character.species}`}</Typography>
      <Box>
        <Typography color="gray">First seen in</Typography>
        <Typography>{data.character.origin.name}</Typography>
      </Box>
      <Box>
        <Typography color="gray"> Last kown location</Typography>
        <Typography>{data.character.location.name}</Typography>
      </Box>
      <Box sx={{ mx: "auto" }}>
        <Link to={ROUTES.CHARACTER(id)}>
          <Button>Episodes</Button>
        </Link>
      </Box>
    </CardBodyWrapper>
  );
}

function CardBodyLoading() {
  return (
    <CardBodyWrapper>
      <Box data-testid="card-body-loading" sx={{ display: "flex", gap: 0.5 }}>
        <Skeleton variant="text" sx={{ fontSize: "1rem", width: 0.3 }} />
        <Skeleton variant="text" sx={{ fontSize: "1rem", width: 0.5 }} />
      </Box>
      <Box>
        <Skeleton variant="text" sx={{ fontSize: "1rem", width: 0.5 }} />
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
      </Box>
      <Box>
        <Skeleton variant="text" sx={{ fontSize: "1rem", width: 0.7 }} />
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
      </Box>
      <Skeleton variant="rounded" sx={{ mx: "auto", width: 0.5 }} />
    </CardBodyWrapper>
  );
}

function CardBodyError() {
  return (
    <Box
      sx={{
        height: 100,
        display: "flex",
        alignItems: "center",
        backgroundImage: `url(${pickleRick})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 30px",
        pl: 2,
      }}
    >
      <Typography sx={{ width: "30%" }}>something went wrong!</Typography>
    </Box>
  );
}

const CardBodyWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
}));

const CardInternalWrapper = styled("div")(({ theme }) => ({
  "&:hover": {
    transform: "scale(1.2, 1.1)",
    height: "unset",
    zIndex: 100,
  },
  transiton: "all .5s",
  width: "100%",
  height: "200px",
  borderRadius: theme.shape.borderRadius,
  overflow: "hidden",
  position: "absolute",
  cursor: "pointer",
  transition: "all .25s",
  backgroundColor: "#48484896",
  backdropFilter: "blur(20px)",
}));

/**
 * this prevent row's height change on hover
 */
const CardExternalWrapper = styled("div")({
  position: "relative",
  height: "200px",
});
