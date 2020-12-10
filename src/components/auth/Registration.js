import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { GlobalContext } from "../../state/GlobalState";
import TextField from '@material-ui/core/TextField';
import HeroButton from '../misc/HeroButton';
import FormContainer from './FormContainer'


const Registration = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [isMatcing, setIsMatching] = useState(false)
  const [confirmPass, setConfirmPass] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleClick = (e) =>{
      if(isMatcing){
        axios.post('http://localhost:8762/api/auth/register',{
        email: email,
        password: password
        }, {withCredentials: true})
        .then((response)=>{
            history.push('/login')
            console.log(response)
        }).catch((err) => {
            console.log(err.response);
            setError(err.response.data)
        })
    }
  }
  useEffect(() => {
    if(error){
        setError("");
    }
    if(password === confirmPass){
        setIsMatching(true)
    }else{
        setIsMatching(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password, confirmPass, email])

  const handleGuest = (e) => {
    history.push('/heroes')
  }
    
  return (
    <FormContainer>
      <div className="error-container">
        {!isMatcing && <div>Passwords are not matching</div>}
        {error && <div>{error}</div>}
        </div>
        <TextField
            margin="dense"
            id="email"
            label="E-mail"
            type="email"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            autoComplete="off"
        />
        <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
        />
        <TextField
            margin="dense"
            id="confirm"
            label="Confirm Password"
            type="password"
            onChange={(event) => setConfirmPass(event.target.value)}
            value={confirmPass}
            autoComplete="off"
        />
      <HeroButton onClick={handleClick}>
        Register
      </HeroButton>
      <div>
        Or you can 
        <HeroButton onClick={handleGuest}>
          Continue
        </HeroButton>
        as a Guest
      </div>
    </FormContainer>
  )
}

export default Registration;