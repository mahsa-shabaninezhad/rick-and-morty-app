import { ReactComponent as FielledFavoriteIcon } from "../../assets/icons/favorite-filled.svg";
import { ReactComponent as FavoriteIcon } from "../../assets/icons/favorite.svg";
import { useState } from "react";
import { theme } from "../../Theme";
import { Box } from "@mui/material";

function Favorite() {
  const [isFavorite, setIsFavorite] = useState(false);
  function handleFavoriteChange() {
    setIsFavorite((prevState) => !prevState);
  }

  return (
    <Box sx={{ flexShrink: 0 }}>
      {isFavorite ? (
        <FielledFavoriteIcon
          onClick={handleFavoriteChange}
          width={48}
          height={48}
          fill={theme.palette.primary.main}
        />
      ) : (
        <FavoriteIcon
          onClick={handleFavoriteChange}
          width={48}
          height={48}
          fill="#fff"
        />
      )}
    </Box>
  );
}

export default Favorite;
