// Reducer for general application state

export interface IApplicationState {
  editMode: boolean;
  recordBeingEdited?: number;
  modal: boolean;
  page: number;
  visibleRecords?: number;
}

const initialState: IApplicationState = {
  editMode: false,
  modal: false,
  page: 1,
};

function app(state = initialState, action: any) {
  switch (action.type) {
    case "SET_MODAL":
      return {
        ...state,
        modal: action.modal,
        editMode: action.editMode,
        recordBeingEdited: action.recordBeingEdited,
      };
    case "SET_PAGE":
      return {
        ...state,
        page: action.page,
      };
    default:
      return state;
  }
}
export default app;
