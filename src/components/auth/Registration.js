import React, {useState, useContext} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { GlobalContext } from "../../state/GlobalState";
import TextField from '@material-ui/core/TextField';
import HeroButton from '../misc/HeroButton';
import FormContainer from './FormContainer'


const Registration = () => {
  const history = useHistory();
//   const { setIsReady } = useContext(GlobalContext);
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = (e) =>{
      axios.post('http://localhost:8762/api/auth/register',{
      email: email,
      password: password
    }, {withCredentials: true}).then((response)=>{
      console.log(response)
    //   setIsReady(false)
    }).catch((err) => {
      console.log(err);
    })
  }

  const handleGuest = (e) => {
    history.push('/heroes')
  }
    
  return (
    <FormContainer>
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
            id="confirm"
            label="Confirm Email"
            type="email"
            onChange={(event) => setConfirmEmail(event.target.value)}
            value={confirmEmail}
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