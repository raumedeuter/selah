import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ThemePage from './pages/ThemePage'
import Favourites from './pages/Favourites'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/theme/:themeId" element={<ThemePage />} />
        <Route path="/favourites" element={<Favourites />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App