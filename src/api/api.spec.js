import API from './api';

describe('API', () => {
  let type, options, mockStarWarsData;
  beforeEach(() => {
    type = 'planets'
    mockStarWarsData = [{ planet: 'Mars', population: 9000 }]
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(mockStarWarsData),
      ok: true,
    }))
  })

  it('should call fetch with correct params', () => {
    //setup
    const expected = 'https://swapi.co/api/planets';
    //execution
    API.getData(type)
    //expectation
    expect(window.fetch).toHaveBeenCalledWith(expected);
  })

  it('should call feth with correct optional params', () => {
    const expected = 'https://swapi.co/api/planets/?page=2';
    const options = '/?page=2'
    //execution
    API.getData(type, options)
    //expectation
    expect(window.fetch).toHaveBeenCalledWith(expected);
  })

  it('should return starwars items given correct params', async () => {
    //setup
    const expected = mockStarWarsData;
    //execution
    const result = await API.getData(type)
    //expect
    expect(result).toEqual(expected)
  })

  it('should throw an error if something is wrong', async () => {
    //setup
    const expectedError = Error('Error fetching Data')
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      status: 401,
      ok: false,
    }))
    //execution & expectation
    await expect(API.getData(type)).rejects.toEqual(expectedError)
  })
})