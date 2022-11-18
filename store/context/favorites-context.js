import { createContext, useState } from "react";

export const FavoritesContext = createContext({
  ids: [],
  addFav: (id) => {},
  removeFav: (id) => {},
});

function FavoritesContextProvider({ children }) {
  const [favIds, setFavIds] = useState([]);

  function addFav(id) {
    setFavIds((currentFavIds) => [...currentFavIds, id]);
  }

  function removeFav(id) {
    setFavIds((currentFavIds) =>
      currentFavIds.filter((recipeId) => recipeId !== id)
    );
  }

  const value = {
    ids: favIds,
    addFav: addFav,
    removeFav: removeFav,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContextProvider;
