import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import QuotesList from "../components/Quotes/QuotesList";

function AllQuotes({ route }) {
  const [loadedQuotes, setLoadedQuotes] = useState([]);
  const bookToRate = route.params.bookId;
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused && route.params) {
      setLoadedQuotes((curQuotes) => [...curQuotes, route.params.quote]);
    }
  }, [route, isFocused]);
  return <QuotesList bookToRate={bookToRate} quotes={loadedQuotes} />;
}

export default AllQuotes;
