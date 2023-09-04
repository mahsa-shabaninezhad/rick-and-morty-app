import { renderComponent } from "../../test/utils";
import { MockedProvider } from "@apollo/client/testing";
import userEvent from "@testing-library/user-event";
import { CharacterCard, GET_CHARACTER_LOCATION } from ".";
import { act, screen } from "@testing-library/react";
import { GraphQLError } from "graphql";

const cardProps = {
  imgSrc: "test.png",
  name: "test person",
  id: "1",
};

const mocks = [
  {
    request: {
      query: GET_CHARACTER_LOCATION,
      variables: {
        id: "1",
      },
    },
    result: {
      data: {
        character: {
          id: "1",
          species: "human",
          origin: { name: "Iran" },
          location: { name: "Tehran" },
        },
      },
    },
  },
];

it("should show character name", async () => {
  const screen = renderComponent(
    <CharacterCard {...cardProps} status="Alive" />
  );
  const name = screen.getByText("test person");
  expect(name).toBeInTheDocument();
});

it("should show loading on hover", async () => {
  const screen = renderComponent(
    <MockedProvider mocks={mocks}>
      <CharacterCard {...cardProps} status="Alive" />
    </MockedProvider>
  );
  const card = screen.getByRole("figure");
  userEvent.hover(card);
  const loading = await screen.findByTestId("card-body-loading");
  expect(loading).toBeInTheDocument();
});

it("should show character detail on hover", async () => {
  act(() => {
    renderComponent(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CharacterCard {...cardProps} status="Alive" />
      </MockedProvider>
    );
  });
  const card = screen.getByRole("figure");
  userEvent.hover(card);
  const speciesText = await screen.findByText("Alive - human");
  expect(speciesText).toBeInTheDocument();
  const originText = screen.getByText("Iran");
  expect(originText).toBeInTheDocument();
  const locationText = screen.getByText("Tehran");
  expect(locationText).toBeInTheDocument();
  const episodeBtn = screen.getByRole("button", { name: "Episodes" });
  expect(episodeBtn).toBeInTheDocument();
});

it("should show character detail on hover", async () => {
  act(() => {
    renderComponent(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CharacterCard {...cardProps} status="Alive" />
      </MockedProvider>
    );
  });
  const card = screen.getByRole("figure");
  userEvent.hover(card);
  const speciesText = await screen.findByText("Alive - human");
  expect(speciesText).toBeInTheDocument();
  const originText = screen.getByText("Iran");
  expect(originText).toBeInTheDocument();
  const locationText = screen.getByText("Tehran");
  expect(locationText).toBeInTheDocument();
  const episodeBtn = screen.getByRole("button", { name: "Episodes" });
  expect(episodeBtn).toBeInTheDocument();
});

it("should show error text when request failed", async () => {
  const mocks = [
    {
      request: {
        query: GET_CHARACTER_LOCATION,
        variables: {
          id: "1",
        },
      },
      result: {
        errors: [new GraphQLError("request failed!")],
      },
    },
  ];
  act(() => {
    renderComponent(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CharacterCard {...cardProps} status="Alive" />
      </MockedProvider>
    );
  });
  const card = screen.getByRole("figure");
  userEvent.hover(card);
  const errorText = await screen.findByText("something went wrong!");
  expect(errorText).toBeInTheDocument();
});

it("should show error text when request failed", async () => {
  const mocks = [
    {
      request: {
        query: GET_CHARACTER_LOCATION,
        variables: {
          id: "1",
        },
      },
      error: new Error("failed to fetch!"),
    },
  ];
  act(() => {
    renderComponent(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CharacterCard {...cardProps} status="Alive" />
      </MockedProvider>
    );
  });
  const card = screen.getByRole("figure");
  userEvent.hover(card);
  const errorText = await screen.findByText("something went wrong!");
  expect(errorText).toBeInTheDocument();
});
