import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid,IconButton } from '@mui/material';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Services from '../../services/services';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddToCartButton from '../addCartButton/addCartButton';

const style={
  price:{
    display:'flex',
    flexDirection:'row',
    jysutifyContent:'spaceEvenly'
  },
  fvtButton:{
    marginLeft:'80%',
    backgroundColor:'transeparent'
  }
}

export default function ProductCard(props) {

  const {imgUrl,name,id,originalPrice,userId,maxQty} =props

  const [isFvrt,setFvrt] = React.useState(false)

  const [hotelName,setHotelName] = React.useState('')

  const user = async()=>{

    const res = await Services.getData('sellers/user/'+userId)

    setHotelName(res[0].hotelName)

  }

  const checkInFaverote =()=>{

    const fvrt = Services.getFvrt()

    const c = fvrt.includes(id)

    console.log(c);

    setFvrt(c)

  }

  React.useEffect(()=>{

    user()

    checkInFaverote()

  },[])

  const faveroteHandler=()=>{

    const isFvrt = Services.faverote(id)

    console.log(isFvrt);

    setFvrt(isFvrt)

   // checkInFaverote()

  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <IconButton style={style.fvtButton}
      onClick={faveroteHandler}
      >
         <FavoriteBorderIcon 
         style={isFvrt?
        {
          color:'red'
        }:{
          color:'black'
        }}
         />
      </IconButton>
      <CardMedia
        component='img'
        height="140"
        image={imgUrl}
        alt={name}
        style={{
          marginTop:'-50px'
        }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Grid container item xs={12} md={12}>
          <Grid container item xs={8} md={6}>
            <Grid item xs={4} md={5}>
              <div style={style.price}>
                 <CurrencyRupeeIcon/>
                 <Typography>90</Typography>
               </div>
            </Grid>
            <Grid item xs={8} md={7} container direction='row' justifyContent='center' alignItems='center'>
               <CurrencyRupeeIcon size='small'/>
               <strike >
               <Typography variant='p' >{originalPrice}</Typography>
               </strike>
            </Grid>
          </Grid>
          <Grid item xs={4} md={6}>
             <AddToCartButton
             id={id}
             maxQty={maxQty}
             />
          </Grid>
        </Grid>
        <Typography 
         style={{
          marginLeft:'10px',
          marginTop:'5px'
         }}
         variant='h6'>{hotelName}</Typography>
      </CardContent>
    </Card>
  );
}
