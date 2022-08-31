
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
    const { container } = render(<Snowman words={["test"]} maxWrong={2}/>);
    
    fireEvent.click(container.querySelector("button[value='a']"));

    //Letters still appear when nWrong < maxWrong:
    expect(
      container.querySelectorAll("button[class='ltrButton']")
      .length).toEqual(26);

    fireEvent.click(container.querySelector("button[value='b']"));

   //Letters disappear when nWrong >= maxWrong:
    expect(
      container.querySelector("button[class='ltrButton']")
    ).not.toBeInTheDocument();

    expect(
      container.querySelector(".Snowman"))
      .toBeInTheDocument("You lose, the word is 'test'");

  });
});

