
export async function findCharacterByName(name) {
  let data = []

  if (name === '') {
    return data
  }

  const url = process.env.REACT_APP_API_URL + name
  try {
    const response = await fetch(url)
    data = await response.json()
  }
  catch (e) {
    throw 'A network error ocurred'
  }

  return data
}

