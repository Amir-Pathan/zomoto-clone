import axios from 'axios'

const url ='http://localhost:8089/'

const Services={
    getData:(path)=>{

       return new Promise((resolve,reject)=>{

        axios.get(url+path).then((res)=>{

            console.log(res.data);

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

    }
}

export default Services