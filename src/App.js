import Countries from "./component/Countries";
import "./App.css";
import CountryDetails from "./component/CountryDetails";
import { Routes,Route} from "react-router-dom";

function App() {
  return (
    <><div className="App-header">
      Лаб11
    </div>
    <div>
        <Routes>
          <Route path="/" element={<Countries />} />
          <Route path="/CountryDetails/:code" element={<CountryDetails />} />
        </Routes>
      </div>
    </>
  );
}

export default App;