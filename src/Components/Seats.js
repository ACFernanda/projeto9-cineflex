import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import Seat from "./Seat";

export default function Seats() {
  const [seats, setSeats] = useState(null);
  const [info, setInfo] = useState(null);
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);
  const { idSessao } = useParams();

  useEffect(() => {
    const promise = axios.get(
      `https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`
    );

    promise.then((response) => {
      setSeats(response.data.seats);
      setInfo(response.data);
    });
    promise.catch((error) => {
      console.error(error);
    });
  }, []);

  return (
    <>
      <main className="select-seats">
        <p className="subtitle">Selecione o(s) assento(s)</p>
        <div className="seats">
          {seats ? (
            <Seat
              seats={seats}
              setSelectedSeats={setSelectedSeats}
              selectedSeats={selectedSeats}
            />
          ) : null}
        </div>
        <div className="labels">
          <div className="label">
            <div className="seat selected"></div>
            <p>Selecionado</p>
          </div>
          <div className="label">
            <div className="seat available"></div>
            <p>Disponível</p>
          </div>
          <div className="label">
            <div className="seat unavailable"></div>
            <p>Indisponível</p>
          </div>
        </div>

        <form onSubmit={(event) => BuyTickets(event, name, cpf, selectedSeats)}>
          <label for="name">Nome do comprador:</label>
          <input
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite seu nome..."
            minLength="3"
          ></input>
          <label for="cpf">CPF do comprador:</label>
          <input
            required
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            placeholder="Digite seu CPF..."
            pattern="[0-9]{11}"
          ></input>
          <button type="submit">Reservar assento(s)</button>
        </form>
      </main>
      {info ? <Footer info={info} /> : null}
    </>
  );
}

function Footer({ info }) {
  const { posterURL, title } = info.movie;

  return (
    <footer>
      <div className="banner small">
        <img src={posterURL} alt={title} />
      </div>
      <div className="info-film">
        <p>{title}</p>
        <p>
          {info.day.weekday} - {info.name}
        </p>
      </div>
    </footer>
  );
}

function BuyTickets(event, name, cpf, selectedSeats) {
  event.preventDefault();

  if (selectedSeats.length > 0) {
    const promise = axios.post(
      "https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many",
      {
        ids: selectedSeats,
        name: name,
        cpf: cpf,
      }
    );

    promise.then((response) => {
      console.log(response);
    });

    promise.catch((error) => {
      console.log(error.response.data);
      alert("Vish! Algo deu errado.");
    });
  } else {
    alert("Selecione o(s) assento(s).");
  }
}
