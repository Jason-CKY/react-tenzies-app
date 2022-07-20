import React from 'react'
import "./Dice.css"

export default function Dice(props){
    const styles = {
        backgroundColor: props.selected ? "#59E391" : "#FFFFFF"
    }
    return (
        <div
         className="dice"
         style={styles}
         onClick={() => props.handleClick(props.id)}
        >
            {props.number}
        </div>
    )
}