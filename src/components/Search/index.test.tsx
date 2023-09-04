import Search, { FILTER_CHARACTER } from "./index";
import { renderComponent } from "../../test/utils";
import { MockedProvider } from "@apollo/client/testing";
import userEvent from "@testing-library/user-event";
import { act, screen, waitFor } from "@testing-library/react";

it("should character list", async () => {
  const mocks = [
    {
      request: {
        query: FILTER_CHARACTER,
        variables: {
          name: "r",
        },
      },
      result: {
        data: {
          characters: {
            results: [
              {
                id: "1",
                name: "Rick Sanchez",
              },
              {
                id: "2",
                name: "Morty Smith",
              },
              {
                id: "3",
                name: "Summer Smith",
              },
              {
                id: "5",
                name: "Jerry Smith",
              },
            ],
          },
        },
      },
    },
  ];
  const screen = renderComponent(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Search type="characters" />
    </MockedProvider>
  );
  const input = screen.getByLabelText("search");
  expect(input).toBeInTheDocument();
  userEvent.type(input, "r");
  const firstItem = await screen.findByText("Rick Sanchez");
  const secondItem = screen.getByText("Morty Smith");
  const thirdItem = screen.getByText("Summer Smith");
  const fourthItem = screen.getByText("Jerry Smith");
  expect(firstItem).toBeInTheDocument();
  expect(secondItem).toBeInTheDocument();
  expect(thirdItem).toBeInTheDocument();
  expect(fourthItem).toBeInTheDocument();
});

it("should filter rick sanchez", async () => {
  const mocks = [
    {
      request: {
        query: FILTER_CHARACTER,
        variables: {
          name: "r",
        },
      },
      result: {
        data: {
          characters: {
            results: [
              {
                id: "1",
                name: "Rick Sanchez",
              },
              {
                id: "2",
                name: "Morty Smith",
              },
              {
                id: "3",
                name: "Summer Smith",
              },
              {
                id: "5",
                name: "Jerry Smith",
              },
            ],
          },
        },
      },
    },
  ];
  act(() => {
    renderComponent(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Search type="characters" />
      </MockedProvider>
    );
  });
  const input = screen.getByLabelText("search");
  expect(input).toBeInTheDocument();
  userEvent.type(input, "r");
  const secondItem = await screen.findByText("Morty Smith");
  expect(secondItem).toBeInTheDocument();
  userEvent.type(input, "ick");
  await waitFor(() => expect(secondItem).not.toBeInTheDocument());
  const rick = screen.getByText("Rick Sanchez");
  const morty = screen.queryByText("Morty Smith");
  const summer = screen.queryByText("Summer Smith");
  const jerry = screen.queryByText("Jerry Smith");
  expect(rick).toBeInTheDocument();
  expect(morty).not.toBeInTheDocument();
  expect(summer).not.toBeInTheDocument();
  expect(jerry).not.toBeInTheDocument();
});
