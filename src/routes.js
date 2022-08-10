import CreateAccount from "./createAccount"
import Home from "./home"
import CategoryItem from "./categoryItem"

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
    }
]

export default router