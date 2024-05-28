import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import PageNotFound from "./Components/404/PageNotFound";
// import News from "./Components/News/News";
import Navbar from "./Components/Navbar/Navbar";;

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<Home key="general" category="General"/>}/>
        <Route exact path="/about" element={<About/>}/>
        <Route exact path="/news" element={<Home key="general1" category="General"/>}/>
        <Route exact path="/entertainment" element={<Home key="entertainment" category="entertainment"/>}/>
        <Route exact path="/health" element={<Home key="health" category="health"/>}/>
        <Route exact path="/science" element={<Home key="science" category="science"/>}/>
        <Route exact path="/sports" element={<Home key="sports" category="sports"/>}/>
        <Route exact path="/technology" element={<Home key="technology" category="technology"/>}/>
        <Route exact path="/*" element={<PageNotFound/>}/>
      </Routes>
      {/* <Footer/> */}
    </Router>
  );
}

export default App;