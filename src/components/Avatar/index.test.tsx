import { renderComponent } from "../../test/utils";
import Avatar from "./index";
import { matchers } from "@emotion/jest";
expect.extend(matchers);

it("should show caption when caption props is exist", () => {
  const captionText = "there is a caption here!";
  const screen = renderComponent(
    <Avatar
      imgSrc="img.png"
      width="100px"
      height="100px"
      caption={captionText}
    />
  );
  const caption = screen.getByText(captionText);

  expect(caption).toBeInTheDocument();
});

it("should not show caption when caption props is not exist", () => {
  const screen = renderComponent(
    <Avatar imgSrc="img.png" width="100px" height="100px" />
  );
  const caption = screen.queryByTestId("caption");

  expect(caption).not.toBeInTheDocument();
});

it("should show image without filter when status is 'Alive' ", () => {
  const screen = renderComponent(
    <Avatar imgSrc="img.png" width="100px" height="100px" status="Alive" />
  );
  const img = screen.getByRole("img");
  expect(img).not.toHaveStyleRule("filter", "grayscale(100%");
});

it("should show image without filter when status is 'Unknown ", () => {
  const screen = renderComponent(
    <Avatar imgSrc="img.png" width="100px" height="100px" status="Unknown" />
  );
  const img = screen.getByRole("img");
  expect(img).not.toHaveStyleRule("filter", "grayscale(100%");
});

it("should show grayscale image when status is 'Dead' ", () => {
  const screen = renderComponent(
    <Avatar imgSrc="img.png" width="100px" height="100px" status="Dead" />
  );
  const img = screen.getByRole("img");
  expect(img).toHaveStyleRule("filter", "grayscale(100%)");
});

it("should be circle when round prop exist", () => {
  const screen = renderComponent(
    <Avatar imgSrc="img.png" width="100px" height="100px" round={true} />
  );

  const figure = screen.getByRole("figure");
  expect(figure).toHaveStyleRule("border-radius", "50%");
});
