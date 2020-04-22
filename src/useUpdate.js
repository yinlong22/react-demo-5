import {useEffect, useState} from "react";

const useUpdate = (fn, dep) => {//自定义属性,当n变化时才显示n变了,第一次渲染不算
    const [Count, setCount] = useState(0);
    useEffect(() => {
        setCount(x => x + 1)
    }, [dep]); //一发现array变化就将nUpdateCount+1

    useEffect(() => {
        if (Count > 1) {
            fn()
        }
    }, [Count,fn]);
};


export default useUpdate