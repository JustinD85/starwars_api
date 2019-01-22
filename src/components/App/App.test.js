import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  let wrapper = shallow(<App />);

  expect(wrapper).toMatchSnapshot();
});