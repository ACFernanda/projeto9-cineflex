import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

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
  const { idFilme } = { useParams };

  useEffect(() => {
    const promise = axios.get(
      "https://mock-api.driven.com.br/api/v5/cineflex/movies"
    );

    promise.then((response) => {
      setBanners(response.data);
    });
  }, []);
  console.log(banners);

  return (
    <>
      {banners.map((banner) => (
        <Link to={`/sessoes/${banner.id}`}>
          <div className="banner" key={banner.id}>
            <img src={banner.posterURL} alt={banner.title} />
          </div>
        </Link>
      ))}
    </>
  );
}
