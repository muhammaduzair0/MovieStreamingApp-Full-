export const movieAPI = async({route}) => {
  console.log(route)
  return await fetch(`${route}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
};
