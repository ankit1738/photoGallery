import logo from "./logo.svg";
import "./App.css";
import Gallery from "./components/gallery";
import HeaderComponent from "./components/header";
import "antd/dist/antd.css";
import { createContext, useState, useEffect } from "react";

export const Context = createContext();

function App() {
    useEffect(() => {
        console.log("Rendering Appjs", process.env.REACT_APP_API_KEY);
    }, []);
    const [photos, setPhotos] = useState([]);

    return (
        <>
            <Context.Provider value={{ photos, setPhotos }}>
                <HeaderComponent />
                <Gallery />
            </Context.Provider>
        </>
    );
}

export default App;
