import React ,{useEffect, useState} from 'react'
import HeroBar from './HeroBar'

 const Test = () => {

    const [percentage, setPercentage] = useState(100);
    
    
    useEffect(() => {
        if(percentage > 0){
            let timeOut = setTimeout(() => setPercentage((percentage) => percentage-1 ), 150)
        }
    }, [percentage])


    return (
        <div>
            <HeroBar value={percentage} labelToShow={percentage} />
        </div>
    )
}

export default Test
