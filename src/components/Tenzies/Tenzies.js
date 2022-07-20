import React from 'react'
import Dice from "../Dice/Dice"
import "./Tenzies.css"

export default function Tenzies(){

    function rollDie(){
        return Math.ceil(Math.random() * 6)
    }

    function initializeDice(){
        let dices = []
        for (let i=0; i<10; i++){
            dices.push({
                id: i,
                number: rollDie(),
                selected: false
            })
        }
        return dices
    }

    const [Dices, setDices] = React.useState(initializeDice())

    
    const diceElements = Dices.map((Die) => (
        <Dice 
            key={Die.id}
            id={Die.id}
            number={Die.number}
            selected={Die.selected}
            handleClick={selectDie}
        />
    ))


    function rollUnlockedDice(){
        setDices(oldDices => oldDices.map(oldDie => oldDie.selected ? oldDie : {...oldDie, number: rollDie()}))
    }

    function selectDie(dieId){
        setDices(oldDices => oldDices.map(oldDie => dieId === oldDie.id ? {...oldDie, selected: !oldDie.selected} : oldDie))
    }

    return (
        <div className="Tenzies">
            <h1>Tenzies</h1>
            <p>Roll until all dice are the same. Click each dice to freeze it at its current value between rolls.</p>
            <div className="Tenzies--dice">
                {diceElements}
            </div>
            <button onClick={rollUnlockedDice} className="Tenzies--button">Roll</button>
        </div>
    )
}