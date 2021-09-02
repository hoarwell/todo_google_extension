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
  const [added, setAdded] = useState("");
  const [selected, setSelected] = useState("");
  const [weather, setWeather] = useState("");
  const [asking, setAsking] = useState(false);
  const [count, setCount] = useState(0);
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
  let num = 1;
  const countComplete = (todos) => {
    todos.forEach((todo) => {
        if(todo.complete === true){
            setCount(num++);
        }
    })
  }

  const getWeather = () => {
    axios.get(`http://ip-api.com/json`)
      .then((res) => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${res.data.city}&appid=${API_KEY}`)
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
        <Weather weather = { weather } />
        <Form text = { text } setText = { setText } todos = { todos } setTodos = { setTodos } setAdded = { setAdded } setNeedRefresh = { setNeedRefresh } />
        <List count = { count } todos = { todos } selected = { selected } setSelected = { setSelected } asking = { asking } setAsking = { setAsking } setNeedRefresh = { setNeedRefresh } />
        <Footer />
    </div>
  );
}

export default App;
