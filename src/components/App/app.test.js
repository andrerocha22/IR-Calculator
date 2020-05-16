import React from "react";
import Enzyme from "enzyme";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";

import App from "../App";

import { Provider } from "react-redux";
import { createStore } from "redux";

import reducers from "../../redux/reducers";

Enzyme.configure({ adapter: new Adapter() });
describe("<App/>", () => {
  let store, wrapper;

  beforeEach(() => {
    store = createStore(reducers);
    wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  it("Renders correctly", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
