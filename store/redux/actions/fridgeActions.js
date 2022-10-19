export const FETCH_FOOD = "FETCH_FOOD";
export const ADD_TO_FRIDGE = "ADD_TO_FRIDGE";

export const fetchFood = () => {
  return (dispatch) => {
    dispatch({
      type: FETCH_FOOD,
      payload: { id: 1, title: "spenat", description: "hej" },
    });
  };
};
