import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Routes";

const EpisodeCard = ({
  name,
  airDate,
  episode,
  id,
}: {
  name: string;
  airDate: string;
  episode: string;
  id: string;
}) => {
  const navigate = useNavigate();
  function handleNavigation() {
    navigate(ROUTES.EPISODE(id));
  }
  return (
    <Box
      onClick={handleNavigation}
      sx={(theme) => ({
        "& :hover": { color: theme.palette.secondary.main },
        border: `1px solid ${theme.palette.primary.main}`,
        p: 2,
        borderRadius: 1,
        cursor: "pointer",
      })}
    >
      <Typography variant="caption">{episode}</Typography>
      <Typography sx={{ mt: 2, mb: 1 }} variant="h5" component="h1">
        {name}
      </Typography>
      <Typography>{airDate}</Typography>
    </Box>
  );
};

export default EpisodeCard;
