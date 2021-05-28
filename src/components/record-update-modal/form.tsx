import React, { useContext } from "react";
import * as Styled from "./styles";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { useFormik } from "formik";
import { FormField } from "./form-field";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { addRecord, editRecord } from "../../actions/records.actions";
import { IArtistInfo, IRecordInfo } from "../../interfaces/records";
import { setModal } from "../../actions/app.actions";
import { addArtist, editArtist } from "../../actions/artists.actions";
import { Select, MenuItem, InputLabel } from "@material-ui/core";
import { conditionList } from "../record-condition-bar/types";
import { findArtistById } from "../../utils/utils";
import { ValidationSchema } from "./validation-schema";

export const RecordUpdateForm = () => {
  const dispatch = useAppDispatch();
  const records = useAppSelector((state) => state.records);
  const artistList = useAppSelector((state) => state.artists);
  const app = useAppSelector((state) => state.app);
  // Record being edited (if applicable)
  const selectedRecord = useAppSelector((state) => {
    if (app.editMode && app.recordBeingEdited) {
      return state.records.find(
        (record: IRecordInfo) => record.id === app.recordBeingEdited
      );
    } else {
      return {};
    }
  });

  const initialValues: IRecordInfo = {
    album_title: selectedRecord?.album_title ?? "",
    artist: findArtistById(selectedRecord?.artist, artistList) ?? "",
    condition: selectedRecord?.condition ?? "",
    year: selectedRecord?.year ?? 2021,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: ValidationSchema,
    onSubmit: (values: IRecordInfo) => {
      // Check to see if this is an existing artist. If not, add a new artist
      let artistIndex = artistList.findIndex(
        (artist: IArtistInfo) => artist.name === values.artist
      );

      if (artistIndex === -1 && !app.editMode) {
        let newId = artistList.length + 1;
        dispatch(addArtist({ name: values.artist, id: newId }));
        values.artist = newId;
      } else if (!app.editMode) {
        // Set record's artist ID to the existing artist it matches
        values.artist = artistList[artistIndex].id;
      }

      // If this is edit mode, update the artist globally
      if (app.editMode) {
        // Set the artist to the id rather than the name they entered
        let editedArtistValue = values.artist.slice();
        values.artist = selectedRecord.artist;
        dispatch(editArtist(editedArtistValue, values.artist));
      } else {
        values.id = records.length + 1;
      }

      // Save record with new or updated values
      app.editMode
        ? dispatch(editRecord(values, app.recordBeingEdited))
        : dispatch(addRecord(values));

      dispatch(setModal(false, false));
    },
  });

  return (
    <Container>
      <form onSubmit={formik.handleSubmit}>
        <FormField
          formik={formik}
          fieldName="album_title"
          fieldLabel="Record Title"
        />
        <FormField
          formik={formik}
          fieldName="artist"
          fieldLabel="Record Artist"
        />
        <FormField
          formik={formik}
          fieldName="year"
          fieldLabel="Record Release Year"
        />
        <Styled.FormControlContainer fullWidth>
          <InputLabel id="condition-label">Record Condition</InputLabel>
          <Select
            fullWidth
            id="condition"
            labelId="condition-label"
            name="condition"
            label="Record Condition"
            value={formik.values.condition}
            onChange={formik.handleChange}
            placeholder="Choose record condition"
            error={formik.touched.condition && Boolean(formik.errors.condition)}
          >
            {Object.keys(conditionList).map((condition: string) => (
              <MenuItem key={condition} value={condition}>
                {conditionList[condition].display}
              </MenuItem>
            ))}
          </Select>
        </Styled.FormControlContainer>
        <Styled.FormControlContainer fullWidth>
          <Button type="submit" color="primary" variant="contained">
            Submit
          </Button>
        </Styled.FormControlContainer>
      </form>
    </Container>
  );
};
