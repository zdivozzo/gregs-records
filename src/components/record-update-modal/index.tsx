import React, { useContext } from "react";
import Container from "@material-ui/core/Container";
import { Modal, Avatar, CardHeader, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import * as Styled from "./styles";
import { RecordUpdateForm } from "./form";
import { useAppDispatch } from "../../hooks/redux";
import { setModal } from "../../actions/app.actions";
import { ModalActions } from "../../utils/enums";

interface RecordUpdateModalProps {
  modalActive: boolean;
  action?: ModalActions;
}

export const RecordUpdateModal = ({
  modalActive,
  action = ModalActions.Add,
}: RecordUpdateModalProps) => {
  const dispatch = useAppDispatch();
  return (
    <Modal open={modalActive}>
      <Styled.ModalContainer maxWidth="sm" aria-labelledby={`${action} a Record`}>
        <CardHeader
          action={
            <IconButton
              aria-label="Close Modal"
              onClick={() => dispatch(setModal(false,false))}
            >
              <CloseIcon />
            </IconButton>
          }
          title={`${action} a Record`}
        />
        <RecordUpdateForm />
      </Styled.ModalContainer>
    </Modal>
  );
};
