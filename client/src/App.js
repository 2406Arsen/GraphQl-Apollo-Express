import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import './App.css'
import { CREATE_USER } from './mutations/user';
import { GET_ALL_USERS } from './query/user';

function App() {
  const { data, loading, error } = useQuery(GET_ALL_USERS)
  const [newUser] = useMutation(CREATE_USER)

  const [users, setUsers] = useState([])
  const [username, setUsername] = useState('')
  const [age, setAge] = useState(0)

  useEffect(() => {
    if (!loading) {
      setUsers(data.getAllUsers)
    }
  }, [data, loading])
  
 const addUser = (e) => {
    e.preventDefault()
    newUser({
      variables: {
        input: {
          username,
          age
        }
      }
    }).then(({ data }) => {
      console.log(data.createUser)
      setUsername('')
      setAge(0)
    })
  }

  if (loading) {
    return <h1>loading...</h1>
  }

 
  return (
    <div className="App">
      <from>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} min={0} />
        <div className="btns">
          <button onClick={(e) => addUser(e)}>Create</button>
          <button>Get</button>
        </div>
          </from>
        <div>
          {
            users.map((user, i) => (
              <div className='user' key={i}>{user.id}. {user.username} {user.age}</div>
            ))
          }
        </div>
    </div>
  );
}

export default App;
