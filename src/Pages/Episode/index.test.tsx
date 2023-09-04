import { MockedProvider } from "@apollo/client/testing";
import { renderComponent } from "../../test/utils";
import { GET_EPISODE } from "./index";
import App from "../../App";
import { ROUTES } from "../../Routes";
import { matchers } from "@emotion/jest";

expect.extend(matchers);

const mocks = [
  {
    request: {
      query: GET_EPISODE,
      variables: {
        id: "1",
      },
    },
    result: {
      data: {
        episode: {
          air_date: "September 10, 2017",
          characters: [
            {
              id: "1",
              image: "1.jpeg",
            },
            {
              id: "2",
              image: "2.jpeg",
            },
            {
              id: "4",
              image: "4.jpeg",
            },
          ],
          episode: "S03E07",
          id: "28",
          name: "The Ricklantis Mixup",
        },
      },
    },
  },
];

it("should show loading", () => {
  const screen = renderComponent(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>,
    ROUTES.EPISODE("1")
  );
  const loading = screen.getByTestId("episode-page-loading");
  expect(loading).toBeInTheDocument();
});

it("should show episode detail", async () => {
  const screen = renderComponent(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>,
    ROUTES.EPISODE("1")
  );
  const epTitle = await screen.findByText("The Ricklantis Mixup");
  const epNumber = screen.getByText("S03E07");
  const epAirDate = screen.getByText("September 10, 2017");
  expect(epTitle).toBeInTheDocument();
  expect(epNumber).toBeInTheDocument();
  expect(epAirDate).toBeInTheDocument();
});

it("should show characters avatar", async () => {
  const screen = renderComponent(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>,
    ROUTES.EPISODE("1")
  );
  const avatars = await screen.findAllByRole("figure");
  expect(avatars.length).toBe(3);
});
