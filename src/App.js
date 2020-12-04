import { useState } from 'react';
import Card from './components/card/Card';
import axios from "axios";

const App = () => {
  
  const [card, setCard] = useState(null);

  if (!card) {

    axios.get(`http://localhost:8762/api/hero/get/69`)
      .then((response) => {
        setCard(response.data);
      })
      .catch((err) => {
        console.log(err)
      });
    
  }
    
  console.log(card)

  return (    
    <div className="App">
      <div style={{margin: '100px'}}>
        {card && <Card isFlippable={true} isZoomable={true} card={card}/>}
        
      </div>
    </div>
  );
}

export default App;
