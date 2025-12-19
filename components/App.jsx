import { useState } from "react"
import GameBoard from "./GameBoard"

export default function App() {
    const [imageUrl, setImageUrl] = useState("")
    const [rows, setRows] = useState(3)
    const [cols, setCols] = useState(5)
    const [aspectRatio, setAspectRatio] = useState(1)
    const [started, setStarted] = useState(false)

    function handleFileChange(e) {
        const file = e.target.files?.[0]
        if (!file) return
        const url = URL.createObjectURL(file)
        setImageUrl(url)
        setStarted(false)
        const img = new Image()
        img.onload = () => {
            if (img.naturalWidth && img.naturalHeight) {
                setAspectRatio(img.naturalHeight / img.naturalWidth)
            }
        }
        img.src = url
    }

    function startGame() {
        if (!imageUrl) return
        setStarted(true)
    }

    return (
        <>
            <div className="header">
                <h1>Pixel Perfect</h1>
                <p>
                    Randomly regenerate the picture fragments until all fragments are in their correct place.
                    Click each fragment to freeze it between rolls.
                </p>
                <div className="controls">
                    <div className="inputs-board">
                        <label 
                        style={{ gridColumn: "1 / 3" }}
                        >
                            <span>Select image</span>
                            <input type="file" accept="image/*" onChange={handleFileChange} />
                        </label>
                        <label>
                            <span>Rows</span>
                            <input type="number" min={1} value={rows} onChange={e => setRows(Math.max(1, Number(e.target.value) || 1))} />
                        </label>
                        <label style={{ justifyContent: "flex-start" }}>
                            <span>Columns</span>
                            <input type="number" min={1} value={cols} onChange={e => setCols(Math.max(1, Number(e.target.value) || 1))} />
                        </label>
                    </div>
                    <button className="action-button" onClick={startGame} disabled={!imageUrl} style={{ gridColumn: 3, gridRow: "1 / -1" }}>
                        {started ? "Restart" : "Start Game"}
                    </button>
                </div>
            </div>
            {started && imageUrl ? (
                <GameBoard imageUrl={imageUrl} rows={rows} cols={cols} aspectRatio={aspectRatio} />
            ) : (
                <main>
                    <p>Choose an image and set grid dimensions, then start the game.</p>
                </main>
            )}
        </>
    )
}