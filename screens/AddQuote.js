import QuoteForm from "../components/Quotes/QuoteForm";

function AddQuote({ route, navigation }) {
  function createQuoteHandler(quote) {
    navigation.navigate("AllQuotes", {
      quote: quote,
    });
  }
  const bookToRate = route.params.bookId;
  return (
    <QuoteForm bookToRate={bookToRate} onCreateQuote={createQuoteHandler} />
  );
}

export default AddQuote;
