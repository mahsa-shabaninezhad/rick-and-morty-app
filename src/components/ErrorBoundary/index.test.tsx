import { renderComponent } from "../../test/utils";
import ErrorBoundary from "./index";

function ProduceError() {
  throw new Error("an error occured:(");
  return <div>Unreachable code!</div>;
}

function Fallback() {
  return <div>It is Fallback Component</div>;
}

it("should show fallback component", () => {
  const screen = renderComponent(
    <ErrorBoundary fallback={<Fallback />}>
      <ProduceError />
    </ErrorBoundary>
  );
  const text = screen.getByText("It is Fallback Component");
  expect(text).toBeInTheDocument();
});

it("should show error text", () => {
  const screen = renderComponent(
    <ErrorBoundary>
      <ProduceError />
    </ErrorBoundary>
  );

  const errorText = screen.getByText("an error occured:(");
  expect(errorText).toBeInTheDocument();
});
