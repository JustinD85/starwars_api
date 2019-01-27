import React from 'react';
import ScrollingText from './ScrollingText'
import { shallow } from 'enzyme';

describe('ScrollingText', () => {
  let wrapper;
  const mockFilm = {
    title: 'title',
    release_date: '2001',
    opening_crawl: 'scroll'
  }

  beforeEach(() => {
    wrapper = shallow(<ScrollingText />)
  })

  it('should match snapshot', () => {
    //expectation
    expect(wrapper).toMatchSnapshot();
  })

  it('should have loading screen if there\'s no film in prop', () => {
    //expectation
    expect(wrapper.find('.loading')).toHaveLength(1)
  })

  it('should render film if passed in as prop', () => {
    //setup
    wrapper = shallow(<ScrollingText film={mockFilm} />);

    //expectation
    expect(wrapper.find('.ScrollingText')).toHaveLength(1);
  });

  it('should render film if passed in as prop', () => {
    //setup
    wrapper = shallow(<ScrollingText film={mockFilm} />);

    //expectation
    expect(wrapper.find('.ScrollingText')).toHaveLength(1);
  });

  it('should not have film if no film in prop', () => {
    //expectation
    expect(wrapper.find('.ScrollingText')).toHaveLength(0)
  })
})