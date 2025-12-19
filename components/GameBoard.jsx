import Fragment from "./Fragment"
import { useState, useMemo } from "react"
import Confetti from 'react-confetti'
import { useRef, useEffect } from "react"
import { nanoid } from "nanoid"

export default function GameBoard({ imageUrl, rows, cols, aspectRatio = 1 }) {
    const pieceCount = rows * cols

    function generateAllNewFragments() {
        return new Array(pieceCount)
            .fill(null)
            .map((_, index) => ({
                imgID: index,
                isHeld: false,
                index,
                id: nanoid()
            }))
    }

    const [fragments, setFragments] = useState(() => generateAllNewFragments())

    const gameWon = fragments.every((frag) => frag.isHeld) && fragments.every((frag) => frag.index === frag.imgID)

    function regenFragments() {
        if (gameWon) {
            setFragments(() => generateAllNewFragments())
        } else {
            setFragments(prevFrags => prevFrags.map(currFrag =>
                currFrag.isHeld ? currFrag : { ...currFrag, imgID: Math.floor(Math.random() * pieceCount) }
            ))
        }
    }

    const regenButtonRef = useRef(null)

    useEffect(() => {
        if (gameWon && regenButtonRef.current) regenButtonRef.current.focus()
    }, [gameWon])

    const actionButton = (
        <button className="action-button" onClick={regenFragments} ref={regenButtonRef}>
            {gameWon ? "New Game" : "Regenerate"}
        </button>
    )

    function holdButton(id) {
        setFragments(prevFrags => prevFrags.map(currFrag =>
            currFrag.id === id ? { ...currFrag, isHeld: !currFrag.isHeld } : currFrag
        ))
    }

    const fragmentElements = fragments.map(fragObj => (
        <Fragment
            key={fragObj.id}
            imgID={fragObj.imgID}
            rows={rows}
            cols={cols}
            imageUrl={imageUrl}
            isHeld={fragObj.isHeld}
            hold={() => holdButton(fragObj.id)}
        />
    ))

    const BOARD_WIDTH = 600 // px
    const BOARD_HEIGHT = Math.round(BOARD_WIDTH * aspectRatio)

    const boardStyle = useMemo(() => ({
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridAutoRows: `${BOARD_HEIGHT / rows}px`,
        width: `${BOARD_WIDTH}px`,
        height: `${BOARD_HEIGHT}px`,
        alignItems: 'center',
        justifyContent: 'center'
    }), [cols, rows, BOARD_HEIGHT])

    return (
        <main>
            <div className="elementsBoard" style={boardStyle}>
                {fragmentElements}
            </div>
            {actionButton}
            {gameWon && <Confetti />}
            <div aria-live="polite" className="sr-only">
                {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
            </div>
        </main>
    )
}