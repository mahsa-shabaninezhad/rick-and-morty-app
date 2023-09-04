import { renderComponent } from "../../test/utils";
import Button from "./index";

it("should show spinner when loading prop exist", () => {
  const screen = renderComponent(<Button loading={true}>loading test</Button>);
  const spinner = screen.getByRole("progressbar");
  expect(spinner).toBeInTheDocument();
});

it("should be disabled when loading prop exist", () => {
  const screen = renderComponent(<Button loading={true}>loading test</Button>);
  const spinner = screen.getByRole("button");
  expect(spinner).toBeDisabled();
});

it("should not show spinner when loading prop does not exist", () => {
  const screen = renderComponent(<Button>loading test</Button>);
  const spinner = screen.queryByRole("progressbar");
  expect(spinner).not.toBeInTheDocument();
});
