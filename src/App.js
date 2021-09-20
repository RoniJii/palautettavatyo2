import React, { useState } from 'react';
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import randomInteger from 'random-int';
import Select from 'react-select';
import './App.css'

//  setItems(response.data.results[1].title)
// mahollisesti joka artikkelille oma
// <img src={item.multimedia[0].url} alt=""></img></td>

const URL = 'https://api.nytimes.com/svc/topstories/v2/'
const json = '.json?api-key='
const API_KEY = ''
const search = ["arts", "automobiles", "books", "business", "fashion", "food", "health",
 "home", "insider", "magazine", "movies", "nyregion", "obituaries", "opinion", "politics", 
 "realestate", "science", "sports", "sundayreview", "technology", "theater", "t-magazine", 
 "travel", "upshot", "us", "world"]

 const options = [
  { value: 'arts', label: 'Arts' },
  { value: 'automobiles', label: 'Automobiles' },
  { value: 'books', label: 'Books' },
  { value: 'business', label: 'Business' },
  { value: 'fashion', label: 'Fashion' },
  { value: 'food', label: 'Food' },
  { value: 'health', label: 'Health' },
  { value: 'home', label: 'Home' },
  { value: 'insider', label: 'Insider' },
  { value: 'magazine', label: 'Magazine' },
  { value: 'movies', label: 'Movies' },
  { value: 'nyregion', label: 'Nyregion' },
  { value: 'obituaries', label: 'Obituaries' },
  { value: 'opinion', label: 'Opinion' },
  { value: 'politics', label: 'Politics' },
  { value: 'realestate', label: 'Realestate' },
  { value: 'science', label: 'Science' },
  { value: 'sports', label: 'Sports' },
  { value: 'sundayreview', label: 'Sundayreview' },
  { value: 'technology', label: 'Technology' },
  { value: 'theater', label: 'Theater' },
  { value: 't-magazine', label: 'T-magazine' },
  { value: 'travel', label: 'Travel' },
  { value: 'upshot', label: 'Upshot' },
  { value: 'us', label: 'US' },
  { value: 'world', label: 'World' },
];
 
function App() {

  const [Kategoria, setKategoria] = useState('');
  const [items, setItems] = useState([]);
  const [gate, setGate] = useState('false')
  const [searchgate, setSearchgate] = useState('false')
  const [title, setTitle] = useState('NY times top stories')
  const [selectedOption, setSelectedOption] = useState(null);
  // const [photo, setPhoto] = useState([])

  
  async function start(e) { 
    e.preventDefault()
    if (gate === 'true') {  
      let rnd = search[(randomInteger(search.length))]
      setKategoria(rnd)
      setGate('false')
      console.log("random kategoria = " + Kategoria)}

    if (searchgate === "true") {
      console.log("gate " + searchgate)
      let choosingindex = options.indexOf(selectedOption)
      setKategoria(search[choosingindex])
      console.log("seach " + Kategoria)
      setSearchgate('false')
    }
      
    axios.get(URL + Kategoria + json + API_KEY)
    .then((response) => {
      setTitle(response.data.section)
      setItems(response.data.results)
      // setPhoto(response.data.results[2].multimedia[0].url)
      }
    ) 
} 

  return (
    <form onSubmit={start}>
    <div className="App">
      <header>
    <div>
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}  
      />
    </div>
      <button value={gate} onClick={e => setGate('true')}>Suprise me</button>
      <button value={searchgate} onClick={e => setSearchgate('true')}>Search</button>
      <h1>{title}</h1>
      </header>
      <div id="content">
      
      <table>  
      <tbody>  
        {items.map(item =>(
          <tr key={uuidv4()}>
            <td><a href={item.url} rel="noreferrer">{item.title}</a>
            <p>Written {item.byline}</p></td>
     {/*        <td><figure>
            <img src={item.multimedia[0].url} alt=""></img>
            <figcaption>{item.multimedia[0].copyright}</figcaption></figure></td> */}
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