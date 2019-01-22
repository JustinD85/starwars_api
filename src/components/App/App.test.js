import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';

describe('App', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('renders without crashing', () => {

    expect(wrapper).toMatchSnapshot();
  });

  it('should fetch films from api', async () => {
    expect(wrapper.state('films').length).toEqual(0)
    await wrapper.instance().getFilms();
    expect(wrapper.state('films').length).not.toEqual(0)
  });

  it('should get random film scroll text,year, and title', () => {
    
  })


})

