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
  const [info, setInfo] = useState({});
  const { idFilme } = useParams();

  useEffect(() => {
    const promise = axios.get(
      `https://mock-api.driven.com.br/api/v5/cineflex/movies/${idFilme}/showtimes`
    );

    promise.then((response) => {
      setDays(response.data.days);
      setInfo(response.data);
    });
  }, []);

  return (
    <main className="filmschedule">
      {days.map(({ id, weekday, date, showtimes }) => (
        <div className="day" key={id}>
          <p>
            {weekday} - {date}
          </p>
          <div className="showtimes">
            {showtimes.map(({ name, id }) => (
              <Link to={`/assentos/${id}`} key={id}>
                <button>{name}</button>
              </Link>
            ))}
          </div>
        </div>
      ))}
      <Footer banner={info.posterURL} title={info.title} />
    </main>
  );
}

function Footer({ banner, title }) {
  return (
    <footer>
      <div className="banner small">
        <img src={banner} alt={title} />
      </div>
      <p>{title}</p>
    </footer>
  );
}
