import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../page";

// Mock fetch
global.fetch = jest.fn();

describe("Home", () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.resetAllMocks();
  });

  it("renders loading state initially", () => {
    // Mock fetch to never resolve
    (global.fetch as jest.Mock).mockImplementation(() => new Promise(() => {}));

    render(<Home />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders data when API call succeeds", async () => {
    const mockData = { status: "healthy is real" };

    // Mock successful fetch response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    render(<Home />);

    // Wait for loading to disappear
    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    // Check if data is displayed
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("renders error when API call fails", async () => {
    // Mock failed fetch response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    render(<Home />);

    // Wait for error to appear
    await waitFor(() => {
      expect(screen.getByText(/Error:/)).toBeInTheDocument();
    });
  });
});
