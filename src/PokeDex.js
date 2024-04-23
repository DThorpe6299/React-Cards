import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import axios from "axios";
import PokemonSelect from "./PokemonSelect";
import PokemonCard from "./PokemonCard";
import "./PokeDex.css";
import useAxios from "./hooks/useAxios";

/* Renders a list of pokemon cards.
 * Can also add a new card at random,
 * or from a dropdown of available pokemon. */
function PokeDex() {
  const [pokemon, setPokemon] = useState([]);
  const [responseData, fetchDeck] = useAxios("https://pokeapi.co/api/v2/pokemon/");

  useEffect(()=>{
    fetchDeck();
  },[]);



  const addPokemon = async (name) => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}/`);
      setPokemon((prevPokemon) => [...prevPokemon, { ...response.data, id: uuid() }]);
    } catch (error) {
      console.error("Error adding pokemon:", error);
    }
  };



  return (
    <div className="PokeDex">
      <div className="PokeDex-buttons">
        <h3>Please select your pokemon:</h3>
        <PokemonSelect add={addPokemon} />
      </div>
      <div className="PokeDex-card-area">
        {pokemon.map((poke) => (
          <PokemonCard
            key={poke.id}
            front={poke.sprites.front_default}
            back={poke.sprites.back_default}
            name={poke.name}
            stats={poke.stats.map((stat) => ({
              value: stat.base_stat,
              name: stat.stat.name,
            }))}
          />
        ))}
      </div>
    </div>
  );
}

export default PokeDex;
