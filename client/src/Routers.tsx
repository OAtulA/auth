

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Close from './Close'
import App from './App'

function Routers() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<App/>}></Route>
      <Route path="/close" element={<Close></Close>} />
    </Routes>
  </BrowserRouter>
  )
}

export default Routers