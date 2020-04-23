//尝试实现setState原理，缺陷是用数组完成，渲染的顺序不能改变

import React from "react";
import ReactDOM from "react-dom";
const rootElement = document.getElementById("root");

let _state;

function myUseState(initialValue) {
  _state = _state === undefined ? initialValue : _state;
  function setState(newState) {
    _state = newState;
    render();
  }
  return [_state, setState];
}

// 教学需要，不用在意 render 的实现
const render = () => ReactDOM.render(<App />, rootElement);

function App() {
  const [n, setN] = myUseState(0);
  return (
    <div className="App">
      <p>{n}</p>
      <p>
        <button onClick={() => setN(n + 1)}>+1</button>
      </p>
    </div>
  );
}

ReactDOM.render(<App />, rootElement);