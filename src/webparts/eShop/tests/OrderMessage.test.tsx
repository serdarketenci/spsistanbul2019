import React from "react";
import 'jest';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import OrderItemMessage from '../components/order/OrderItemMessage';

describe('component renders properly', () => {

  const wrapper = shallow(<OrderItemMessage
    iconName="Accept"
    iconColor="#107c10"
    message="test2"
  />);

  test('snapshot should match', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});