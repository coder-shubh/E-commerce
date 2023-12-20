import { createSlice } from "@reduxjs/toolkit";

const MyCartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addProductToMyCart(state, action) {
            let myindex = -1;
            state.map((item, index) => {
                if (item.Id == action.payload.Id) {
                    myindex = index;
                }
            });
            if (myindex == -1) {
                //state.push(action.payload);
                state.push({
                    Id: action.payload.Id,
                    //Product_Type:action.payload.ProductType,
                    Product_Name: action.payload.ProductName,
                    Product_Category:action.payload.ProductCategory,
                    Product_Price:action.payload.ProductPrice,
                    Image_Url: action.payload.ImageUrl,
                    //Sub_Category:action.payload.Sub_Category,
                    //AddOn_Product:action.payload.AddOn_Product,
                    //Unique_Id:action.payload.Unique_Id,
                    Product_Description_Long:action.payload.ProductDescription_Long,
                    Product_Description_Short:action.ProductDescription_Short,
                    Stock_Quantity:action.StockQuantity,
                    Stock_Status:action.payload.StockStatus,
                    //Shipping:action.payload.Shipping,
                    Product_Weight:action.payload.ProductWeight,
                    Product_Dimension:action.payload.ProductDimensions,
                    Dis_Price:action.payload.DisPrice,
                    QTY: action.payload.QTY + 1,
                    Brand:action.payload.Brand,
                    CategoryId:action.payload.CategoryId,
                    //HomeId:action.payload.HomeId,
                    BrandId:action.payload.BrandId,
                    Seller:action.payload.Seller,
                    Message:action.payload.Message
                });
            } else {
                //state[myindex].qty=action.payload.qty+1;
                state[myindex].QTY = state[myindex].QTY + 1;
            }
            //state.push(action.payload);
        },
        removeMyCartItem(state, action) {
            let myindex = -1;
            state.map((item, index) => {
                if (item.QTY == action.payload.QTY) {
                    myindex = index;
                }
            });
            if (myindex == -1) {

            }
            else {
                state[myindex].QTY = state[myindex].QTY - 1;

            }
        },
        deleteMyCartItem(state, action) {
            return(state = state.filter(item => 
                 item.Id !== action.payload
            ));
        },
        
    },
});

export const { addProductToMyCart, removeMyCartItem, deleteMyCartItem,filterProductToMyCart } = MyCartSlice.actions;
export default MyCartSlice.reducer;