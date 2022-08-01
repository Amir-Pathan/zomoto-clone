import CreateAccount from "./createAccount"
import Home from "./home"

const router = [
    {
        path:'/',
        component:<Home/>
    },
    {
        path:'/createAccount',
        component:<CreateAccount/>
    }
]

export default router