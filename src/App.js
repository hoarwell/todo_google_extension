import React, { useEffect, useState } from 'react';
import { dbService } from 'fbase';
import axios from 'axios';
import './App.css';
import Clock from 'components/Clock';
import Form from 'components/Form';
import List from 'components/List';
import Weather from 'components/Weather';
import Footer from 'components/Footer';

function App() {
  const [time, setTime] = useState("");
  const [text, setText] = useState("");
  const [todos, setTodos] = useState("");
  const [selected, setSelected] = useState("");
  const [weather, setWeather] = useState("");
  const [air, setAir] = useState("");
  const [asking, setAsking] = useState(false);
  const [completed, setCompleted] = useState(0);
  const [needRefresh, setNeedRefresh] = useState(false);

  const API_KEY = "9a0073a226700978e96bb74160fd450a";

  const getTodos = () => {
      dbService.collection("todos").orderBy("date", "desc").onSnapshot((snapshot) => {
          const Array = snapshot.docs.map((doc) => ({
              ...doc.data(),
          }))
          setTodos(Array);
          countComplete(Array);
          setNeedRefresh(false);
      });
  }

  let num = 0;
  const countComplete = (todos) => {
    todos.forEach((todo) => {
        if(todo.complete === true){
            num = num + 1;
            setCompleted(num);
        }
    })
    if(todos.length === 0){
      setCompleted(0);
    }
  }

  const getWeather = () => {
    axios.get(`https://geolocation-db.com/json/`)
      .then((res) => {
        axios.get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${res.data.latitude}&lon=${res.data.longitude}&appid=${API_KEY}`)
          .then((res)=> {
            setAir(res.data.list[0].main.aqi)
          })
          .catch((error) => {
            console.log(error)
          })
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${res.data.state}&appid=${API_KEY}&lang=kr`)
          .then((res) => {
            setWeather(res.data);
          })
          .catch((error) => {
            console.log(error);
          })
      });
  }

  useEffect(() => {
      if(needRefresh){
        getTodos();
      }
  })

  useEffect(() => {
      getTodos();
      getWeather();
  }, [])

  return (
    <div className="App">
        <Clock time = { time } setTime = { setTime } />
        <Weather weather = { weather } air = { air } />
        <Form text = { text } setText = { setText } todos = { todos } setTodos = { setTodos } setNeedRefresh = { setNeedRefresh } />
        <List completed = { completed } todos = { todos } selected = { selected } setSelected = { setSelected } asking = { asking } setAsking = { setAsking } setNeedRefresh = { setNeedRefresh } />
        <Footer />
    </div>
  );
}

export default App;
