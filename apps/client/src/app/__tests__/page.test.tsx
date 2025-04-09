import { render, screen } from "@testing-library/react";
import Home from "../page";

describe("Home", () => {
  it("renders hello world", () => {
    render(<Home />);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });
});
