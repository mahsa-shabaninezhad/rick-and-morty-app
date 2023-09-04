import { MockedProvider } from "@apollo/client/testing";
import { renderComponent } from "../../test/utils";
import { GET_CHARACTER } from "./index";
import App from "../../App";
import { ROUTES } from "../../Routes";
import { GraphQLError } from "graphql";
import { matchers } from "@emotion/jest";

expect.extend(matchers);

const mocks = [
  {
    request: {
      query: GET_CHARACTER,
      variables: {
        id: "1",
      },
    },
    result: {
      data: {
        character: {
          episode: [
            {
              air_date: "December 2, 2013",
              episode: "S01E01",
              id: "1",
              name: "Pilot",
            },
            {
              air_date: "December 9, 2013",
              episode: "S01E02",
              id: "2",
              name: "Lawnmower Dog",
            },
          ],
          id: "1",
          image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
          location: { name: "Citadel of Ricks" },
          name: "Rick Sanchez",
          origin: { name: "Earth (C-137)" },
          species: "Human",
          status: "Alive",
          type: "",
        },
      },
    },
  },
];

it("should show loading", async () => {
  const screen = renderComponent(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>,
    ROUTES.CHARACTER("1")
  );
  const loading = await screen.findByTestId("character-page-loading");
  expect(loading).toBeInTheDocument();
});

it("should show correct data", async () => {
  const screen = renderComponent(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>,
    ROUTES.CHARACTER("1")
  );

  const name = await screen.findByText("Rick Sanchez");
  expect(name).toBeInTheDocument();
  const origin = screen.getByText("origin: Earth (C-137)");
  expect(origin).toBeInTheDocument();
  // check episodes
  const ep1 = screen.getByText("S01E01");
  const ep1Title = screen.getByText("Pilot");
  const ep1AirDate = screen.getByText("December 2, 2013");
  const ep2 = screen.getByText("S01E02");
  const ep2Title = screen.getByText("Lawnmower Dog");
  const ep2AirDate = screen.getByText("December 9, 2013");
  expect(ep1).toBeInTheDocument();
  expect(ep1Title).toBeInTheDocument();
  expect(ep1AirDate).toBeInTheDocument();
  expect(ep2).toBeInTheDocument();
  expect(ep2Title).toBeInTheDocument();
  expect(ep2AirDate).toBeInTheDocument();
});

it("should show error when request fail", async () => {
  const mocks = [
    {
      request: {
        query: GET_CHARACTER,
        variables: {
          id: "1",
        },
      },
      result: {
        errors: [new GraphQLError("testing request failed error")],
      },
    },
  ];
  const screen = renderComponent(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>,
    ROUTES.CHARACTER("1")
  );

  const errorText = await screen.findByText("testing request failed error");
  expect(errorText).toBeInTheDocument();
});

it("should show character status on avatar caption", async () => {
  const screen = renderComponent(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>,
    ROUTES.CHARACTER("1")
  );
  const caption = await screen.findByTestId("caption");
  expect(caption.textContent).toBe("Alive");
});

it("should show round avatar", async () => {
  const screen = renderComponent(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>,
    ROUTES.CHARACTER("1")
  );
  const avatar = await screen.findByRole("figure");
  expect(avatar).toHaveStyleRule("border-radius", "50%");
});

it("shout not show - when type is not defined", async () => {
  const screen = renderComponent(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>,
    ROUTES.CHARACTER("1")
  );
  const speciesBox = await screen.findByTestId("species-box");
  expect(speciesBox.textContent).toBe("Human");
});

it("shout not show - when type is defined", async () => {
  const mocks = [
    {
      request: {
        query: GET_CHARACTER,
        variables: {
          id: "1",
        },
      },
      result: {
        data: {
          character: {
            episode: [
              {
                air_date: "December 2, 2013",
                episode: "S01E01",
                id: "1",
                name: "Pilot",
              },
            ],
            id: "1",
            image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
            location: { name: "Citadel of Ricks" },
            name: "Rick Sanchez",
            origin: { name: "Earth (C-137)" },
            species: "Fruit",
            status: "Alive",
            type: "Pickle",
          },
        },
      },
    },
  ];
  const screen = renderComponent(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>,
    ROUTES.CHARACTER("1")
  );
  const speciesBox = await screen.findByTestId("species-box");
  expect(speciesBox.textContent).toBe("Fruit- Pickle");
});
