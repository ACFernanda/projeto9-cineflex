import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./Header";
import Homepage from "./Homepage";
import FilmSchedule from "./FilmSchedule";
import Seats from "./Seats";
import Confirmation from "./Confirmation";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/sessoes/:idFilme" element={<FilmSchedule />}></Route>
        <Route path="/assentos/:idSessao" element={<Seats />}></Route>
        <Route path="/sucesso" element={<Confirmation />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
