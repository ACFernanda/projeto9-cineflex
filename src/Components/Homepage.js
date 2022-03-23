import { useState, useEffect } from "react";
import axios from "axios";

export default function Homepage() {
  return (
    <main>
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
        <div className="banner">
          <img src={banner.posterURL} alt={banner.title} />
        </div>
      ))}
    </>
  );
}
