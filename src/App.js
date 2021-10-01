import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import randomInteger from 'random-int';
import Select from 'react-select';
import './App.css'

// automobile, nyregion, techonology
// laske uutisten määrä? 
//  "technology",
//filter: grayscale(100%)
// material design
//use effectiä ja tuota siistimmäksi kuhan on githubissa

const URL = 'https://api.nytimes.com/svc/topstories/v2/'
const json = '.json?api-key='
const API_KEY = 'DPbdZ17msGvIcBi1V0pIX44VUQ1rS4vn'
const search = ["arts", "automobiles", "books", "business", "fashion", "food", "health",
 "home", "insider", "magazine", "movies", "nyregion", "obituaries", "opinion", "politics", 
 "realestate", "science", "sports", "sundayreview", "theater", "t-magazine", 
 "travel", "upshot", "us", "world"]

const options = []
 
function App() {

  const [Kategoria, setKategoria] = useState('');
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('Home')
  const [updated, setUpdated] = useState()
  const [selectedOption, setSelectedOption] = useState(null);
 
  useEffect(() => {
    for (let i = 0; i < search.length; i++) {
      options.push({value: search[i], label: search[i].charAt(0).toUpperCase() + search[i].slice(1)})
     }
     console.log(options)
     axios.get(URL + 'home' + json + API_KEY)
     .then((response) => {
       setUpdated(response.data.last_updated)
       setItems(response.data.results)
     }).catch(error => {
       alert(error)
     })
    },[])
    
    async function start(e) { 
      e.preventDefault()
      axios.get(URL + Kategoria + json + API_KEY)
      .then((response) => {
        setTitle(response.data.section)
        setUpdated(response.data.last_updated)
        setItems(response.data.results)
      }).catch(error => {
        alert(error)
      })

    }  
  return (
    <form onSubmit={start}>
    <div className="App">
      <header>
          <div>
            <h1>NY TIMES Top stories</h1>
          </div>
          <div className="search">
          <h3>{title} last update date on {updated}</h3>
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}  
            />
          </div>
        <div className="btn">
          <button style={{margin: 10}} value={Kategoria} onClick={e => setKategoria(search[(randomInteger(search.length))])}>Suprise me</button>
          <button value={Kategoria} onClick={e => setKategoria(search[options.indexOf(selectedOption)])}>Search</button>
        </div>
        
    </header>
      <div id="content">
        
      <table>  
      <tbody>  
        {items.map(item =>(
          <tr key={uuidv4()}>
            <td><a href={item.url} rel="noreferrer">{item.title}</a>
            <p className="by">Written {item.byline}</p>
            <figure>
            <img src={item.multimedia[0].url} alt=""></img>
            <figcaption>Photo by {item.multimedia[0].copyright}</figcaption></figure></td>
          </tr>
        ))}
    </tbody>
    </table>
    </div>
     </div>
     </form>
  );
}

export default App;