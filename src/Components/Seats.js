import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Seats() {
  return (
    <main className="select-seats">
      <p className="subtitle">Selecione o(s) assento(s)</p>
      <div className="seats">
        <RenderSeats />
      </div>
    </main>
  );
}

function RenderSeats() {
  const [seats, setSeats] = useState([]);
  const { idSessao } = useParams();

  useEffect(() => {
    const promise = axios.get(
      `https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`
    );

    promise.then((response) => {
      setSeats(response.data.seats);
    });
  }, []);

  return (
    <>
      {seats.map(({ id, name, isAvailable }) => (
        <div className="seat" key={id}>
          {isAvailable ? (
            <div className="available">{name}</div>
          ) : (
            <div className="unavailable">{name}</div>
          )}
        </div>
      ))}
    </>
  );
}
