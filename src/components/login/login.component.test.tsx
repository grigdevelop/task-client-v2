import "jest";
import { mount, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { LoginComponent, TestLoginComponent } from "./login.component";
import { act } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";
import { fireEvent } from "@testing-library/react";

configure({ adapter: new Adapter() });

let container: HTMLDivElement;
beforeEach(async () => {
  await act(async () => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
  })
});

afterEach(async () => {
  await act(async () => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
  })
});

describe('LoginComponent', () => {


  it("form -> 'username' validation", async () => {
    await act(async () => {
      render(<TestLoginComponent />, container);
    });

    const fieldValidation = async (fieldName: string, value: string | null, expected: string) => {
      const submit: Element = container.querySelector('[data-testid=login-form]')!;
      const errorField = container.querySelector(`[data-testid=${fieldName}-error]`);
      const field = container.querySelector(`[data-testid=${fieldName}]`)!;

      await act(async () => {
        if (value !== null) {
          fireEvent.input(field, { target: { value } });
        }
        fireEvent.submit(submit);
      });

      expect(errorField?.textContent).toBe(expected);
    };

    await fieldValidation('username', null, 'username is required');
    await fieldValidation('username', 'grigdevelop', '');
    await fieldValidation('username', 'aa', 'username must be at least 3 characters');
    await fieldValidation('username', 'abcdefghigjkelmabropoqiur', 'username must be at most 15 characters');
  });

  it("form -> 'password' validation", async () => {
    await act(async () => {
      render(<TestLoginComponent />, container);
    });

    const fieldValidation = async (fieldName: string, value: string | null, expected: string) => {
      const submit: Element = container.querySelector('[data-testid=login-form]')!;
      const errorField = container.querySelector(`[data-testid=${fieldName}-error]`);
      const field = container.querySelector(`[data-testid=${fieldName}]`)!;

      await act(async () => {
        if (value !== null) {
          fireEvent.input(field, { target: { value } });
        }
        fireEvent.submit(submit);
      });

      expect(errorField?.textContent).toBe(expected);
    };

    await fieldValidation('password', null, 'password is required');
    await fieldValidation('password', 'password', '');
  });

});
