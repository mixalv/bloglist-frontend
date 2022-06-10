const Login = ({ logout, handleLogin, username, setUsername, password, setPassword, user }) => {
  if (user) return(
    <div>
      <h2>blogs</h2>
      <div>
        {user.username} logged in
        <button onClick={logout}>log out</button>
      </div>
    </div>
  )
  return(
    <div>
      <h1>Login to application</h1>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="text"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default Login