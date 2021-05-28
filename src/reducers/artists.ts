// Reducer for storing, adding and updating artists

import { IArtistInfo } from "../interfaces/records";

const initialState: any = [];

function artists(state = initialState, action: any) {
  switch (action.type) {
    case "SET_ARTIST_LIST":
      return action.data;
    case "ADD_ARTIST":
      return [...state, action.artist];
    case "EDIT_ARTIST":
      return state.map((item: IArtistInfo, index: number) => {
        if (item.id === action.id) {
          return { ...item, name: action.artistName};
        }
        return item;
      });
    default:
      return state;
  }
}
export default artists;
