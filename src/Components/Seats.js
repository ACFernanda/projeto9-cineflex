import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import Seat from "./Seat";

export default function Seats() {
  const [seats, setSeats] = useState(null);
  const [info, setInfo] = useState(null);
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
        <div className="seats">{seats ? <Seat seats={seats} /> : null}</div>
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

        <form>
          <label for="name">Nome do comprador:</label>
          <input
            type="text"
            name="name"
            placeholder="Digite seu nome..."
            required
          ></input>
          <label for="cpf">CPF do comprador:</label>
          <input
            type="text"
            name="cpf"
            pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
            placeholder="000.000.000-00"
            required
          ></input>
          <Link to={"/sucesso"}>
            <button type="submit">Reservar assento(s)</button>
          </Link>
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
