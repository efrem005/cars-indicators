import './App.css';
import Status from './components/Status';
import useMqtt from './hook/useMqtt'
function App() {

    const { priora, statusBme280, statusCars, statusPriora, volt } = useMqtt()

  return (
    <div className="App">
      <header className="App-header">
        <Status statusBme280={statusBme280} statusCars={statusCars} statusPriora={statusPriora} priora={priora} volt={volt} />
      </header>
    </div>
  );
}

export default App;
