export interface IRecordInfo {
  id?: number;
  album_title: string;
  artist: string;
  condition: string;
  year: string;
  fav?: boolean
}

export interface IArtistInfo {
  name: string;
  id: string;
}
