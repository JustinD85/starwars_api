const getData = async (type, options = '') => {
  const response = await fetch(`https://swapi.co/api/${type}${options}`);
  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Error fetching Data');
  }
}

export default { getData };