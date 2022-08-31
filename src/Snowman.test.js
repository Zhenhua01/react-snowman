
import { render, fireEvent } from "@testing-library/react";
import Snowman from "./Snowman";

describe("snapshot tests for stability", function () {
  it("matches initial", function () {
    const { container } = render(<Snowman />);
    expect(container).toMatchSnapshot();
  });
});

// update button count

describe("game playing works", function () {
  it("removes display and shows you lose message", function () {
    const { container, debug } = render(<Snowman words={["test"]} maxWrong={2}/>);
    debug(container);
    fireEvent.click(container.querySelector("button[value='a']"));

    expect(container.querySelectorAll("button[class='ltrButton']").length).toEqual(26);

    fireEvent.click(container.querySelector("button[value='b']"));

    expect(
      container.querySelector("button[class='ltrButton']")
    ).not.toBeInTheDocument();

    expect(container.querySelector(".Snowman")).toContainHTML("You lose, the word is 'test'");

  });
});

