import "./App.css";
import { useState } from "react";
import { pokemonDataBasic, pokemonSpecies, namesPokemon} from "./Services/PokemonApi";
import NotFound from  "./assets/Img/NotFound.png"
import Who from "./assets/Img/Who.png"

function App() {
  const [attributes, setAttributes] = useState({
    id: "",
    name: "",
    img: Who,
    type: "",
    ability: [],
    statHP: [],
    color: "white",
    namesPokemons: [],
  });
  const [inputNamePokemon, setInpuntNamePokemon] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmitPokemon = async () => {
    setLoading(true);

    try {
      const pokeBasic = await pokemonDataBasic(inputNamePokemon.toLowerCase());
      const pokeSpecies = await pokemonSpecies(pokeBasic.id);
      const namesPokems = await namesPokemon();
      setInpuntNamePokemon("");
      setError(null);

      setAttributes({
        id: pokeBasic.id,
        name: pokeBasic.name,
        img: pokeBasic.sprites.front_default,
        type: pokeBasic.types[0].type.name,
        ability: pokeBasic.abilities,
        statHP: pokeBasic.stats,
        color: pokeSpecies.color.name,
        namesPokemons: namesPokems.results,
      });
    } catch (error) {
      console.log(attributes.ability);
      setError("Pokémon no encontrado");
      console.error(error.message);
      setAttributes({
        ...attributes,
        id: 0,
        name: "Not Found",
        img: NotFound,
        type: "Not found",
        color: "black",
        statHP: [],
        ability: [{ ability: { name: "Not Found" } }],
      });
    } finally {
      setLoading(false);
    }
  };

  //Buscamos dentro de stat el atributo que sea igual a Hp
  const hp = attributes.statHP?.find((item) => item.stat.name === "hp");

  return (
    <>
      {/* Estado de carga basico */}
      {loading && <center><h2 className="loading">Cargando ...</h2></center>}

      <main>
        {/* Content Input */}
        <section className="content-input">
          <center>
            <h2>{!error ? "Buscador de Pokémon" : error}</h2>
          </center>
          <label htmlFor="">Ingrese el nombre del pokémon: </label>
          <input
            type=""
            value={inputNamePokemon}
            onChange={(e) => setInpuntNamePokemon(e.target.value)}
            placeholder="Nombre pokémon"
          />
          <center>
            <button onClick={() => handleSubmitPokemon()}>ENVIAR</button>
          </center>
        </section>

        {/* Content card */}
        <section className="card">
          <article
            className="card-color"
            style={{ "--pokemon-color": attributes.color }}
          >
            {/* Tittle and Hp pokémon */}
            <article className="identify-Pokemon">
              <h2>{attributes.name}</h2>
              <h5>
                {hp?.stat.name} {hp?.base_stat}
              </h5>
            </article>
            {/* Img pokemon */}
            <img
              src={attributes.img}
              alt={"Imagen pokémon de: " + attributes.name}
            />
          </article>

          {/* Section of abilities  */}
          <article className="info-abilities">
            <h4>Abilities: </h4>
            {
              //Usamos optional chaining (?), para el map: si exite hazlo, sino, no haga nada
              attributes.ability?.map((item, key) => {
                return <p key={key}>{item.ability.name}</p>;
              })
            }
          </article>
        </section>

        {/* Section marquee */}
        <section className="marqueeNames">
          <marquee behavior="slice" direction="right">
            {attributes.namesPokemons?.map((item) => item.name).join(" - ")}
          </marquee>
        </section>
      </main>
    </>
  );
}

export default App;
