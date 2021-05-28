import { IRecordInfo } from './../interfaces/records';
// Reducer for storing, adding and updating records

const initialState: any = [];

function records(state = initialState, action: any) {
  switch (action.type) {
    case "SET_RECORD_LIST":
      return action.data;
    case "ADD_RECORD":
      return [ {...action.data}, ...state]
    case "EDIT_RECORD":
      return state.map((item: IRecordInfo, index: number) => {
        if(item.id === action.recordBeingEdited) {
          return {...item, ...action.data};
        }
        return item;
      });
    case "DELETE_RECORD":
      return state.filter((item: IRecordInfo) => {
        return item.id !== action.id;
      })
    case "FAV_RECORD":
      return state.map((item: IRecordInfo, index: number) => {
        if(item.id === action.id) {
          return {...item, fav: !item.fav};
        }
        return item;
      });
    default:
      return state;
  }
}
export default records;
