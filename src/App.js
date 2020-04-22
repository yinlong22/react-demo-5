import React, {useState, useEffect} from 'react';
import useUpdate from "./useUpdate";

//函数实现
const App = props => {//消除了this,这里相当于construct
    const [n, setN] = useState(0);
    const [m, setM] = useState(0);
    const [childVisible, setChildVisible] = useState(true)
    const hide = () => {
        setChildVisible(false)
    }
    const show = () => {
        setChildVisible(true)
    }
    const onClickN = () => {
        setN(n + 1);
    };
    const onClickM = () => {
        setM(m + 1);
    };
    useUpdate(() => {
        console.log('n变了')//即为传入的fn
    }, n)//[]空数组的时候相当于componentMount,[n]有对象时update,没有时默认包含全部对象


    return (//相当于render
        <div>
            {n}
            <button onClick={onClickN}>n+1</button>
            <hr/>
            {m}
            <button onClick={onClickM}>m+1</button>
            <hr/>
            {childVisible ? <button onClick={hide}>hide</button> : <button onClick={show}>show</button>}
            {childVisible ? <Child/> : null}
        </div>
    );
};

const Child = (props) => {
    useEffect(() => {
        console.log('child渲染了')//相当于componentMount和update
        return () => {//相当于componentWillUnmount
            console.log('child销毁了')
        }
    })
    return (
        <div>child</div>
    )
}

export default App;

//类实现+1
// class App extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {n: 1}
//     }
//
//     onClick = () => {
//         this.setState(state => ({n: this.state.n + 1}))
//     };
//
//     render() {
//         return (
//             <div>
//                 {this.state.n}
//                 <button onClick={this.onClick}>+1</button>
//             </div>
//         )
//     }
// }