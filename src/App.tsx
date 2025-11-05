import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import Historia from './components/Historia';
import Galeria from './components/Galeria';
function App() {
  return (
    <>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nossa-historia" element={<Historia />} />
            <Route path="/galeria" element={<Galeria />} />
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
