import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./Header";
import Homepage from "./Homepage";
import FilmSchedule from "./FilmSchedule";
import Seats from "./Seats";
import Confirmation from "./Confirmation";

export default function App() {
  const [info, setInfo] = useState(null);
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/sessoes/:idFilme" element={<FilmSchedule />}></Route>
        <Route
          path="/assentos/:idSessao"
          element={
            <Seats
              setInfo={setInfo}
              setSelectedSeats={setSelectedSeats}
              setName={setName}
              setCpf={setCpf}
              info={info}
              selectedSeats={selectedSeats}
              name={name}
              cpf={cpf}
            />
          }
        ></Route>
        <Route
          path="/sucesso"
          element={
            <Confirmation
              info={info}
              selectedSeats={selectedSeats}
              name={name}
              cpf={cpf}
            />
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}
