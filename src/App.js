import './App.css';
import React, {useState} from "react";
import {Button, Input} from "@mui/material";
import MainPage from "./pages/MainPage/MainPage";

const position = [53,25]

function App() {
    const [file, setFile] = useState()

    function handleClickToLoadReport() {

    }


    return (
        <div className="App">
                  <MainPage/>
        </div>
    );
}

export default App;
