import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function FilmSchedule() {
  return (
    <main className="filmschedule">
      <p className="subtitle">Selecione o horário</p>
      <Schedule />
    </main>
  );
}

function Schedule() {
  const [days, setDays] = useState([]);
  const { idSessao } = useParams;

  useEffect(() => {
    const promise = axios.get(
      `https://mock-api.driven.com.br/api/v5/cineflex/movies/1/showtimes`
    );

    promise.then((response) => {
      setDays(response.data.days);
    });
  }, []);

  return (
    <>
      {days.map(({ id, weekday, date, showtimes }) => (
        <div className="day" key={id}>
          <p>
            {weekday} - {date}
          </p>
          <div className="showtimes">
            {showtimes.map(({ name }) => (
              <Link to={`/assentos/${idSessao}`}>
                <button>{name}</button>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
