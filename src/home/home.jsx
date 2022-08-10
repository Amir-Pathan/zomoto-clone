import React,{Component} from "react";
import ImageCorousel from "../lib/image-slider";
import Categories from "../categories/categorie";
import Header from "../header";
import SideDrawer from "../drawer";

class Home extends Component{

    constructor(){
        super()
        this.state={

        }
    }

    render(){

        return(
            <>
            <Header/>
            <ImageCorousel/>
            <Categories/>
            </>
        )

    }

}

export default Home