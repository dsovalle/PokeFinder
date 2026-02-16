// Fetch para caprutar datos basicos del pokemon 

export const pokemonDataBasic = async (namePokemon) => {
  const response = await fetch( `https://pokeapi.co/api/v2/pokemon/${namePokemon}`,) 
  if(!response.ok) {
    throw new Error("Pokemon no encontrado");
  }
  return response.json() 
}

//Fetch para capturar datos sobre la especie del pokemon 
export const pokemonSpecies = async (IdPokemon) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${IdPokemon}`)
    return response.json()
}

//Fetch para capturar 40 nombres de pokémon
export const namesPokemon = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?offset=20&limit=40")
    return response.json()
}