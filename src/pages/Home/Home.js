import "./Home.css";
import Menu from "../../Components/Menu/Menu";

export default function Home() {
  return (
    <div className="Home">
      <div className="Home-image">
        <span>Hello!</span>
      </div>
      <div className="Home-Items">
        <Menu />
      </div>
    </div>
  );
}
