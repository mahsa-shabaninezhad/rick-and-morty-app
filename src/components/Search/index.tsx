import { Autocomplete, Box, CircularProgress, TextField } from "@mui/material";
import RouterLink from "../RouterLink";
import { ROUTES } from "../../Routes";
import { gql, useLazyQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { throttle } from "../../utils";
import { useRef } from "react";
import { FilterQuery, SearchValue } from "../../Types";

export const FILTER_CHARACTER = gql`
  query filterCharacter($name: String!) {
    characters(filter: { name: $name }) {
      results {
        id
        name
      }
    }
  }
`;

export const FILTER_EPISODES = gql`
  query filterEpisodes($name: String!) {
    episodes(filter: { name: $name }) {
      results {
        id
        name
      }
    }
  }
`;

const queries = {
  characters: FILTER_CHARACTER,
  episodes: FILTER_EPISODES,
};

function findRoute(type: SearchValue) {
  switch (type) {
    case "characters":
      return ROUTES.CHARACTER;
    case "episodes":
      return ROUTES.EPISODE;
  }
}

const Search = ({ type }: { type: SearchValue }) => {
  const [queryFN, { loading, data }] = useLazyQuery<FilterQuery>(queries[type]);
  const navigate = useNavigate();
  const interval = useRef(null);

  const route = findRoute(type);

  return (
    <Autocomplete
      onChange={(_, value) => {
        if (value && typeof value === "object") {
          navigate(route(value.id));
        }
      }}
      onInputChange={(_, value) => {
        throttle(interval, () => {
          queryFN({ variables: { name: value } });
        });
      }}
      options={
        data
          ? data[type].results.map((item) => ({
              label: item.name,
              id: item.id,
            }))
          : []
      }
      freeSolo
      sx={{ maxWidth: "400px" }}
      renderOption={(props, option) => {
        return (
          <Box key={option.id} component="li" {...props}>
            <RouterLink to={route(option.id)}>{option.label}</RouterLink>
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="search"
          size="small"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default Search;
