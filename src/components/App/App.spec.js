import React from 'react'
import App from './App'
import ScrollingText from '../ScrollingText/ScrollingText'
import FilterSection from '../FilterSection/FilterSection'
import CardArea from '../CardArea/CardArea'
import { shallow } from 'enzyme'
import { mockFilms } from '../../mockData/'

describe('App', () => {
  let wrapper, expected

  describe('<App/>', () => {
    beforeEach(() => {
      wrapper = shallow(<App />)
    })

    it('should render without error', () => {
      //expectation
      expect(wrapper).toMatchSnapshot()
    })

    it('should render 3 components', () => {
      //expectation
      expect(wrapper.find(CardArea)).toHaveLength(1)
      expect(wrapper.find(FilterSection)).toHaveLength(1)
      expect(wrapper.find(ScrollingText)).toHaveLength(1)
    })
  })

  describe('setRandomFilm()', () => {
    beforeEach(() => {
      //setup
      wrapper = shallow(<App />)
      window.fetch = jest.fn()
        .mockImplementation(() => Promise.resolve({
          json: () => Promise.resolve(mockFilms),
          ok: true
        }))
    })

    it('should call fetch with correct params', async () => {
      expected = "https://swapi.co/api/films"
      //execution
      await wrapper.instance().setRandomFilm()
      //expectation
      expect(window.fetch).toHaveBeenCalledWith(expected)
    })

    it('should set film', async () => {
      //execution
      await wrapper.instance().setRandomFilm()

      //expectation
      expect(wrapper.state('film')).toBeInstanceOf(Object)
    })

    it('should throw error if fetch fails', async () => {
      //setup
      window.fetch = jest.fn()
        .mockImplementation(() => Promise.reject(Error('failed to fetch')))
      expected = 'failed to fetch'

      //execution
      await wrapper.instance().setRandomFilm()

      //expectation
      expect(wrapper.state('error')).toEqual(expected)
    })
  })

  describe('toggleFavorite()', () => {
    let mockUrl1, mockUrl2
    beforeEach(() => {
      //setup
      mockUrl1 = 'people/2'
      mockUrl2 = 'planet/3'
      wrapper = shallow(<App />)

    })

    it('should add a favorite to list', () => {
      //setup
      expected = [mockUrl1, mockUrl2]

      //execution
      wrapper.instance().toggleFavorite(mockUrl1)
      wrapper.instance().toggleFavorite(mockUrl2)

      //expectation
      expect(wrapper.state('favorites')).toEqual(expected)

    })

    it('should remove favorite from list', () => {
      //setup
      expected = []

      //execution
      wrapper.instance().toggleFavorite(mockUrl1)
      wrapper.instance().toggleFavorite(mockUrl1)

      //expectation
      expect(wrapper.state('favorites')).toEqual(expected)
    })
  })
  describe('setCurrentFilter()', () => {
    beforeEach(() => {
      wrapper = shallow(<App />)
    })

    it('should change currentFilter state', () => {
      //setup
      expected = 'planet'

      //execution
      wrapper.instance().setCurrentFilter('planet');

      //expectation
      expect(wrapper.state('currentFilter')).toEqual(expected)

    })

    it('should reset min, max counters', () => {
      //setup
      expected = 'planet'
      wrapper.setState({ min: 2, max: 45 })

      //execution
      wrapper.instance().setCurrentFilter('planet');

      //expectation
      expect(wrapper.state('min')).toEqual(0)
      expect(wrapper.state('max')).toEqual(10)
    })
  })
  describe('changeNumber()', () => {
    beforeEach(() => {
      wrapper = shallow(<App />)
    })

    it('should increment min and max range', () => {
      //execution
      wrapper.instance().changeNumber(2)
      //expectation
      expect(wrapper.state('min')).toEqual(2)
      expect(wrapper.state('max')).toEqual(12)
    })

    it('should decrement min and max range', () => {
      //setup
      expected = 'planet'
      wrapper.setState({ min: 12, max: 22 })

      //execution
      wrapper.instance().changeNumber(-2)

      //expectation
      expect(wrapper.state('min')).toEqual(10)
      expect(wrapper.state('max')).toEqual(20)
    })
  })
});