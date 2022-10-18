import { View } from "react-native";

import RatingsList from "./RatingsList";
import RatingsAverage from "./RatingsAverage";
import { BOOKS } from "../../data/data";

function RatingsOutput({ ratings, style }) {
  const selectedBook = BOOKS.find((book) => book.id === bookId);

  return (
    <View style={style}>
      <RatingsAverage ratings={booksRatings} style={style} />
    </View>
  );
}

export default RatingsOutput;
