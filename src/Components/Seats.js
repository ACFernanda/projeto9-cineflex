import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

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
        <div className="seats">
          {seats ? <RenderSeats seats={seats} /> : null}
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
      </main>
      {info ? <Footer info={info} /> : null}
    </>
  );
}

function RenderSeats({ seats }) {
  return (
    <>
      {seats.map(({ id, name, isAvailable }) => (
        <>
          {isAvailable ? (
            <button className="seat available" key={id}>
              {name}
            </button>
          ) : (
            <button className="seat unavailable" key={id}>
              {name}
            </button>
          )}
        </>
      ))}
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
