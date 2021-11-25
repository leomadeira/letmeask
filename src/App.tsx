import { BrowserRouter, Routes, Route } from "react-router-dom";

import { NewRoom } from "./pages/NewRoom";
import { Home } from "./pages/Home";
import { Room } from "./pages/Room";

import { AuthContextProvider } from './contexts/AuthContext'

export function App() {
  return (
      <BrowserRouter>
        <AuthContextProvider>
          <Routes>
            
            <Route path="/" element={<Home />} /> {/* Antigamente era component={Home} */}
            <Route path='/rooms/' element={<NewRoom />} />
            <Route path="/rooms/:id" element={<Room />} />
            
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
  );  
}

