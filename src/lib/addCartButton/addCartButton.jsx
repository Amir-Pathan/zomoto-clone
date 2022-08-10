
import React, { useState,useEffect } from 'react'
import { Button,Grid } from '@mui/material'
import Typography from '@mui/material/Typography'
import Services from '../../services'
import Tooltip from '@mui/material/Tooltip'

const style={
    btns:{
        display:'flex',
        flexDirection:'row'
    },
    btn:{
        minWidth:"5px"
    }
}

function AddToCartButton(props){

    const {id,maxQty} =props

    const [isAdd,setAdd] = useState(false)

    const [itemQty,setQty] = useState(0)

    const [isAddBtn,setAddBtn] = useState(false)

    const inCart=()=>{

        const crt = Services.inCart(id)

        console.log(crt);

        if(crt.item){

             setAdd(true)
             setQty(crt.qty)

             if(crt.qty===maxQty){
                setAddBtn(true)
             }else{
                setAddBtn(false)
             }

        }else{

            setAdd(false)

        }

    }

    useEffect(()=>{

        inCart()

    },[])

    const addCart=()=>{
        Services.addCart(id)

        inCart()
    }

    const updateCart=function (cntrl){

        Services.updateCart(cntrl,id)

        inCart()

    }

    return(
        <>
        {
            !isAdd?
            <Button
            onClick={addCart}
            >Add</Button>
            :
            <Grid container item xs={12} md={12}
            spacing={1} alignItems='center'>
                <Grid item xs={4} md={4}>
                  <Button size='small'
                  style={style.btn}
                  onClick={()=>updateCart('min')}
                  >-</Button>
                </Grid>
                <Grid item xs={4} md={4}>
                    <Typography variant='div'>{itemQty}</Typography>
                </Grid>
                <Grid  item xs={4} md={4}>
                    <Tooltip title={'max Qty '+maxQty}>
                        <span>
                        <Button size='small'
                         style={style.btn}
                         onClick={()=>updateCart('plus')}
                         disabled={isAddBtn}
                         >+</Button>
                         </span>
                    </Tooltip>
                </Grid>
            </Grid>


        }
        </>
    )

}

export default AddToCartButton