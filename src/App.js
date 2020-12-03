import Card from './components/card/Card'

function App() {
  return (
    <div className="App">
      <div style={{margin: '100px'}}>
        <Card isFlippable={true} isZoomable={true}/>
      </div>
    </div>
  );
}

export default App;
