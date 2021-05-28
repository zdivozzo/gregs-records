import { IRecordInfo } from './../interfaces/records';

export const setRecordList = (data: any) => ({
    type: "SET_RECORD_LIST",
    data
  });

  export const addRecord = (data: IRecordInfo) => ({
    type: "ADD_RECORD",
    data
  });

  export const editRecord = (data: IRecordInfo, recordBeingEdited: number) => ({
    type: "EDIT_RECORD",
    data,
    recordBeingEdited
  });

  export const favRecord = (id: any) => ({
    type: "FAV_RECORD",
    id
  });

  export const deleteRecord = (id: any) => ({
    type: "DELETE_RECORD",
    id
  });