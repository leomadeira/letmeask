import { BrowserRouter, Routes, Route } from "react-router-dom";


import { NewRoom } from "./pages/NewRoom";
import { Home } from "./pages/Home";

export function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} /> {/* Antigamente era component={Home} */}
          <Route path='/rooms' element={<NewRoom />} />
        </Routes>
      </BrowserRouter>
  );  
}

