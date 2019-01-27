import React from 'react';
import ScrollingText from './ScrollingText'
import { shallow } from 'enzyme';


describe('ScrollingText', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ScrollingText />)
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have loading screen if there\'s no film', () => {
    wrapper = shallow(<ScrollingText film={undefined} />);
    expect(wrapper.props().children).toEqual("Loading")
  });
  it.skip('should title, year, and text of film', () => {
    wrapper = shallow(<ScrollingText
      film={
        {
          title: 'title',
          release_date: 2001,
          opening_crawl: 'scroll'
        }} />);

    expect(wrapper.props().children.length).toEqual(3);
    expect(wrapper.find('.ScrollingText')).toHaveLength(1);
  });


})