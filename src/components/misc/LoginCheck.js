import React, {useEffect, useContext} from 'react'
import {GlobalContext} from '../../state/GlobalState'


const LoginCheck = (props) => {

    const {checkLoginState} = useContext(GlobalContext)
    
    useEffect(() => {
        checkLoginState();
      }, [checkLoginState])


    return (
        <React.Fragment>
            {props.children}
        </React.Fragment>
    )
}
export default LoginCheck
