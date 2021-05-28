import { IArtistInfo, IRecordInfo } from './../interfaces/records';

export const setArtistList = (data: any) => ({
    type: "SET_ARTIST_LIST",
    data
  });

  export const addArtist = (artist: IArtistInfo) => ({
    type: "ADD_ARTIST",
    artist
  });

  export const editArtist = (artistName: string, id: string) => ({
    type: "EDIT_ARTIST",
    artistName,
    id
  });