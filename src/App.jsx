import "./App.css";
import { useState, useEffect } from "react";
import SearchForm from "./components/SearchForm";

export default function App() {
  const [art, setArt] = useState([]);
  const [searchTerm, setSearchTerm] = useState('picasso');

  // Définissez les paramètres de requête
  const limit = 20; // Remplacez par la limite d'éléments par page souhaitée

  // Construisez l'URL de la requête avec les paramètres de requête
  useEffect(() => {
      const apiUrl = `https://api.artic.edu/api/v1/artworks/search?q=${searchTerm}&fields=id,title,artist_display,date_display,main_reference_number,image_id&limit=${limit}`;

    fetch(apiUrl)
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("La requête a échoué");
        }
        return resp.json();
      })
      .then((data) => {
        console.log("Données récupérées :", data);

        setArt(data.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, [searchTerm]);

  const handleSearch = (searchQuery) => {
    setSearchTerm(searchQuery);
  };

  return (
    <div>
      <button onClick={() => handleSearch('matta')}>Matta</button>
      <button onClick={() => handleSearch('picasso')}>Picasso</button>
      <button onClick={() => handleSearch('frida')}>Frida Kahlo</button>
      <button onClick={() => handleSearch('renoir')}>Renoir</button>

      <SearchForm onSearch={handleSearch} />
      {art.length > 0 ? (
        <div>
          {art.map((artwork) => (
            <div key={artwork.id}>
              <h3>{artwork.title}</h3>
              <p>Artiste : {artwork.artist_display}</p>
              <p>Date : {artwork.date_display}</p>
              <p>ID de limage : {artwork.image_id}</p>
              {artwork.image_id && (
                <p>
                  <img
                    src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
                    alt={artwork.title}
                  />
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>Aucune œuvre trouvée.</p>
      )}
    </div>
  );
}
