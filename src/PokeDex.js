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
  const {responseData, fetchData: fetchPokemon} = useAxios("https://pokeapi.co/api/v2/pokemon/");
  
 

  useEffect(()=>{
    if(responseData){
      setPokemon((prevPokemon) => [...prevPokemon, { ...responseData, id: uuid() }]);
  }
  },[responseData]);

  const addPokemon = async (name) => {
    try {
      await fetchPokemon(name);
    } catch (error) {
      console.error("Error adding pokemon:", error);
    }
  };


  console.log(pokemon)
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
