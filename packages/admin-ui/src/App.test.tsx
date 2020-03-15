import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
    const { getByText } = render(<App />);
    // eslint-disable-next-line no-unused-vars
    const linkElement = getByText(/learn react/i);
    // expect(linkElement).toBeInTheDocument();
});
