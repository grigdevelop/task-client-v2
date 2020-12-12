import "jest";
import { mount, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { TestLoginComponent } from "./login.component";
import { act } from "react-dom/test-utils";

configure({ adapter: new Adapter() });

it("shoud by by", () => {
  act(() => {
    const wrapper = mount(<TestLoginComponent />);
    expect(wrapper.find("#username")).toHaveLength(1);

    const submitBtn = wrapper.find("#submitBtn");
    submitBtn.at(0).simulate("click");

    expect(wrapper.find("#usernameError")).toHaveLength(1);
    // expect(wrapper.find("#usernameError").at(0).text()).toBe(
    //   "Username is required"
    // );
  });
});
