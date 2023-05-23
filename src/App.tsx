import { useState } from "react";
import Title from "./components/Title";
import Form from "./components/Form";
import Results from "./components/Results";
import './App.css';

type ResultsStateType = {
  country: string;
  cityName: string;
  temperature: string;
  conditionText: string;
  icon: string;
}

function App() {
  const [city, setCity] = useState<string>("");
  const [results, setResults] = useState<ResultsStateType>({
    country: "",
    cityName: "",
    temperature: "",
    conditionText: "",
    icon: ""
  })
    const getWeather = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetch(`https://api.weatherapi.com/v1/current.json?key=e97d21e4e00e4b72b3321819232305&q=${city}&aqi=no`)
            .then(res => res.json())
            .then(data => {
              setResults({
                country: data.location.country,
                cityName: data.location.name,
                temperature: data.current.temp_c ,
                conditionText: data.current.condition.text,
                icon: data.current.condition.icon
              })
            })
    }
  return (
    <div className="wrapper">
      <Title />
      <Form setCity={setCity} getWeather={getWeather}/>
      <Results results={results}/>
    </div>
  );
}

export default App;
