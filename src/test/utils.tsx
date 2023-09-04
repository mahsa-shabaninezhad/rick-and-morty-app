import { render } from "@testing-library/react";
import { ReactElement } from "react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

export function renderComponent(component: ReactElement, pathname?: string) {
  pathname && window.history.pushState({}, "test", pathname);
  return render(<BrowserRouter>{component}</BrowserRouter>);
}
