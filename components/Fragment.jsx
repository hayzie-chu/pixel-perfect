export default function Fragment(props) {
    const { imgID, rows, cols, imageUrl, isHeld, hold } = props

    const className = isHeld ? "held fragment-button" : "fragment-button"

    const row = Math.floor(imgID / cols)
    const col = imgID % cols

    const translateXPercent = -(col / cols) * 100
    const translateYPercent = -(row / rows) * 100

    return (
        <button
            onClick={hold}
            className={className}
            aria-pressed={isHeld}
            aria-label={`Fragment with image index of ${imgID + 1}`}
        >
            <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
                <img
                    src={imageUrl}
                    alt="Puzzle fragment"
                    style={{
                        width: `calc(100% * ${cols})`,
                        height: `calc(100% * ${rows})`,
                        transform: `translate(${translateXPercent}%, ${translateYPercent}%)`,
                        objectFit: "cover",
                        display: "block"
                    }}
                />
            </div>
        </button>
    )
}