import "./App.css";
import { useState, useEffect } from "react";
import Card from "./components/Card";

export default function App() {
  const [art, setArt] = useState([]);
  // pour choper toutes données sur une oeuvre :
  /* fetch('https://api.artic.edu/api/v1/artworks/129884')
  .then((resp) => resp.json())
  .then((data) => console.log(data)); */

  // pour filtrer les données que l'on veut recevoir, on précise dans "fields" :
  /* fetch('https://api.artic.edu/api/v1/artworks?fields=id,title,artist_display,date_display,main_reference_number')
  .then((resp) => resp.json())
  .then((data) => console.log(data)); */

  // pour filtrer, on peut aussi préciser dans search. Ici, toutes les oeuvres dont les métadonnées contiennent "cat" vont ressortir :
  /* fetch('https://api.artic.edu/api/v1/artworks/search?q=cats')
  .then((resp) => resp.json())
  .then((data) => console.log(data)); */
  /* useEffect(() => {
      const getArt = () => {
  fetch('https://api.artic.edu/api/v1/artworks/27992?fields=id,title,image_id')
  .then(resp => resp.json())
  .then(data => {
    setArt(data);
  })
  };getArt();
});
*/
  /* useEffect(() => {
    const fetchData = () => {
        fetch('https://api.artic.edu/api/v1/artworks/search?q=picasso')

        .then((response) => {
          if (!response.ok) {
            throw new Error("Erreur réseau: " + response.statusText);
          }
          return response.json();
        })
        .then((data) => {
          setArt(data);
          console.log(data);

        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des données:", error);
        });
    };
    fetchData();
  }, []);

  return (
    <div>
      {art && (
        <div>
          <h2>Œuvre</h2>
          <p>Nom : {art.data.title}</p>
          <p>artiste: {art.data.artist_display}</p>
          <p>date: {art.data.date_display}</p>
          <p>ça nous vient tout droit de : {art.data.place_of_origin}</p>
          <p>id de la pic : {art.data.image_id}</p>
          <p>url de base pour get les img : https://www.artic.edu/iiif/2</p>
          <p>on need concat le champ image_id à cet url :</p>
          <p>est-ce de la pâte à modeler ? non cest {art.data.artwork_type_title}</p>

          <p>ça marche pas encore car on doit aussi concat ça ensuite : /full/843,/0/default.jpg ... comme ça :</p>
          <img src={`https://www.artic.edu/iiif/2/${art.data.image_id}/full/843,/0/default.jpg`}/>
        </div>
      )}
    </div> */
  /* ); */

  // EXEMPLE : JE VEUX TOUTES LES OEUVRES DE PICASSO :
  // je filtre en ajoutant "picasso" :
  useEffect(() => {
    const fetchData = () => {
      fetch("https://api.artic.edu/api/v1/artworks/search?q=picasso")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erreur réseau: " + response.statusText);
          }
          return response.json();
        })
        .then((data) => {
          setArt(data); // Je mets le résultat de ma requête dans "art" via setArt;
          // si je console.log(art), j'ai 10 résultats au maximum, voir comment faire sauter cette limite
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des données:", error);
        });
    };
    fetchData(); 
  }, []);

  // je boucle sur art pour afficher chaque oeuvre qui y est stockée :
  return (
    <>{console.log(art)};
      {/* {art && art.map((artwork) => (
        <Card
          key={artwork.id}
          title={artwork.title}
          artist={artwork.artist_display}
          src={artwork.image_id} */}
        />
      ))}
    </>
  );
}
