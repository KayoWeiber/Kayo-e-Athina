import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Historia from './components/Historia';
import Galeria from './components/Galeria';
import NotFound from './components/NotFound';
import ScrollToTop from './components/ScrollToTop';
function App() {
  return (
    <>
      <BrowserRouter basename="/Kayo-e-Athina">
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nossa-historia" element={<Historia />} />
          <Route path="/galeria" element={<Galeria />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
