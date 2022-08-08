import './App.css';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import router from './routes';
import { useEffect } from 'react';
import Services from './services';

function App() {

  useEffect(()=>{

    const user = Services.getUser()

    const fvrt= localStorage.getItem('zomotoFaverote')

    if(fvrt===null){
      localStorage.setItem('zomotoFaverote',JSON.stringify([]))
    }

    console.log(user);

    if(user===null){

      if(window.location.pathname!=='/createAccount'&&window.location.pathname!=='/login'){
        window.location.pathname='/createAccount'
      }

    }

  },[])

  return (
    <div>
       <Router>

          <Routes>

              {
                router.map((i,index)=>{

                  return <Route key={index} path={i.path} element={i.component}/>

                })
              }

          </Routes>

       </Router>
    </div>
  );
}

export default App;
