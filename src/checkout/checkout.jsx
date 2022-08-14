import React,{Component, useEffect, useState} from "react";
import Services from "../services";
import Grid  from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material"
import AddToCartButton from "../lib/addCartButton";
import Divider from "@mui/material/Divider";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Button from "@mui/material/Button";


function Bill({id,price,productName,total}){

    const [qty,setQty] = useState(0)

    console.log(id,price,productName);

    useEffect(()=>{

        const prodct = Services.inCart(id)

        console.log(prodct);

        setQty(prodct.qty)

    },[])

    return(
        <Grid container item xs={12} md={12} alignContent='center' textAlign={'center'}>
           <Grid item xs={3} md={3} >{productName}</Grid>
           <Grid item xs={3} md={3} >
            <CurrencyRupeeIcon fontSize="small"/>
            {price}</Grid>
           <Grid item xs={3} md={3} >{qty}</Grid>
           <Grid item xs={3} md={3} >
            <CurrencyRupeeIcon fontSize="small"/>
            {price*qty}</Grid>
        </Grid>
    )

}

class Checkout extends Component{

    constructor(){
        super()
        this.state={
            product:[],
            hotelsName:[],
            cart:[],
            address:[]
        }

        this.getProducts=this.getProducts.bind(this)

    }

    getProducts(){


       const cart = Services.getCart()

       const product = cart.map((i)=>{

        return Services.getData('products/product/'+i.id).then((res)=>{

            return res[0]

        }).catch((err)=>console.log(err))
       })

       Promise.all(product).then((res)=>{

        const id = res.map((i)=>{

            return Services.getData('sellers/user/'+i.userId).then((result)=>{
                return result[0].hotelName
            })
        })

        Promise.all(id).then((result)=>{
            this.setState({
                ...this.state,
                product:res,
                hotelsName:result,
                cart:cart
            })
        })

       }).catch((err)=>console.log(err))

    }

    componentDidMount(){

        this.getProducts()

    }

    render(){

        let total = 0;

        this.state.product.forEach((item,index)=>{

            total = item.productDiscountedPrice*this.state.cart[index].qty+total

        })

        return(
            <>
               <Grid container item xs={12} md={12} spacing={2} 
               style={{
                width:'98%',
                marginLeft:'0.5%',
                marginTop:'25px'
               }}>
                   <Grid item xs={12} md={8}>
                    <Grid>
                        <Typography variant="h5">Item In Cart {this.state.product.length}</Typography>
                    </Grid>
                     <Paper>
                            {
                              this.state.product.length>0?
                                this.state.product.map((i,index)=>{

                                    return<div key={index}> <Grid container item xs={12} md={12} 
                                    spacing={2} key={index}>
                                         <Grid item xs={4} md={3}>
                                            <img src={i.productImg}
                                            style={{
                                                maxWidth:'120px',
                                                minWidth:'60px',
                                                borderRadius:'10px'
                                            }}
                                            />
                                         </Grid>
                                         <Grid container item xs={8} md={9}>
                                         <Grid container item xs={12} md={12}>
                                            <Grid item xs={6} md={6}>
                                                <Typography>{i.productName}</Typography>
                                            </Grid>
                                            <Grid container item xs={6} md={6}>
                                                <Grid item xs={6} md={6} alignItems='center' textAlign={'center'} alignContent='center'>
                                                    <CurrencyRupeeIcon fontSize='small'/>
                                                    {i.productDiscountedPrice}
                                                </Grid>
                                                <Grid item xs={6} md={6}>
                                                    <strike>
                                                    <CurrencyRupeeIcon fontSize="small"/>
                                                    {i.productOriginalPrice}
                                                    </strike>
                                                </Grid>
                                            </Grid>
                                         </Grid>
                                         <Grid container item xs={12} md={12}>
                                            <Grid item xs={8} md={8}>
                                               <Typography>{this.state.hotelsName[index]}</Typography>
                                            </Grid>
                                            <Grid item xs={4} md={4}>
                                               <AddToCartButton
                                               id={i._id}
                                               maxQty={i.productMaxQty}
                                               onClick={()=>alert('Hello')}
                                               />
                                            </Grid>
                                         </Grid>
                                         </Grid>
                                    </Grid>
                                    <Divider/>
                                    </div>
                                }):
                                <div>
                                    Empty List
                                </div>
                            }
                     </Paper>
                   </Grid>
                   <Grid item xs={12} md={4}>
                    <Grid>
                        <Typography variant="h5">Bill</Typography>
                    </Grid>
                     <Paper>
                        <Grid container item xs={12} md={12} spacing={2}>
                        {
                            this.state.product.length>0?
                             this.state.product.map((i,index)=>{
                                return <Bill
                                key={index}
                                id={i._id}
                                price={i.productDiscountedPrice}
                                productName={i.productName}
                                />
                             })
                            :null
                        }
                        </Grid>
                        <Grid container item xs={12} md={12} textAlign='center'>
                            <Grid item xs={6} md={6}>Total</Grid>
                            <Grid item xs={3} md={3}>{this.state.product.length}</Grid>
                            <Grid item xs={3} md={3}>
                                <CurrencyRupeeIcon fontSize="small"/>
                                {total}</Grid>
                        </Grid>
                     </Paper>
                   </Grid>
                   <Grid container item xs={12} md={12} spacing={2}>
                     <Grid item xs={12} md={6}>
                        <Paper>
                             {
                                this.state.address.length===0?
                                   <Button fullWidth>Add Address</Button> 
                                :null
                             }
                        </Paper>
                     </Grid>
                     <Grid item xs={12} md={6} textAlign='center' alignContent={'center'}>
                        <Paper>
                             <Grid container item xs={12} md={12}>
                                <Grid item xs={6}md={6}>
                                    <Typography>Place Order</Typography>
                                </Grid>
                                <Grid item xs={6}md={6}>
                                    <Button>Place Order</Button>
                                </Grid>
                             </Grid>
                        </Paper>
                     </Grid>
                   </Grid>
               </Grid>

            </>
        )

    }

}

export default Checkout