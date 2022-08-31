
import { render, fireEvent } from "@testing-library/react";
import Snowman from "./Snowman";

describe("snapshot tests for stability", function () {
  it("matches initial", function () {
    const { container } = render(<Snowman />);
    expect(container).toMatchSnapshot();
  });
});


describe("game playing works", function () {
  it("removes display and shows you lose message", function () {
    const { container, debug } = render(<Snowman words={["test"]} maxWrong={2}/>);
    debug(container);
    fireEvent.click(container.querySelector("button[value='a']"));

    expect(container.querySelectorAll("button").length).toEqual(26);

    fireEvent.click(container.querySelector("button[value='b']"));

    expect(
      container.querySelector("button")
    ).not.toBeInTheDocument();

    expect(container.querySelector(".Snowman")).toContainHTML("You lose, the word is 'test'");

  });
});

