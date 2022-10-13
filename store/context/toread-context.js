import { createContext, useState } from "react";

export const ToReadContext = createContext({
  ids: [],
  addToRead: (id) => {},
  removeToRead: (id) => {},
});

function ToReadContextProvider({ children }) {
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
    <ToReadContext.Provider value={value}>{children}</ToReadContext.Provider>
  );
}

export default ToReadContextProvider;
