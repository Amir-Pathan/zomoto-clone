import React,{Component} from "react";
import { Typography,Grid,TextField,Button } from "@mui/material";
import fields from "./fields";
import Services from "../services/services";

class Address extends Component{
    constructor(){
        super()
        this.state={
            name:'',
            no:'',
            address:'',
            landmark:'',
            isValid:true,
            userId:''
        }
        this.addAddress=this.addAddress.bind(this)
    }

    componentDidMount(){

        const user = Services.getUser()

        this.setState({
            ...this.state,
            userId:user._id
        })

    }


    handleChange(k,e){

        this.setState({
            ...this.state,
            [k]:e
        },()=>{

            if(this.state.no.length===10&&this.state.address.length>4&&this.state.name.length>2&&this.state.landmark.length>3){

               this.setState({
                ...this.state,
                isValid:false
               })

            }else{
                this.setState({
                    ...this.state,
                    isValid:true
                   })
            }

        })

    }

    addAddress(){

        const data ={
            name:this.state.name,
            address:this.state.address,
            landmark:this.state.landmark,
            no:this.state.no,
            userId:this.state.userId
        }

          Services.postData('address/',data).then((res)=>{

            console.log(res);

            window.location.pathname='/checkout'

          }).catch((err)=>{

            console.log(err);

          })

    }

    render(){

        return(
            <>
              <Typography variant="h6" textAlign={'center'}>Add Address</Typography>
              <Grid container item xs={12} md={12}
              spacing={2}
              style={{
                width:'90%',
                marginLeft:'5%'
              }}
              >
                {
                    fields.map((field,index)=>{
                        const v = field.value
                        return <Grid item xs={12} md={12} key={index}>
                            <TextField 
                            type={field.type}
                            label={field.label}
                            value={this.state.v}
                            onChange={(e)=>{this.handleChange(v,e.target.value)}}
                            size='small'
                            fullWidth
                            />
                        </Grid>
                    })
                }
                <Grid container item xs={12} md={12}>
                     <Grid item xs={12} md={6}>
                        <Button fullWidth>Cancel</Button>
                     </Grid>
                     <Grid item xs={12} md={6}>
                        <Button fullWidth 
                        varinat='contained'
                        style={{
                            backgroundColor:"#CB202D",
                            color:'white'
                        }}
                        disabled={this.state.isValid}
                        onClick={this.addAddress}
                        >Save Address</Button>
                     </Grid>
                </Grid>
              </Grid>
            </>
        )

    }

}

export default Address