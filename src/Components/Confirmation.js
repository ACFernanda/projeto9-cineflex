import { useNavigate } from "react-router-dom";

export default function Confirmation(info) {
  const title = info.info.movie.title;
  const date = info.info.day.date;
  const hour = info.info.name;
  const allSeats = info.info.seats;
  const seats = info.selectedSeats;
  const name = info.name;
  const cpf = info.cpf;
  const nameSeats = [];
  const navigate = useNavigate();

  function NameSeats() {
    for (let i = 0; i < seats.length; i++) {
      for (let j = 0; j < allSeats.length; j++) {
        if (seats[i] === allSeats[j].id) {
          nameSeats.push(allSeats[j].name);
        }
      }
    }
  }
  NameSeats();

  return (
    <>
      <p className="subtitle succeed">Pedido feito com sucesso!</p>
      <p className="success">Filme e sessão</p>
      <div className="info-film">
        <p className="dynamic-info">{title}</p>
        <p className="dynamic-info">
          {date} {hour}
        </p>
      </div>
      <p className="success">Ingressos</p>
      <div className="info-film">
        {nameSeats.map((seat) => (
          <p key={seat} className="dynamic-info">
            Assento {seat}
          </p>
        ))}
      </div>
      <p className="success">Comprador</p>
      <div className="info-film">
        <p className="dynamic-info">Nome: {name}</p>
        <p className="dynamic-info">CPF: {cpf}</p>
      </div>
      <button
        onClick={() => {
          navigate("/");
          window.location.reload();
        }}
        className="home"
      >
        Voltar para Home
      </button>
    </>
  );
}
