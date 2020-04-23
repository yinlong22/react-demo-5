//不同于局部渲染useState，useContent全局变量改变适合换肤

import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
const rootElement = document.getElementById("root");

const themeContext = React.createContext(null);

function App() {
    const [theme, setTheme] = React.useState("red");
    return (
        <themeContext.Provider value={{ theme, setTheme }}>
            <div className={`App ${theme}`}>
                <p>{theme}</p>
                <div>
                    <ChildA />
                </div>
                <div>
                    <ChildB />
                </div>
            </div>
        </themeContext.Provider>
    );
}

function ChildA() {
    const { setTheme } = React.useContext(themeContext);
    return (
        <div>
            <button onClick={() => setTheme("red")}>red</button>
        </div>
    );
}

function ChildB() {
    const { setTheme } = React.useContext(themeContext);
    return (
        <div>
            <button onClick={() => setTheme("blue")}>blue</button>
        </div>
    );
}

ReactDOM.render(<App />, rootElement);
