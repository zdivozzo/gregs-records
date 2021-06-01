import React, { useEffect, useState } from "react";
import { RecordList } from "./components/record-list";
import Container from "@material-ui/core/Container";
import { RecordUpdateModal } from "./components/record-update-modal";
import { setRecordList } from "./actions/records.actions";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { Box, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { setModal } from "./actions/app.actions";
import { IArtistInfo } from "./interfaces/records";
import { setArtistList } from "./actions/artists.actions";
import { ModalActions } from "./utils/enums";
import { RecordPagination } from "./components/pagination";
import { RecordsPerPage } from "./utils/constants";
import TextField from "@material-ui/core/TextField";

import VinylIcon from "./images/vinyl.svg";

export const AlbumManager = () => {
  const dispatch = useAppDispatch();
  const recordList = useAppSelector((state) => state.records);
  const artistList = useAppSelector((state) => state.artists);
  const app = useAppSelector((state) => state.app);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    (async () => {
      let data;
      try {
        data = await fetch("http://localhost:3001/Records").then((res) =>
          res.json()
        );
        let artists: Array<IArtistInfo> = [];

        data.forEach((item: any, index: number) => {
          artists.push(item.artist);
          item.artist = item.artist.id; // Reference artist by id so it will update when they change later
          item.id = index + 1; // Give each record an id for easier reference
          item.year = String(item.year);
          item.fav = false;
        });
        dispatch(setArtistList(artists));
        dispatch(setRecordList(data));
      } catch (error) {}
    })();
  }, []);

  return (
    <>
      <Container maxWidth="md">
        <Box textAlign="center">
          <h1 style={{ fontFamily: "Roboto" }}>
            <img
              src={VinylIcon}
              alt=""
              width="40"
              style={{ verticalAlign: "top" }}
            />{" "}
            Greg's Record Stash
          </h1>
          <Box>
            <TextField
              label="Record Search"
              variant="outlined"
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
            />
          </Box>
          {/* Don't show pagination is there is an active search term */}
          {searchTerm === "" && (
            <RecordPagination
              totalRecords={Math.ceil(recordList.length / RecordsPerPage)}
            />
          )}
        </Box>
        <RecordList
          recordList={recordList}
          searchTerm={searchTerm}
          artistList={artistList}
        />
        {searchTerm === "" && (
          <RecordPagination
            totalRecords={Math.ceil(recordList.length / RecordsPerPage)}
          />
        )}
      </Container>
      {/* Modal to edit / add records */}
      <RecordUpdateModal
        modalActive={app.modal}
        action={app.editMode ? ModalActions.Edit : ModalActions.Add}
      />
      <Fab
        color="primary"
        aria-label="Add New Record"
        style={{ position: "fixed", right: 30, bottom: 30 }}
        data-testid="add-record"
        onClick={() => dispatch(setModal(true, false))}
      >
        <AddIcon />
      </Fab>
    </>
  );
};

export default AlbumManager;
