import { useState } from "react";
import styled from "styled-components";

export default function Seat({ seats, setSelectedSeats, selectedSeats }) {
  return seats.map(({ id, name, isAvailable }) => (
    <RenderButton
      key={id}
      id={id}
      name={name}
      isAvailable={isAvailable}
      setSelectedSeats={setSelectedSeats}
      selectedSeats={selectedSeats}
    />
  ));
}

function RenderButton({
  id,
  name,
  isAvailable,
  setSelectedSeats,
  selectedSeats,
}) {
  const [disponibility, setDisponibility] = useState(true);

  if (isAvailable) {
    return (
      <Button
        disponibility={disponibility}
        onClick={() => {
          {
            setDisponibility(!disponibility);
          }
          {
            if (selectedSeats.includes(id)) {
              return setSelectedSeats(
                selectedSeats.filter((selected) => selected !== id)
              );
            }
            setSelectedSeats([...selectedSeats, id]);
          }
        }}
        key={id}
      >
        {name}
      </Button>
    );
  } else {
    return (
      <button
        onClick={() => alert("Esse assento não está disponível")}
        className="seat unavailable"
        key={id}
      >
        {name}
      </button>
    );
  }
}

const Button = styled.button`
  width: 26px;
  height: 26px;
  background: ${({ disponibility }) =>
    disponibility === true ? "#c3cfd9" : "#8dd7cf"};
  border: 1px solid
    ${({ disponibility }) => (disponibility === true ? "#808f9d" : "#45bdb0")};
  border-radius: 12px;
  color: #000000;
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.04em;
  margin: 4px;
`;
