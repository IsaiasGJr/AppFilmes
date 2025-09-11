import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client'
import { HashRouter,Route,Routes} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import MovieDT from "./MovieDT/page.jsx";

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

ReactDOM.createRoot(document.getElementById('root')).render(
  // <BrowserRouter>
  // <Routes>
  //   <Route path='/'element={<App/>}/>
  //   <Route path='/movie/:id' element={<MovieDT />}/>
  // </Routes>
  // </BrowserRouter>
  <HashRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/movie/:id' element={<MovieDT />} />
    </Routes>
  </HashRouter>
)
