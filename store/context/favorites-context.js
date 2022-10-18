import { createContext, useState } from "react";

export const FavoritesContext = createContext({
  ids: [],
  addToRead: (id) => {},
  removeToRead: (id) => {},
});

function FavoritesContextProvider({ children }) {
  const [toReadIds, setToReadIds] = useState([]);

  function addToRead(id) {
    setToReadIds((currentToReadIds) => [...currentToReadIds, id]);
  }

  function removeToRead(id) {
    setToReadIds((currentToReadIds) =>
      currentToReadIds.filter((bookId) => bookId !== id)
    );
  }

  const value = {
    ids: toReadIds,
    addToRead: addToRead,
    removeToRead: removeToRead,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContextProvider;
