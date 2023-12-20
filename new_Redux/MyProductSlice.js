import { createSlice } from "@reduxjs/toolkit";

const MyProductSlice=createSlice({
    name:'product',
    initialState:[],
    reducers:{
        addMyProduct(state,action){
            state.push(action.payload);
        },
        increaseQty(state,action){
            let myindex=-1;
            state.map((item,index)=>{
                if(item.Id==action.payload){
                    myindex=index;
                }
            });
            if(myindex==-1){
            }else{
                state[myindex].QTY=state[myindex].QTY+1;
            }
            
        },


        // increaseQty(state,action){
        //     let myindex=-1;
        //     state.map((item,index)=>{
        //         if(item.Id==action.payload){
        //             myindex=index;
        //         }
        //     });
        //     if(myindex==-1){
        //     }else{
        //         const product = state[myindex];
        //         if (product.QTY < product.Stock_Quantity) {
        //             state[myindex].QTY=product.QTY + 1;
        //         }
        //     }    
        // },
        decreaseQty(state,action){
            let myindex=-1;
            state.map((item,index)=>{
                if(item.Id==action.payload){
                    myindex=index;
                }
            });
            if(myindex==-1){
            }else{
                state[myindex].QTY=state[myindex].QTY-1;
            }
        },
    },  
});

export const{addMyProduct,increaseQty,decreaseQty}=MyProductSlice.actions;
export default MyProductSlice.reducer;