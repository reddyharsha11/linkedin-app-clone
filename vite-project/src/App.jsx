import Home from "./components/Pages/Home/index.jsx";
import MainNewsPage from "./components/Pages/MainNewsPage/index.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom"
const App=()=>{

  return <>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/news" element={<MainNewsPage/>}/>
              </Routes>
            </BrowserRouter>
        </>
};
export default App;