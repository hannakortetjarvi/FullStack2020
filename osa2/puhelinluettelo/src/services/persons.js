import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

/**
 * Get information of every person
 */
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

/**
 * Posts a new person
 */
const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

/**
 * Deletes person
 */
const deletePerson = id => {
  const URL = `${baseUrl}/${id}`
  const request = axios.delete(URL)
  return request.then(response => response.data)
}

/**
 * Updates person's information
 */
const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default { getAll, create, update, deletePerson }