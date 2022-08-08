import React,{Component, useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import Services from "../services";
import { Grid} from "@mui/material";
import {Typography} from "@mui/material";
import ProductCard from "../lib/product/product";

function CategoryItem(){

    const {id} = useParams()

    const [products,setProducts] = useState([])

    const data = async()=>{

        const user = Services.getUser()

        const res = await Services.getData('products/product/'+id+'/'+user.customerCity.toUpperCase())
        
        setProducts(res)

        console.log(products);
 
    }

    useEffect(()=>{

        data()

    },[])

    return(
        <>
          <Grid container item xs={12} md={12} spacing={1}>
            {
                products.length===0?
                   <Typography>Sorrt At this Time Product Not Availabe</Typography>
                   :
                products.map((product,index)=>{
                    return <Grid item xs={6} md={3} key={index}>
                        <ProductCard name={product.productName}
                        id={product._id}
                        imgUrl={product.productImg}
                        originalPrice={product.productOriginalPrice}
                        userId={product.userId}
                        />
                    </Grid>
                })
            }
          </Grid>
        </>
    )

}
export default CategoryItem