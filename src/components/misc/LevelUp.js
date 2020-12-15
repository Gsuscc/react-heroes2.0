import React from 'react'
import levelUp from '../../img/levelUp.png';
import './LevelUp.css'

const LevelUp = () => {
    return (
        <div className="animated bounceOut">
            <img src={levelUp} alt="level up"/>
        </div>
    )
}

export default LevelUp
