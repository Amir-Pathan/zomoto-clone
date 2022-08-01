import React, { useState } from "react";
import { Grid,TextField,FormControl,InputLabel,Select,MenuItem, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Services from "../services/services";
import ErrorDialog from "../lib/dialog";

const style={
    form:{
        width:'80%',
        marginLeft:'10%',
        marginTop:'10%'
    }
}

function CreateAccount(){

    const cities = ['Sillod','Kannad','Aurangabad','Pune',"Mumbai","Malegoan"]

    const initial={
        customerName:'',
        customerNo:'',
        customerEmail:'',
        customerPassword:'',
        customerCity:'',
        repassword:''
    }

    const [user,setUser] = useState(initial)

    const [error,setError] = useState(false)

    const [title,setTitle] = useState('')

    const [content,setContent] = useState('')


    const errorClose=()=>setError(false)

    const handlerChange =(k,e)=>{

        if(k==='customercustomerNo'&&e.length===10){
 
            Services.isAble(e).then((res)=>{

                if(res){

                    setError(true)
                    setContent(e+'customerNo is Available')
                    setTitle('customerNo Is Availabel')

                }else{

                    setError(false)
                    setContent('')
                    setTitle('')
                }

            }).catch((err)=>console.log(err))

        }

        setUser(prev=>({
            ...prev,
            [k]:e
        }))
    }

    const submit=()=>{

        if(user.customerName.length<4||user.customerNo.length!==10||user.customerPassword!==user.repassword
            ||user.customerPassword.length<6||user.customerCity.length<1){

                setError(true)
                setContent('please Enter name 4 char min select city enter valid name password===repassword length greather than 7')
                setTitle('Invalid Uesr Details')

        }else{
            
            setError(false)
            setContent('')
            setTitle('')
            Services.createNewAccount(user).then((res)=>{

                console.log('hire');

                window.location.pathname='/'

            }).catch((err)=>{

                setError(true)
                setContent('Network Error Connect your network and try again')
                setTitle('Network Error')

            })
        }

    }

    return(
        <>
           <Grid container item xs={12} md={12} spacing={2} style={style.form}>
                <Grid item xs={12} md={12}>
                   <Typography 
                    variant="h6"
                    style={{textAlign:'center'}}
                    >Create Account</Typography>
                </Grid>

               <Grid container item xs={12} md={6} spacing={2}>
                   <Grid item xs={12} md={12}>
                      <TextField fullWidth size="small" label='Enter Name'
                      value={user.customerName}
                      onChange={(e)=>handlerChange('customerName',e.target.value)}
                      required
                      />
                   </Grid>
                   <Grid item xs={12} md={12}>
                      <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label" required>Select customerCity</InputLabel>
                      <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      required
                      value={user.customerCity}
                      label="Select customerCity :"
                      size="small"
                      onChange={(e)=>handlerChange('customerCity',e.target.value)}
                      >
                        {
                            cities.map((i,index)=>{
                                return <MenuItem value={i} key={index}>{i}</MenuItem>
                            })
                        }
                    </Select>
                    </FormControl>
                   </Grid>
                   <Grid item xs={12} md={12}>
                      <TextField type='customerEmail' fullWidth size="small" label='Enter customerEmaill Id'
                      value={user.customerEmail}
                      onChange={(e)=>handlerChange('customerEmail',e.target.value)}
                      />
                   </Grid>
               </Grid>
               <Grid container item xs={12} md={6} spacing={2}>
                   <Grid item xs={12} md={12}>
                      <TextField fullWidth size="small" label='Enter Number'
                      required
                      type='number'
                      value={user.customercustomerNo}
                      onChange={(e)=>handlerChange('customerNo',e.target.value)}
                      />
                   </Grid>
                   <Grid item xs={12} md={12}>
                      <TextField fullWidth size="small" label='Enter Password'
                      required
                      value={user.customerPassword}
                      onChange={(e)=>handlerChange('customerPassword',e.target.value)}
                      />
                   </Grid>
                   <Grid item xs={12} md={12}>
                      <TextField type='password' fullWidth size="small" label='Re Enter Password'
                      value={user.repassword}
                      required
                      onChange={(e)=>handlerChange('repassword',e.target.value)}
                      />
                   </Grid>
               </Grid>
               <Grid container item xs={12} md={12}>
                <Grid item xs={12} md={6}>
                    <Button fullWidth
                    onClick={submit}>Create Account</Button>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Button fullWidth >Login</Button>
                </Grid>
               </Grid>
               <ErrorDialog
               open={error}
               title={title}
               content={content}
               close={errorClose}
               />
           </Grid>
        </>
    )

}

export default CreateAccount