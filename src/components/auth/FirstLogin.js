import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import HeroButton from '../misc/HeroButton';
import FormContainer from './FormContainer'


const FirstLogin = () => {

  const history = useHistory();
  const [nickField, setNickField] = useState("");

  const handleClick = (e) =>{
    axios.post('http://localhost:8762/api/user/create',
      {
        nick: nickField
      }, 
      {withCredentials: true}
    ).then((response)=>{
      console.log(response)
      onClose()
    }).catch((err) => {
      console.log(err.response);
    })
  }

  const onClose = (e) => {
    history.push('/home')
  }
    
  return (
    <FormContainer>
        <TextField
            margin="dense"
            id="nick"
            label="Nickname"
            type="text"
            onChange={(event) => setNickField(event.target.value)}
            value={nickField}
            autoComplete="off"
        />
      <HeroButton onClick={handleClick}>
        Send
      </HeroButton>
    </FormContainer>
  )
}

export default FirstLogin;