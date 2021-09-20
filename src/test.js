import React,{useState} from 'react'

//top 5 articles
//random kategoria
//search
/* const API_KEY = '1' */
// const URL = 'v1.formula-1.api-sports.io'
const katergoria = 'home'
const test = 'https://api.nytimes.com/svc/topstories/v2/' + katergoria + '.json?api-key='
const API_KEY = 'DPbdZ17msGvIcBi1V0pIX44VUQ1rS4vn'

export default function App() {
  const [drink, setDrink] = useState('')
/*   const [] = useState()
  const [] = useState()
  const [] = useState()
  const [] = useState()
  const [] = useState() */

  async function convert(e) {
    e.preventDefault()
    console.log('sisällä ollaan')
    try {
      const response = await fetch(test + API_KEY)
      if (response.ok) {

        const json = await response.json()
        setDrink(json.results)
      } else {
        alert('Error retrieving exchange rate.')
        console.log(response)
      }
    } catch(err) {
      alert(err)
    }

    }

 
  return (
    <div id="container">
      <form onSubmit={convert}>
{/*           <div>
            <label></label>
            <input type="number" step="0.1" value={} onChange={e => setConst(e.target.value)}/>
            <output></output>
          </div> */}

          <div>
            <label>Tulos</label>
            
            <output>{drink}</output>
            <table>
        <tbody>
        {
            drink.map((drink, index) => 
           <tr key={index}>
             <td>{drink.title}</td>
             <td>{drink.url}</td>
             <td>{drink.byline}</td>
           </tr>
            )}
                 </tbody>
               </table>
               <div>
               <button>Calculate</button>
               </div>
          </div>
      </form>
    </div>
  )
}