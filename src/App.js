import React, {useState, useEffect, useReducer} from 'react';
import useUpdate from "./useUpdate";

const initForData = {
    name: '',
    age: '18',
    nationality: '汉族'
}

function reducer(state, action) {
    switch (action.type) {
        case 'patch'://更新
            return {...state, ...action.formData}
        case 'reset'://重置
            return initForData
        default:
            throw new Error('你传的啥 type')
    }
}

//reducer很好地运用到了方法表单 例2 ↑ ↑
//例1 reducer表驱动 ↓ ↓
// const initial = {
//     p: 1
// }
// const reducer = (state, action) => {//第一个是旧的数据state和操作action
//     if (action.type === 'add') {
//         return {p: state.p + action.number}//返回新的state /操作react的数据都是要一个新的数据
//     } else if (action.type === 'multi') {
//         return {p: state.p * action.number}
//     } else {
//         throw new Error('unknown type')
//     }
// }

//函数实现
const App = props => {//消除了this,这里相当于construct
    const [n, setN] = useState(0);
    const [m, setM] = useState(0);
    const [childVisible, setChildVisible] = useState(true)
    // const [state, dispatch] = useReducer(reducer, initial)
    const [formData, dispatch] = useReducer(reducer, initForData)
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
        setM(x => x + 1);//这里是函数写法，setTimeout时不会出错
    };
    // const onClickP = () => {
    //     dispatch({type: 'add', number: 1})
    // }
    // const onClickP2 = () => {
    //     dispatch({type: 'add', number: 2})
    // }
    // const onClickP3 = () => {
    //     dispatch({type: 'multi', number: 2})
    // }
    const onSubmit = () => {
    }
    const onReset = () => {
        dispatch({type: 'reset'})
    }
    useUpdate(() => {//自定义了组件，排除了第一次渲染执行fn函数，这样就相当于componentMount
        console.log('n变了')//即为传入的fn
    }, n)//[]空数组的时候相当于componentMount,[n]有对象时update,没有时默认包含全部对象

    return (//相当于render
        <div>
            <form onSubmit={onSubmit} onReset={onReset}>
                <div>
                    <label>
                        姓名
                        <input
                            value={formData.name}
                            onChange={e =>
                                // 触发事patch更新件，更新formData里name值变为自己打的值
                                dispatch({type: 'patch', formData: {name: e.target.value}})}/>
                    </label>
                </div>
                <div>
                    <label>
                        年龄
                        <input
                            value={formData.age}
                            onChange={e =>
                                dispatch({type: 'patch', formData: {age: e.target.value}})}/>
                    </label>
                </div>
                <div>
                    <label>
                        名族
                        <input
                            value={formData.nationality}
                            onChange={e =>
                                dispatch({type: 'patch', formData: {nationality: e.target.value}})
                            }
                        />
                    </label>
                </div>
                <div>
                    <button type='submit'>提交</button>
                    <button type='reset'>重置</button>
                    <br/>
                    {JSON.stringify(formData)}
                </div>
            </form>
            <hr/>
            {/*<h2>p:{state.p}</h2>*/}
            {/*<button onClick={onClickP}>+1</button>*/}
            {/*<button onClick={onClickP2}>+2</button>*/}
            {/*<button onClick={onClickP3}>*2</button>*/}
            {/*<hr/>*/}
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

