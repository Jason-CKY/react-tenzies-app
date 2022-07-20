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


    const [bestRecord, setBestRecord] = React.useState(JSON.parse(localStorage.getItem("bestRecord")) || {
        numRolls: null
    })
    const [Dices, setDices] = React.useState(initializeDice())
    const [gameState, setGameState] = React.useState({
        win: false,
        numRolls: null
    })

    const diceElements = Dices.map((Die) => (
        <Dice 
            key={Die.id}
            id={Die.id}
            number={Die.number}
            selected={Die.selected}
            handleClick={selectDie}
            winGame={gameState.win}
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
            setGameState(prevGameState => ({...prevGameState, win: true}))
        }
    }, [Dices])

    React.useEffect(()=>{
        if (gameState.win && (!bestRecord.numRolls || gameState.numRolls < bestRecord.numRolls)){
            setBestRecord(oldBestRecord => ({...oldBestRecord, numRolls: gameState.numRolls}))
            localStorage.setItem("bestRecord", JSON.stringify({...bestRecord, numRolls: gameState.numRolls}))
        }        
    }, [gameState, bestRecord])

    function rollUnlockedDice(){
        setDices(oldDices => oldDices.map(oldDie => oldDie.selected ? oldDie : {...oldDie, number: rollDie()}))
        setGameState(oldGameState => ({...oldGameState, numRolls: oldGameState.numRolls + 1}))
    }

    function selectDie(dieId){
        setDices(oldDices => oldDices.map(oldDie => (dieId === oldDie.id && !gameState.win) ? {...oldDie, selected: !oldDie.selected} : oldDie))
    }

    function resetGame(){
        setDices(initializeDice())
        setGameState({
            win: false,
            numRolls: null
        })
    }

    const buttonStyles = {
        width: gameState.win ? "fit-content" : "5vw"
    }

    return (
        <div className="Tenzies">
            {gameState.win && <Confetti />}
            <h1>Tenzies</h1>
            <p>Roll until all dice are the same. Click each dice to freeze it at its current value between rolls.</p>
            <div className="Tenzies--dice">
                {diceElements}
            </div>
            <button
                style={buttonStyles} 
                onClick={gameState.win ? resetGame : rollUnlockedDice} 
                className="Tenzies--button"
            >
            {gameState.win ? "Play Again!" : "Roll"}
            </button>
            <footer>{ bestRecord.numRolls ? `Best record run: ${bestRecord.numRolls} rolls` : `Best record run: `}</footer>
        </div>
    )
}