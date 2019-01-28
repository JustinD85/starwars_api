import React from 'react'
import { shallow } from 'enzyme'
import CardArea from './CardArea'
import { vehicle1, vehicle2, people, species, planets } from '../../mockData/'

describe('<CardArea/>', () => {
  let wrapper, expected, getData, mockData,mockChangeNumber

  describe('CardArea Controls', () => {
    beforeEach(() => {
      mockChangeNumber= jest.fn()
      getData = jest.fn().mockImplementation((item) => {
        switch (item) {
          case 'people': return people;
          case 'planets': return planets;
          case 'species': return species;
          case 'vehicles': return vehicle1;
        }
      })

      wrapper = shallow(<CardArea
        getData={getData}
        favorites={[]}
        toggleFavorite={jest.fn()}
        min={1}
        max={0}
        currentFilter={'vehicles'}
        changeNumber={mockChangeNumber}
      />)
    })

    it('should invoke method when clicked', () => {
      //execution
      wrapper.find('.previous').simulate('click')

      //expectation
      expect(mockChangeNumber).toHaveBeenCalledTimes(1)
    })

    it('should invoke method when clicked', () => {
      //execution
      wrapper.find('.next').simulate('click')
      
      //expectation
      expect(mockChangeNumber).toHaveBeenCalledTimes(1)
    })
  })

  describe('setAllData()', () => {
    beforeEach(() => {
      getData = jest.fn().mockImplementation((item) => {
        switch (item) {
          case 'people': return people;
          case 'planets': return planets;
          case 'species': return species;
          case 'vehicles': return vehicle1;
        }
      })

      wrapper = shallow(<CardArea
        getData={getData}
        favorites={[]}
        toggleFavorite={jest.fn()}
      />)
    })

    it('should set planets state', async () => {

      //expectation
      expect(wrapper.state('people').length).toEqual(2)
    })

    it('should set species state', async () => {

      //expectation
      expect(wrapper.state('species').length).toEqual(2)
    })

    it('should set vehicles state', async () => {

      //expectation
      expect(wrapper.state('vehicles').length).toEqual(2)
    })

    it('should set people state', async () => {

      //expectation
      expect(wrapper.state('people').length).toEqual(2)
    })

    it('should set isLoaded state', async () => {

      //execution
      await wrapper.instance().setAllData()

      //expectation
      expect(wrapper.state('isLoaded')).toEqual(true)
    })

  })

  describe('setAllOfType()', () => {
    beforeEach(() => {
      getData = jest.fn().mockImplementation((item) => {
        switch (item) {
          case 'people': return people
          case 'planet': return planets
          case 'species': return species
          case 'vehiclesv2': return vehicle2
          default: return vehicle1
        }
      })

      wrapper = shallow(<CardArea
        getData={getData}
        favorites={[]}
      />)
    })

    it('should set state from fetch', async () => {

      //expectation
      expect(wrapper.state('vehicles').length).toEqual(2)
    })

    it('should call itself recursively', async () => {

      //execution
      wrapper.instance().setAllOfType('vehicles', 'v2')

      //expectation
      expect(getData).toHaveBeenCalledWith('vehiclesv2')
    })

  })

  describe('lookUp()', () => {
    it('should return correct query', async () => {

      //setup
      expected = 'https://swapi.co/api/vehicles/1/'

      //execution
      await wrapper.instance().setAllOfType('vehicles')
      const result = wrapper.instance().lookUp('vehicles', 'url', expected)

      //expectation
      expect(result.url).toEqual(expected)
    })

  })
  describe('setCard()', () => {
    beforeEach(() => {
      getData = jest.fn().mockImplementation((item) => {
        switch (item) {
          case 'people': return people;
          case 'planets': return planets;
          case 'species': return species;
          case 'vehicles': return vehicle1;
        }
      })

      wrapper = shallow(<CardArea
        getData={getData}
        favorites={[]}
        toggleFavorite={jest.fn()}
      />)
    })

    it('should return person card', () => {
      
      //setup
      const person = people.results[0]

      //expectation
      expect(wrapper.instance().setCard(person).length).toBe(3)
    })

    it('should return person card even with no species', () => {

      //setup
      const person = people.results[1]

      //expectation
      expect(wrapper.instance().setCard(person).length).toBe(3)
    })

    it('should return planet card', () => {

      //setup  
      const planet = planets.results[0]

      //expectation
      expect(wrapper.instance().setCard(planet).length).toBe(3)
    })

    it('should return vehicle card', () => {

      //setup
      const vehicle = vehicle1.results[0]

      //expectation
      expect(wrapper.instance().setCard(vehicle).length).toBe(3)
    })

  })

  describe('getCard()', () => {

    it('should return a Card Component', () => {

      //setup
      expected = 'Sand Crawler'
      const mockData = wrapper.state('vehicles')[0]
      mockData.type = 'vehicles'

      //execution
      const result = wrapper.instance().getCard(mockData).props.name

      //expectation
      expect(result).toEqual(expected)
    })
  })

  describe('updateFavorites()', () => {
    let url = 'vehicles/1/'
    beforeEach(() => {
      wrapper = shallow(<CardArea
        getData={getData}
        favorites={[]}
        min={0}
        max={10}
        toggleFavorite={jest.fn()}
      />)
    })

    it('should make a card a favorite', () => {

      //setup
      const key = 'vehicles'
      const predicate = (e) => e.isFavorite

      //execution
      wrapper.instance().updateFavorites(url)

      //expectation
      expect(wrapper.state(key).some(predicate)).toBe(true)
    })

    it('should make a card not favorite', () => {

      //setup
      const key = 'vehicles'
      const predicate = (e) => e.isFavorite

      //execution
      wrapper.instance().updateFavorites(url)
      wrapper.instance().updateFavorites(url)

      //expectation
      expect(wrapper.state(key).some(predicate)).toBe(false)
    })
  })

  describe('getFavorites()', () => {
    beforeEach(() => {
      getData = jest.fn().mockImplementation((item) => {
        switch (item) {
          case 'people': return people;
          case 'planets': return planets;
          case 'species': return species;
          case 'vehicles': return vehicle1;
        }
      })

      wrapper = shallow(<CardArea
        getData={getData}
        favorites={[]}
        toggleFavorite={jest.fn()}
      />)
    })

    it('should return all favorites', () => {

      //setup
      const url1 = 'vehicles/1/'
      const url2 = 'vehicles/2/'

      //execution
      wrapper.instance().updateFavorites(url1)
      wrapper.instance().updateFavorites(url2)
      const result = wrapper.instance().getFavorites(0, 1).filter(e => e)

      //expectation
      expect(result.length).toEqual(2)
    })
  })

  describe('getCardsOfType()', () => {
    beforeEach(() => {
      getData = jest.fn().mockImplementation((item) => {
        switch (item) {
          case 'people': return people;
          case 'planets': return planets;
          case 'species': return species;
          case 'vehicles': return vehicle1;
        }
      })

      wrapper = shallow(<CardArea
        getData={getData}
        favorites={[]}
        toggleFavorite={jest.fn()}
      />)
    })

    it('should return all cards of a type', () => {

      //execution and setup
      const result = wrapper.instance().getCardsOfType('vehicles', 0, 1).length;

      //expectation
      expect(result).toEqual(2)
    })
  })
})