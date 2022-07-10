import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { usersInitializer } from '../reducers/usersReducer'
import { useEffect } from 'react'
import { Table } from 'react-bootstrap'

const Users = () => {

  const dispatch = useDispatch()
  useEffect( () => {
    dispatch(usersInitializer())
  }, [] )

  const users = useSelector(({ users }) => users)
  const user = useSelector(({ currentUser }) => currentUser)
  return(
    <div className="container">
      <h1>Users</h1>
      <Table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {user && users.map( (u) => {
            return(
              <tr key={u.id}>
                <td>
                  <Link to={`/users/${u.id}`} >{u.name}</Link>
                </td>
                <td>
                  {u.blogs.length}
                </td>
              </tr>
            )
          } )}
        </tbody>
      </Table>
    </div>
  )
}

export default Users