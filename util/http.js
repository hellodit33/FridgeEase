import axios from "axios";

export function storeSuggestions(props) {
  axios.post(
    "https://bookclub-course-default-rtdb.firebaseio.com/suggestions.json",
    props
  );
}
