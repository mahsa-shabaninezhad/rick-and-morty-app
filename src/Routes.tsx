export const ROUTES_SCHEMA = {
  HOME: "/",
  EPISODES: "/episodes",
  EPISODE: "/episodes/:episodeId",
  CHARACTERS: "/characters",
  CHARACTER: "/characters/:characterId",
};

export const ROUTES = {
  HOME: "/",
  EPISODES: "/episodes",
  EPISODE: (epId: string) => `/episodes/${epId}`,
  CHARACTERS: "/characters",
  CHARACTER: (charId: string) => `/characters/${charId}`,
};
