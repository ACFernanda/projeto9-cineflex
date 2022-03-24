import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Seats() {
  return (
    <main className="seats">
      <p className="subtitle">Selecione o(s) assento(s)</p>
      <RenderSeats />
    </main>
  );
}

function RenderSeats() {}
