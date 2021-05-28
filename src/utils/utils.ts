import { IArtistInfo } from "../interfaces/records";

export const findArtistById = (id: string, artistList: Array<IArtistInfo>) => {
  return artistList.find((artist: IArtistInfo) => artist.id === id)?.name;
};
