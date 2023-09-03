import { useState } from "react";
import { Box, IconButton, styled } from "@mui/material";
import Button from "../Button";
import logo from "../../assets/img/logo.png";
import { ReactComponent as HomeIcon } from "../../assets/icons/home.svg";
import { ReactComponent as EpisodesIcon } from "../../assets/icons/episode.svg";
import { ReactComponent as CharactersIcon } from "../../assets/icons/characters.svg";
import { ReactComponent as GameIcon } from "../../assets/icons/game.svg";
import { useNavigate } from "react-router-dom";
import { ROUTES_SCHEMA } from "../../Routes";

function setActiveStyleToDesktopNav(
  btnPath: string,
  curPath: string
): { variant: "contained" | "text" } {
  const isActiveBtn = handleIsActive(btnPath, curPath);
  return { variant: isActiveBtn ? "contained" : "text" };

  function handleIsActive(btnPath: string, curPath: string) {
    return btnPath === curPath;
  }
}
function setActiveStyleToMobileNav(
  btnPath: string,
  curPath: string
): { color: "primary" | "default" } {
  const isActiveBtn = handleIsActive(btnPath, curPath);
  return {
    color: isActiveBtn ? "primary" : "default",
  };

  function handleIsActive(btnPath: string, curPath: string) {
    return btnPath === curPath;
  }
}

const Navbar = () => {
  const [active, setActive] = useState(window.location.pathname);
  const navigate = useNavigate();
  function handleNavigation(path: string) {
    setActive(path);
    navigate(path);
  }
  return (
    <>
      {/* -------------------------- DESKTOP_NAV------------------------------ */}
      <Nav
        sx={{
          "@media (max-width: 620px)": { display: "none", py: 2 },
          "@media (max-width: 900px)": { py: 2 },
        }}
      >
        <Button
          onClick={handleNavigation.bind(null, ROUTES_SCHEMA.HOME)}
          {...setActiveStyleToDesktopNav(ROUTES_SCHEMA.HOME, active)}
          startIcon={<HomeIcon />}
        >
          Home
        </Button>
        <Button
          onClick={handleNavigation.bind(null, ROUTES_SCHEMA.CHARACTERS)}
          {...setActiveStyleToDesktopNav(ROUTES_SCHEMA.CHARACTERS, active)}
          startIcon={<CharactersIcon />}
        >
          Characters
        </Button>
        <Box
          sx={{
            "@media (max-width: 900px)": { display: "none" },
          }}
          component="img"
          src={logo}
          width={250}
        />
        <Button
          onClick={handleNavigation.bind(null, ROUTES_SCHEMA.EPISODES)}
          {...setActiveStyleToDesktopNav(ROUTES_SCHEMA.EPISODES, active)}
          startIcon={<EpisodesIcon />}
        >
          Episodes
        </Button>
        <Button
          onClick={handleNavigation.bind(null, ROUTES_SCHEMA.GAME)}
          {...setActiveStyleToDesktopNav(ROUTES_SCHEMA.GAME, active)}
          startIcon={<GameIcon />}
        >
          Game
        </Button>
      </Nav>

      {/* -------------------------- MOBILE_NAV------------------------------ */}

      <Nav
        sx={{
          "@media (min-width: 620px)": { display: "none" },
          "@media (max-width: 620px)": { py: 2 },
          px: {
            xs: 3,
            sm: 8
          },
        }}
      >
        <IconButton
          onClick={handleNavigation.bind(null, ROUTES_SCHEMA.HOME)}
          {...setActiveStyleToMobileNav(ROUTES_SCHEMA.HOME, active)}
        >
          <HomeIcon />
        </IconButton>
        <IconButton
          onClick={handleNavigation.bind(null, ROUTES_SCHEMA.CHARACTERS)}
          {...setActiveStyleToMobileNav(ROUTES_SCHEMA.CHARACTERS, active)}
        >
          <CharactersIcon />
        </IconButton>
        <IconButton
          onClick={handleNavigation.bind(null, ROUTES_SCHEMA.EPISODES)}
          {...setActiveStyleToMobileNav(ROUTES_SCHEMA.EPISODES, active)}
        >
          <EpisodesIcon />
        </IconButton>
        <IconButton
          onClick={handleNavigation.bind(null, ROUTES_SCHEMA.GAME)}
          {...setActiveStyleToMobileNav(ROUTES_SCHEMA.GAME, active)}
        >
          <GameIcon />
        </IconButton>
      </Nav>
    </>
  );
};

export default Navbar;

const Nav = styled("nav")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  position: 'sticky',
  top: 0,
  backdropFilter: 'blur(10px)',
  zIndex: 1000,
  padding: '0 64px',
});
