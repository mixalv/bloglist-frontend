import { useMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'

const User = () => {

  const match = useMatch('/users/:id')
  const users = useSelector(({ users }) => users)
  const user = match ? users.find( user => user.id === match.params.id ) : null
  console.log(user)
  if (user) {
    return(
      <div className="container">
        <h1>{user.name}</h1>
        <h2>added blogs</h2>
        <ul>
          {user.blogs.map( b => {
            return <li key={b.id}>{b.title}</li>
          } )}
        </ul>
      </div>
    )
  }
}

export default User