import { Duration } from "../Duration";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Duration", () => {
  it("renders a timestamp", () => {
    render(<Duration seconds={12} />);
    expect(screen.getByText("0:12")).toBeInTheDocument();
  });
  it("renders a timestamp with minutes", () => {
    render(<Duration seconds={72} />);
    expect(screen.getByText("1:12")).toBeInTheDocument();
  });
  it("zero-pads seconds", () => {
    render(<Duration seconds={62} />);
    expect(screen.getByText("1:02")).toBeInTheDocument();
  });
  it("renders a timestamp with hours", () => {
    render(<Duration seconds={3600 + 11 * 60 + 12} />);
    expect(screen.getByText("1:11:12")).toBeInTheDocument();
  });
  it("renders a timestamp with lots of hours", () => {
    render(<Duration seconds={8 * 3600 + 11 * 60 + 12} />);
    expect(screen.getByText("8:11:12")).toBeInTheDocument();
  });
  it("zero-pads minutes", () => {
    render(<Duration seconds={8 * 3600 + 5 * 60 + 12} />);
    expect(screen.getByText("8:05:12")).toBeInTheDocument();
  });
  it("renders zero", () => {
    render(<Duration seconds={0} />);
    expect(screen.getByText("0:00")).toBeInTheDocument();
  });
  it("handles negatives", () => {
    render(<Duration seconds={-12} />);
    expect(screen.getByText("-0:12")).toBeInTheDocument();
  });
  it("handles negative hours", () => {
    render(<Duration seconds={-1 * (8 * 3600 + 5 * 60 + 12)} />);
    expect(screen.getByText("-8:05:12")).toBeInTheDocument();
  });
});
