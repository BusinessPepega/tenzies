
import './App.css';
import Die from "./components/Die"
import React from "react"
import {nanoid} from "nanoid"


function App() {

  function generateNewDie(){
    const randomDice = Math.ceil(Math.random() * 6)
      return {
          value : randomDice, 
          isHeld : false,
          id: nanoid(),  
      }          
  }

  function allNewDice() {
    const newDice = []    
    let i=10
    while (i>0) {    
            newDice.push(generateNewDie())
      i--
    }
    //console.log(newDice)
    return newDice
  }
  
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
    
    React.useEffect(() => {
      const allHeld = dice.every(die => die.isHeld)
      const firstValue = dice[9].value
      const allSameValue = dice.every(die => die.value === firstValue)
      if (allHeld && allSameValue) {
        setTenzies(!tenzies)
        //console.log("you won")
      }            
    }, [dice])
    
  
    function rollDice() {
      if(!tenzies) {
          setDice(oldDice => oldDice.map(die => {
              return die.isHeld ? 
                  die :
                  generateNewDie()
          }))
      } else {
          setTenzies(false)
          setDice(allNewDice())
      }
  }
  
  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? {...die, isHeld : !die.isHeld} : die
    }))
}
  
  const diceElements = dice.map(die => <Die holdDice={() => holdDice(die.id)} key={die.id} value={die.value} isHeld={die.isHeld} />)

  return (
    <main>      
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. 
        Click each die to freeze it at its current value between rolls.</p>
      <div className='dice-container'>
        {diceElements}        
      </div>
      <button 
        className="roll-dice" 
        onClick={rollDice}>
          {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
