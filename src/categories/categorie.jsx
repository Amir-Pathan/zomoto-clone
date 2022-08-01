import { Grid,Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Services from "../services/services";

const style={
    category:{
        width:'100px',
        borderRadius:'45px',
        justifyContent:'center',
    }
}

function Categories(){

    const [categories,setCategories] = useState([])

    useEffect(()=>{

        Services.getCategories().then((res)=>{
            setCategories(res)
        }).catch((err)=>console.log(err))

    },[])

    return(
        <>
        <Typography variant="h6" 
         style={{
            fontWeight:'bold',
            marginLeft:'10px'
         }}>Eat By Categories :</Typography>
        <Grid item container xs={12} md={12} spacing={1}>
            {
                categories.map((i,index)=>{
                    return <Grid key={index} item xs={4} md={3} style={{
                        display:'flex',alignItems:'center',justifyContent:'center'}}>
                        <div style={{display:'flex',flexDirection:'column'}}>
                        <img style={style.category} src={i.imgUrl}/>
                        <Typography variant='p'
                        style={{textAlign:'center'}}>{i.categoryName}</Typography>
                        </div>
                    </Grid>
                })
            }
        </Grid>
        </>
    )

}

export default Categories