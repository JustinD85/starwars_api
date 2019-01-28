import React from 'react';
import { shallow } from 'enzyme'
import FilterSection from './FilterSection'

describe('<FilterSection/>', () => {
  let wrapper, expected, mockSetCurrentFilter, mockFavCount
  beforeEach(() => {
    mockSetCurrentFilter = jest.fn()
    mockFavCount = 0
    wrapper = shallow(<FilterSection
      setCurrentFilter={mockSetCurrentFilter}
      favoriteCount={mockFavCount}
      currentFilter={'favorites'}
    />)
  })

  it('to Match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('should call setCurrent filter when clicked', () => {
    //execution
    wrapper.find('.people').simulate('click')
    wrapper.find('.vehicles').simulate('click')
    wrapper.find('.planets').simulate('click')
    wrapper.find('.favorites').simulate('click')

    //expectation
    expect(mockSetCurrentFilter).toHaveBeenCalledTimes(4)
  })

  it('should show favorite count if non-zero', () => {
    //setup
    expected = "Favorites: 1"
    mockFavCount = 1
    wrapper = shallow(<FilterSection
      setCurrentFilter={mockSetCurrentFilter}
      favoriteCount={mockFavCount}
      currentFilter={'vehicles'}
    />)

    //expectation
    expect(wrapper.find('.favorites').text()).toEqual(expected)
  })

  it('should show a message if no favorites', () => {
    //setup
    expected = "Favorites: none"
    //expectation
    expect(wrapper.find('.favorites').text()).toEqual(expected)
  })
})