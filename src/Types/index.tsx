export type CharacterStatusType = "Alive" | "Dead" | "Unknown";

export type CharacterType = {
  id: string;
  name: string;
  status: CharacterStatusType;
  species: string;
  type: string;
  image: string;
  gender: string;
  origin: {
    name: string;
  };
  location: {
    name: string;
  };
  episode: EpisodeType[];
};

export type EpisodeType = {
  id: string;
  name: string;
  air_date: string;
  episode: string;
  characters: CharacterType[];
};

export type InfoType = {
  count: number;
  pages: number;
  prev: number;
  next: number;
};

export type EpisodeQueryType = {
  episode: {
    id: string;
    name: string;
    air_date: string;
    episode: string;
    characters: CharacterType[];
  };
};

export type CharacterQueryType = {
  character: CharacterType;
};

export type CharactersType = {
  info: InfoType;
  results: CharacterType[];
};

export type EpisodesType = {
  info: InfoType;
  resultes: EpisodeType[];
};

export type CharactersQueryType={
    characters: CharactersType
}
export type EpisodesQueryType={
    episodes: EpisodesType
}

export type SearchValue = "characters" | "episodes";

export type FilterQuery = {
  [key in SearchValue]: {
    results: {
      id: string;
      name: string;
    }[];
  };
};

export type IdVariableType = {
  id: string;
};
