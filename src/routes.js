import CreateAccount from "./createAccount"
import Home from "./home"
import CategoryItem from "./categoryItem"
import Checkout from "./checkout"

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
    }
]

export default router