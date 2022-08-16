import CreateAccount from "./createAccount"
import Home from "./home"
import CategoryItem from "./categoryItem"
import Checkout from "./checkout"
import Address from "./address"

const router = [
    {
        path:'/',
        component:<Home/>
    },
    {
        path:'/createAccount',
        component:<CreateAccount/>
    },
    {
        path:'/category/:id',
        component:<CategoryItem/>
    },
    {
        path:'/checkout',
        component:<Checkout/>
    },
    {
        path:'/address',
        component:<Address/>
    }
]

export default router