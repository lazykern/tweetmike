import {useTheme} from "next-themes";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import {useState, useEffect} from "react";
import { Typography } from "@mui/material";

const Header = () => {

  const {systemTheme , theme, setTheme} = useTheme ();

  const renderThemeChanger= () => {

      const currentTheme = theme === "system" ? systemTheme : theme ;

      if(currentTheme ==="dark"){
        return (
          <LightModeIcon className="w-10 h-10 text-yellow-500 " role="button" onClick={() => setTheme('light')} />
        )
      }

      else {
        return (
          <DarkModeIcon className="w-10 h-10 text-gray-900 " role="button" onClick={() => setTheme('dark')} />
        )
      }
   };

  return (
    <header className="h-15">
      <div className="container  px-4 sm:px-6 py-4 flex justify-between items-center">
        {renderThemeChanger()}
        <Typography fontFamily='Ubuntu'>in development</Typography>
      </div>
    </header>
  );
};

export default Header;
