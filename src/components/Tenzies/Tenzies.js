import React from 'react'
import Dice from "../Dice/Dice"
import "./Tenzies.css"
import Confetti from 'react-confetti'

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
    const [winGame, setWinGame] = React.useState(false)
    
    const diceElements = Dices.map((Die) => (
        <Dice 
            key={Die.id}
            id={Die.id}
            number={Die.number}
            selected={Die.selected}
            handleClick={selectDie}
            winGame={winGame}
        />
    ))
    
    React.useEffect(()=>{
        let winCondition = true;
        for (let i=0; i<Dices.length; i++){
            if (Dices[i].number !== Dices[0].number || !Dices[i].selected){
                winCondition=false;
            }
        }
        if (winCondition){
            setWinGame(true)
        }
    }, [Dices])

    function rollUnlockedDice(){
        setDices(oldDices => oldDices.map(oldDie => oldDie.selected ? oldDie : {...oldDie, number: rollDie()}))
    }

    function selectDie(dieId){
        setDices(oldDices => oldDices.map(oldDie => (dieId === oldDie.id && !winGame) ? {...oldDie, selected: !oldDie.selected} : oldDie))
    }

    function resetGame(){
        setDices(initializeDice())
        setWinGame(false)
    }

    const buttonStyles = {
        width: winGame ? "fit-content" : "5vw"
    }
    return (
        <div className="Tenzies">
            {winGame && <Confetti />}
            <h1>Tenzies</h1>
            <p>Roll until all dice are the same. Click each dice to freeze it at its current value between rolls.</p>
            <div className="Tenzies--dice">
                {diceElements}
            </div>
            <button
                style={buttonStyles} 
                onClick={winGame ? resetGame : rollUnlockedDice} 
                className="Tenzies--button"
            >
            {winGame ? "Play Again!" : "Roll"}
            </button>
        </div>
    )
}