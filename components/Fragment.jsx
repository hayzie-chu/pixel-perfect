export default function Fragment(props) {
    let className = "fragment-button"
    
    if (props.isHeld) className = "held "+className
    return <button 
                onClick={props.hold} 
                className={className}
                aria-pressed={props.isHeld}
                aria-label={`Fragment with image index of ${props.imgID + 1}`}>
                <img src={props.image} alt="my image"/>
            </button>
    // } else {
    //     return (
    //         <button className="fragment-button">
    //             <img src={props.image} alt="my image"/>
    //         </button>
    //     )
    // }
}