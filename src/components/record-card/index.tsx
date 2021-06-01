import React from "react";
import * as Styled from "./styles";
import { RecordConditionBar } from "../record-condition-bar";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { IArtistInfo, IRecordInfo } from "../../interfaces/records";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setModal } from "../../actions/app.actions";
import { IconButton } from "@material-ui/core";
import { deleteRecord, favRecord } from "../../actions/records.actions";

type RecordCardProps = {
  recordInfo: IRecordInfo;
};

export const RecordCard = ({ recordInfo }: RecordCardProps) => {
  const { id, album_title, year, artist, condition, fav } = recordInfo;
  
  const artistName = useAppSelector((state) =>
    state.artists.find((art: IArtistInfo) => art.id === artist)
  )?.name;
  
  const dispatch = useAppDispatch();

  const openEditModal = (recordId: any) => {
    dispatch(setModal(true, true, recordId));
  };

  return (
    <Styled.RecordCard role="listitem" data-testid="record-card">
      <Styled.RecordCardHeader
        action={
          <>
            <IconButton
              aria-label="Edit Record"
              onClick={() => openEditModal(id)}
              data-testid="edit-record"
            >
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="Delete Record"
              onClick={() => dispatch(deleteRecord(id))}
              data-testid="delete-record"
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              aria-label="Like Record"
              onClick={() => dispatch(favRecord(id))}
              data-testid="like-record"
              aria-selected={fav}
            >
              <FavoriteIcon color={fav ? 'secondary' : 'action'} />
            </IconButton>
          </>
        }
        title={`${album_title}`}
        subheader={artistName}
      />
      <Styled.RecordDetail>Release Year: {year}</Styled.RecordDetail>
      <RecordConditionBar condition={condition} />
    </Styled.RecordCard>
  );
};
