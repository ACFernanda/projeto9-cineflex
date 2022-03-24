import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Homepage() {
  return (
    <main className="homepage">
      <p className="subtitle">Selecione o filme</p>
      <div className="banners">
        <FilmBanners />
      </div>
    </main>
  );
}

function FilmBanners() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const promise = axios.get(
      "https://mock-api.driven.com.br/api/v5/cineflex/movies"
    );

    promise.then((response) => {
      setBanners(response.data);
    });
  }, []);

  return (
    <>
      {banners.map((banner) => (
        <Link to={`/sessoes/${banner.id}`} key={banner.id}>
          <div className="banner">
            <img src={banner.posterURL} alt={banner.title} />
          </div>
        </Link>
      ))}
    </>
  );
}
