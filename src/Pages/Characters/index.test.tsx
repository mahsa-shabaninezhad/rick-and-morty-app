import { MockedProvider } from "@apollo/client/testing";
import { renderComponent } from "../../test/utils";
import { GET_CHARACTERS } from "./index";
import App from "../../App";
import { ROUTES } from "../../Routes";
import { matchers } from "@emotion/jest";
import { InMemoryCache } from "@apollo/client";
import userEvent from "@testing-library/user-event";

expect.extend(matchers);

const mocks = [
  {
    request: {
      query: GET_CHARACTERS,
      variables: {
        page: 1,
      },
    },
    result: {
      data: {
        characters: {
          info: {
            next: "2",
          },
          results: [
            {
              id: "1",
              name: "Rick Sanchez",
              image: "rick.png",
              status: "Alive",
            },
            {
              id: "2",
              name: "Morty Smith",
              image: "morty.png",
              status: "dead",
            },
          ],
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
    ROUTES.CHARACTERS
  );
  const loading = screen.getByTestId("characters-page-loading");
  expect(loading).toBeInTheDocument();
});

it("should show character cards", async () => {
  const screen = renderComponent(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>,
    ROUTES.CHARACTERS
  );
  const rickCard = await screen.findByText("Rick Sanchez");
  expect(rickCard).toBeInTheDocument();
  const mortyCard = await screen.findByText("Morty Smith");
  expect(mortyCard).toBeInTheDocument();
});

it("should show rectangular card", async () => {
  const mocks = [
    {
      request: {
        query: GET_CHARACTERS,
        variables: {
          page: 1,
        },
      },
      result: {
        data: {
          characters: {
            info: {
              next: "2",
            },
            results: [
              {
                id: "1",
                name: "Rick Sanchez",
                image: "rick.png",
                status: "Alive",
              },
            ],
          },
        },
      },
    },
  ];
  const screen = renderComponent(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>,
    ROUTES.CHARACTERS
  );
  const rickCard = await screen.findByRole("figure");
  expect(rickCard).toHaveStyleRule("border-radius", "unset");
});

it("should show load more btn when there is next page", async () => {
  const screen = renderComponent(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>,
    ROUTES.CHARACTERS
  );
  const loadMore = await screen.findByRole("button", { name: "load more" });
  expect(loadMore).toBeInTheDocument();
});

it("should not show load more btn when there is not next page", async () => {
  const mocks = [
    {
      request: {
        query: GET_CHARACTERS,
        variables: {
          page: 1,
        },
      },
      result: {
        data: {
          characters: {
            info: {
              next: null,
            },
            results: [
              {
                id: "1",
                name: "Rick Sanchez",
                image: "rick.png",
                status: "Alive",
              },
            ],
          },
        },
      },
    },
  ];
  const screen = renderComponent(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>,
    ROUTES.CHARACTERS
  );
  const rickCard = await screen.findByText("Rick Sanchez");
  expect(rickCard).toBeInTheDocument();
  const loadMore = screen.queryByRole("button", { name: "load more" });
  expect(loadMore).not.toBeInTheDocument();
});

it("should load more character by clicking on load more", async () => {
  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          characters: {
            keyArgs: ["filter"],
            merge(existing = { info: {}, results: [] }, incoming = []) {
              return {
                info: incoming.info,
                results: [...existing.results, ...incoming.results],
              };
            },
          },
        },
      },
    },
  });
  const mocks = [
    {
      request: {
        query: GET_CHARACTERS,
        variables: {
          page: 1,
        },
      },
      result: {
        data: {
          characters: {
            info: {
              next: 2,
            },
            results: [
              {
                id: "1",
                name: "Rick Sanchez",
                image: "rick.png",
                status: "Alive",
              },
            ],
          },
        },
      },
    },
    {
      request: {
        query: GET_CHARACTERS,
        variables: {
          page: 2,
        },
      },
      result: {
        data: {
          characters: {
            info: {
              next: 3,
            },
            results: [
              {
                id: "2",
                name: "Beth Smith",
                image: "beth.png",
                status: "Alive",
              },
            ],
          },
        },
      },
    },
  ];
  const screen = renderComponent(
    <MockedProvider mocks={mocks} cache={cache}>
      <App />
    </MockedProvider>,
    ROUTES.CHARACTERS
  );
  const rickCard = await screen.findByText("Rick Sanchez");
  expect(rickCard).toBeInTheDocument();
  const loadMore = screen.getByRole("button", { name: "load more" });
  expect(loadMore).toBeInTheDocument();
  userEvent.click(loadMore);
  const btnLoading = await screen.findByRole("progressbar");
  expect(btnLoading).toBeInTheDocument();
  const bethCard = await screen.findByText("Beth Smith");
  expect(bethCard).toBeInTheDocument();
  expect(rickCard).toBeInTheDocument();
});
