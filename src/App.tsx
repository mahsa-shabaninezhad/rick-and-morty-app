import { Routes, Route } from "react-router-dom";
import { ROUTES_SCHEMA } from "./Routes";
import Home from "./Pages/Home";
import Episodes from "./Pages/Episodes";
import Episode from "./Pages/Episode";
import Characters from "./Pages/Characters";
import Character from "./Pages/Character";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path={ROUTES_SCHEMA.CHARACTER} element={<Character />} />
        <Route path={ROUTES_SCHEMA.CHARACTERS} element={<Characters />} />
        <Route path={ROUTES_SCHEMA.EPISODE} element={<Episode />} />
        <Route path={ROUTES_SCHEMA.EPISODES} element={<Episodes />} />
      </Routes>
    </>
  );
}

export default App;
