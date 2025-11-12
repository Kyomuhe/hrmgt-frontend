// import { configureStore, createSlice, useDispatch, useSelector } from "@reduxjs/toolkit";


// export const store = configureStore({
//     reducer:CountReducer
// })

// const initialState = {
//     count:0,
// }

// export const countSlice = createSlice({
//     name:'count',
//     initialState,
//     reducers: {
//         increment : (state, action)=>{
//             state.count += action.payload;
//         },
//         decrement : (state, action) =>{
//             state.count -= action.payload;
//         }
//     }


// })
// export const {increment, decrement} = countSlice.actions;
// // export const CountReducer = countSlice.reducer;

// export const Example = ()=>{
//     const dispatch = useDispatch();
//     const currentCount = useSelector((state)=>state.count);


//     return(
//         <div className="h-screen items-center justify-center flex flex-col gap-4">
//             <p>this is the current count {currentCount} </p>
//             <button onClick={dispatch(increment(1))}>increment</button>
//             <button onClick={dispatch(decrement(1))}>decrement</button>
//         </div>
//     )
// }










import { configureStore, createSlice } from "@reduxjs/toolkit";


export const store = configureStore({
    reducer:{
        count: countReducer

    }
})

export const countSlice = createSlice({
    initialState:{
        count:0,
    },
    name:"count",
    reducers:{
        increment :(state, action)=>{
            state.count += action.payload;
        },
        decrement :(state, action)=>{
            state.count -= action.payload;

        }
    }
    
});
import { useDispatch, useSelector } from "react-redux";
export const {increment, decrement} = countSlice.actions;
export default countReducer = countSlice.reducer;

export const Example = () =>{
    const dispatch = useDispatch();
    const currentState = useSelector((state)=>state.count);

    return(
        <div>
            <p>this is the current count {currentState} </p>
            <button onClick={dispatch(increment(1))}>increment</button>
            <button onClick={dispatch(decrement(1))}>decrement</button>
        </div>
    )
}