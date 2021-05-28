import { IRecordInfo } from "./../interfaces/records";

export const setModal = (
  modal: boolean,
  editMode: boolean,
  recordBeingEdited?: number
) => ({
  type: "SET_MODAL",
  modal,
  editMode,
  recordBeingEdited,
});

export const setPage = (page: number) => ({
    type: "SET_PAGE",
    page
})