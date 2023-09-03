import { Routes, Route } from "react-router-dom";
import { ROUTES_SCHEMA } from "./Routes";
import { Suspense } from "react";
import Home from "./Pages/Home";
import Episodes from "./Pages/Episodes";
import Episode from "./Pages/Episode";
import Characters from "./Pages/Characters";
import Character from "./Pages/Character";
import ErrorBoundary from "./components/ErrorBoundary";
import {
  CharacterLoading,
  CharactersLoading,
  EpisodeLoading,
} from "./components/Loadings";
import Game from "./Pages/Game";
import NotFound from "./Pages/404";
import { FallbackLoading } from "./components/Loadings";

function App() {
  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<FallbackLoading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path={ROUTES_SCHEMA.CHARACTER}
              element={
                <Suspense fallback={<CharacterLoading />}>
                  <Character />
                </Suspense>
              }
            />
            <Route
              path={ROUTES_SCHEMA.CHARACTERS}
              element={
                <Suspense fallback={<CharactersLoading />}>
                  <Characters />
                </Suspense>
              }
            />
            <Route
              path={ROUTES_SCHEMA.EPISODE}
              element={
                <Suspense fallback={<EpisodeLoading />}>
                  <Episode />
                </Suspense>
              }
            />
            <Route path={ROUTES_SCHEMA.EPISODES} element={<Episodes />} />
            <Route path={ROUTES_SCHEMA.GAME} element={<Game />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default App;
