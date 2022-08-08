import axios from 'axios'

const url ='http://localhost:8089/'

let fvrt = localStorage.getItem('zomotoFaverote')

fvrt = JSON.parse(fvrt)

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

    }
}

export default Services