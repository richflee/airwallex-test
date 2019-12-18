import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { configure, mount, shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import Home from './Home';

configure({ adapter: new Adapter() });

describe('Home component', () => {
  test('it renders request button', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.find('.home-component__request-btn')).toBeDefined();
  });
});

describe('Request button', () => {
  test('it triggers function call to "showRequestModal"', () => {
    const fnSpy = jest.spyOn(Home.prototype, 'showRequestModal');
    const wrapper = shallow(<Home />);
    wrapper.find('.home-component__request-btn').simulate('click');
    wrapper.update();
    expect(fnSpy).toHaveBeenCalled();
  });
  
  test('it prompts registration modal to be rendered', () => {
    const wrapper = shallow(<Home />);
    wrapper.find('.home-component__request-btn').simulate('click');
    wrapper.update();
    expect(wrapper.find('.registration-modal').length).toBe(1);
  });

  test('it shows the correct initial text', () => {
    const wrapper = mount(<Home />);
    const btn = wrapper.find('.home-component__request-btn');
    expect(btn.text()).toEqual('Request an invite');
  });
});

describe('Registration modal close button', () => {
  test('it triggers function call to "resetModalState"', () => {
    const fnSpy = jest.spyOn(Home.prototype, 'resetModalState');
    const wrapper = shallow(<Home />);
    wrapper.find('.home-component__request-btn').simulate('click');
    wrapper.update();
    wrapper.find('.header-container__close-btn').simulate('click');
    wrapper.update();
    expect(fnSpy).toHaveBeenCalled();
  });
});
