import React, { useEffect, useMemo } from "react";
import _ from "lodash";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { RecordCard } from "../record-card";
import { IArtistInfo, IRecordInfo } from "../../interfaces/records";
import { useAppSelector } from "../../hooks/redux";
import { findArtistById } from "../../utils/utils";
import { RecordsPerPage } from "../../utils/constants";

type RecordListProps = {
  recordList: Array<IRecordInfo>;
  artistList: Array<IArtistInfo>;
  searchTerm: string;
};

export const RecordList = ({
  recordList,
  searchTerm,
  artistList,
}: RecordListProps) => {
  const page = useAppSelector((state) => state.app.page);
  const searchWord = searchTerm.toLowerCase();

  // Set record list to lower case and flatten all at once to cache
  // also set artist string
  const recordListCopy = useMemo(() => {
    return _.cloneDeep([...recordList]).map((record) => {
      record.artist = findArtistById(record.artist, artistList) || "";
      return Object.values(record).map((rec) => {
        return String(rec).toLowerCase();
      });
    });
  }, [recordList, artistList]);

  // Search function
  const search = (record: IRecordInfo, index: number) => {
    if (searchWord !== "") {
      let tempRecord: any = recordListCopy[index];
      return Object.values(tempRecord).some(function (record: any) {
        return _.includes(record, searchWord);
      });
    } else {
      return true;
    }
  };

  const showRecordList = () => {
    // Don't limit by page if searching
    let records =
      searchTerm === ""
        ? recordList.slice((page - 1) * RecordsPerPage, page * RecordsPerPage)
        : recordList;

    return records
      .filter(function (record: IRecordInfo, index: number) {
        return search(record, index);
      })
      .map(function (record: IRecordInfo, index: number) {
        return (
          <Grid item xs={12} key={`${index}_${record.album_title}`}>
            <RecordCard
              recordInfo={record}
              key={`${index}_${record.album_title}`}
            />
          </Grid>
        );
      });
  };

  return (
    <Container maxWidth="sm">
      <Grid container spacing={3} role="list">
        {showRecordList()}
      </Grid>
    </Container>
  );
};
