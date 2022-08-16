import axios from 'axios'

const url ='http://localhost:8089/'

let fvrt = localStorage.getItem('zomotoFaverote')

fvrt = JSON.parse(fvrt)

let crt = localStorage.getItem('zomotoCart')

crt = JSON.parse(crt)

const Services={
    getData:(path)=>{

        console.log(path);

       return new Promise((resolve,reject)=>{

        axios.get(url+path).then((res)=>{
            
        resolve(res.data)

        }).catch((err)=>{
            console.log(err);
            reject(err)
        })

       })

    },

    postData:(path,data)=>{

        return new Promise((resolve,reject)=>{

            axios.post(url+path,data).then((res)=>{

                resolve(res.data)

            }).catch((err)=>{

                reject(err)

            })

        })

    }
    ,

    isAble:(no,path)=>{

        return new Promise((resolve,reject)=>{

            axios.get(url+path+no).then((res)=>{

                if(res.data.length>0){

                    resolve(true)

                }else{

                    resolve(false)

                }

            }).catch((err)=>{
                reject(err)
            })

        })


    },

    createNewAccount:(user)=>{

        return new Promise((resolve,reject)=>{

            axios.post(url+'customers/',user).then((res)=>{

                localStorage.setItem('customer',JSON.stringify(res.data))

                resolve(res.data)

            }).catch((err)=>{

                reject(err)

            })

        })
    },

    getUser:()=>{
 
        let user = localStorage.getItem('customer')

        user = JSON.parse(user)

        return user
        
    },

    getFvrt:()=>{

        console.log(fvrt);

        return fvrt

    },

    getCart:()=>{

        return crt

    },

    cartEmpty:()=>{

        localStorage.setItem('zomotoCart',JSON.stringify([]))

    },


    faverote:(id)=>{

        console.log();

        let isAble= false

        let isFvrt = fvrt.includes(id)

        if(isFvrt){

            const removeinFvrt= fvrt.filter((i)=>{

                return i !== id

            })

            localStorage.setItem('zomotoFaverote',JSON.stringify(removeinFvrt))

            isAble = false

        }else{

            fvrt.push(id)

            localStorage.setItem('zomotoFaverote',JSON.stringify(fvrt))

            isAble=true

        }

        return isAble

    },

    inCart:(id)=>{
        let crt = localStorage.getItem('zomotoCart')

        crt = JSON.parse(crt)

        let inCart ={}

         if(crt.length>0){

            const item = crt.filter((i)=>{

                return i.id===id

            })

            //inCart.item=true;

            if(item.length>0){

                if(item[0].id===id){

                    inCart.item=true;

                    inCart.qty=item[0].qty

                }else{
                    inCart.item=false
                }

            }else{
                inCart.item=false
            } 


         }else{
            inCart.item=false
         }

         return inCart;

    },

    addCart:(id)=>{

          crt.push({
            id:id,
            qty:1
          })

          localStorage.setItem('zomotoCart',JSON.stringify(crt))

    },

    updateCart:(cntrl,id)=>{


        let crt = localStorage.getItem('zomotoCart')

        crt = JSON.parse(crt)

        const index = crt.findIndex((i)=>{
            return i.id===id
        })

        console.log(index);

        if(index===-1){
            return
        }else{

            if(cntrl==='plus'){

                let increase =crt[index].qty+1;

                console.log(increase);

                crt[index].qty=increase

                localStorage.setItem('zomotoCart',JSON.stringify(crt))

            }else{
                
                if(crt[index].qty===1){

                    const removeItem= crt.filter((i)=>{

                        return i.id!==id

                    })

                 console.log(removeItem);

                    localStorage.setItem('zomotoCart',JSON.stringify(removeItem))

                }else{

                    let increase =crt[index].qty-1;

                    console.log(increase);
    
                    crt[index].qty=increase

                    localStorage.setItem('zomotoCart',JSON.stringify(crt))

                }

            }

        }

    }
}

export default Services