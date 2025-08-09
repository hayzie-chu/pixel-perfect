import Fragment from "./Fragment"
import { useState } from "react"
import Confetti from 'react-confetti'
import { useRef, useEffect } from "react"

import { nanoid } from "nanoid"


export default function GameBoard() {

    const fragmentArray = ["../pictures/row-1-column-1.jpg", "../pictures/row-1-column-2.jpg", 
        "../pictures/row-1-column-3.jpg", "../pictures/row-1-column-4.jpg",
        "../pictures/row-1-column-5.jpg", "../pictures/row-2-column-1.jpg",
        "../pictures/row-2-column-2.jpg", "../pictures/row-2-column-3.jpg",
        "../pictures/row-2-column-4.jpg", "../pictures/row-2-column-5.jpg"]

    function generateAllNewFragments() {
        return new Array(fragmentArray.length)
            .fill([])
            .map((item, index) => ({
                imgID: index,
                // imgID : Math.floor(Math.random() * fragmentArray.length), 
                isHeld : false,
                index: index,
                id: nanoid()
            }
        ))
    }

    const [fragments, setFragments] = useState(() => generateAllNewFragments())

    const gameWon = fragments.every((frag) => frag.isHeld) 
        && fragments.every((frag) => frag.index == frag.imgID)

    function regenFragments() {
        console.log("regenerated")
        if (gameWon) {
            setFragments(() => generateAllNewFragments())
        } else {
            setFragments(prevFrags => prevFrags.map(currFrag =>
                currFrag.isHeld ? currFrag : {...currFrag, imgID : Math.floor(Math.random() * fragmentArray.length)}
            ))
        }
    }

    const regenButtonRef = useRef(null)

    useEffect(() => {
      if (gameWon) regenButtonRef.current.focus()  
    }, [gameWon])

    const actionButton = 
            <button className="action-button" onClick={regenFragments} ref={regenButtonRef}>
                {gameWon ? "New Game" : "Regenerate"}
            </button>

    function holdButton(id) {
        console.log(id)
        setFragments(prevFrags => prevFrags.map(currFrag => 
                currFrag.id === id ? {...currFrag, isHeld: !currFrag.isHeld} : currFrag
            )
        )
    }

    const fragmentElements = fragments.map(fragObj => (
            <Fragment 
                key={fragObj.id} 
                imgID={fragObj.imgID}
                image={fragmentArray[fragObj.imgID]} 
                isHeld={fragObj.isHeld}
                hold={() => holdButton(fragObj.id)} 
            />
    ))

    return (
        <main>
            <div className="elementsBoard">
                {fragmentElements}
            </div>
            {actionButton}
            {gameWon && <Confetti
                // width={width}
                // height={height}
            />}
            <div aria-live="polite" className="sr-only">
                {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
            </div>
        </main>
    )
}