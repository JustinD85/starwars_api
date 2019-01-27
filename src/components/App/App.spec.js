import React from 'react';
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
    //mock fetch
    expect(wrapper.state('films').length).toEqual(0)
    await wrapper.instance().getFilms();
    expect(wrapper.state('films').length).toEqual(7)
  });

  it('should get random film scroll text,year, and title', () => {
    //Ask best way to test random number generator
  });

  // it('should have 3 props of correct type', async () => {

  //   await wrapper.instance().getFilms();
  //   expect(wrapper.find(ScrollingText).prop('film')).toBeInstanceOf(Object);
  //   expect(wrapper.find(ScrollingText).prop('film').title);
  // });

});