import logo from './logo.svg';
import './App.css';
import CreateAccount from './createAccount';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import router from './routes';
import { useEffect } from 'react';

function App() {

  useEffect(()=>{

    const user = localStorage.getItem('customer')

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
