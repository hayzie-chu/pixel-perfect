import GameBoard from "./GameBoard"

export default function App() {
    return (
        <>
            <div className="Header">
                <h1>Pixel Perfect</h1>
                <p>Regenerate the picture fragments until all fragments are in their correct place. 
                    Click each fragment to freeze it at its current value between rolls.</p>
            </div>
            <GameBoard/>
        </>
    )
}