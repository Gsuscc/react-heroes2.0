import React, { useContext } from 'react'
import { GlobalContext } from '../../state/GlobalState'
import './ArmySlot.css'

const ArmySlot = () => {
    const {army} = useContext(GlobalContext)

    console.log(army)


    return (
        <div className="slots">
            <img className="slot" alt="empty" src={army[0] && army[0].image.url}></img>
            <img className="slot" alt="empty" src={army[1] && army[1].image.url}></img>
            <img className="slot" alt="empty" src={army[2] && army[2].image.url}></img>
            <img className="slot" alt="empty" src={army[3] && army[3].image.url}></img>
            <img className="slot" alt="empty" src={army[4] && army[4].image.url}></img>
        </div>
    )
}
export default ArmySlot