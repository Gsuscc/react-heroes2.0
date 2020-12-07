import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';


export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const headers = {
        "Access-Control-Allow-Origin": "*", 
      }

    const handleClick = (e) =>{
        axios.post('http://localhost:8762/api/auth/login',{
        email: username,
        password: password
      }).then((response)=>{
        console.log(response)
        onClose()
      }).catch((err) => {
        console.log(err);
      })
    }

    const onClose = (e) => {
        setUsername(null);
        setPassword(null);
    }
    
    return (
        <div>
            <TextField
                margin="dense"
                id="name"
                label="Username"
                type="username"
                onChange={(event) => setUsername(event.target.value)}
                value={username}
                autoComplete="off"
            />
            <TextField
                margin="dense"
                id="name"
                label="Password"
                type="password"
                onChange={(event) => setPassword(event.target.value)}
                value={password}
            />
            <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          {/* <Button onClick={handleRegisterClick} color="primary">
            Register
          </Button> */}
          <Button onClick={handleClick} color="primary">
            Login
          </Button>
        </div>
    )
}
