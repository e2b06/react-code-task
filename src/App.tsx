import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'

//  styles
import './styles/main.scss'

//  components
import { DummyComponent } from './components/DummyComponent'

//  Page
import { Home } from './pages/Home'

//  Home Page
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route
              path="contact"
              element={<DummyComponent title="contact" />}
            />

            <Route
              path="contact:id"
              element={<DummyComponent title="character" />}
            />
          </Route>

          <Route path="*" element={<DummyComponent title="Not Found" />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
