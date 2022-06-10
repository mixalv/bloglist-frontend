import axios from 'axios'
const baseUrl = '/api/blogs'

const genToken = () => {
  return `bearer ${JSON.parse(window.localStorage.getItem('loggedUser')).token}`
}


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createNewBlog = async (blog) => {
  const token = genToken()
  const config = {
    headers: { Authorization:  token },
  }
  const response = await axios
    .post(baseUrl, blog, config)
  return response.data
}

const updateBlog = async (blog) => {
  const token = genToken()
  const config = {
    headers: { Authorization:  token },
  }
  const response = await axios
    .put(`${baseUrl}/${blog.id}`, blog, config)
  return response.data

}

const deleteBlog = async (id) => {
  const token = genToken()
  const config = {
    headers: { Authorization:  token },
  }
  const response = await axios
    .delete(`${baseUrl}/${id}`, config)
  return response.data
}

const forExport = {
  getAll,
  createNewBlog,
  updateBlog,
  deleteBlog
}

export default forExport