import "./Header.css"

export default function Header() {
    return(
        <div className="Header">
            <p>Logo!</p>
            <div className="Header-Menu">
                <input placeholder="Collection Name"></input>
                <p>button</p>
            </div>
            <a href="/" className="Header-link">Explore!</a>
            <a href="/Kick" className="Header-link">Kick!</a>
            <p>지갑 연결</p>
        </div>
    )
}