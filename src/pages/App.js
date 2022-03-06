import { Link } from "react-router-dom";

function App() {
  return (
    <div>
      <div>
        <Link to={"/people"}>to People</Link>
      </div>
    </div>
  );
}

export default App;
