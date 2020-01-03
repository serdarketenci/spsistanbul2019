/// <reference types="jest" />

import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import OrderItemMessage, { IOrderItemMessageProps } from '../components/order/OrderItemMessage';



describe('Enzyme basics', () => {

  let reactComponent: ReactWrapper<IOrderItemMessageProps, {}>;

  beforeEach(() => {

    const element: React.ReactElement<IOrderItemMessageProps> = React.createElement(
      OrderItemMessage,
      {
        message: "Hata",
        iconName: "HeartBroken",
        iconColor: "#a80000"
      }
    );

    reactComponent = mount(element);
  });

  afterEach(() => {
    reactComponent.unmount();
  });
  it('should has the correct message', () => {

    // Arrange
    // define contains/like css selector
    let cssSelector: string = 'label';

    const text = reactComponent.find(cssSelector).text();

    // Assert
    expect(text).toBe("Hata");
  });

  test('should has the correct icon name', () => {

    // Arrange
    // define contains/like css selector
    let cssSelector: string = 'i';

    // get the component as dom
    const componentAsDOM = reactComponent.find(cssSelector).getDOMNode();

    // use JavaScript querySelector to find nodes that contain icon name
    const iconNameAttr = componentAsDOM.getAttribute("data-icon-name");

    // Assert
    expect(iconNameAttr).toEqual("HeartBroken");
  });
});

// Usefull links:
// https://reactjs.org/docs/test-renderer.html
// https://github.com/airbnb/enzyme