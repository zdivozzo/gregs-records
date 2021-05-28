import React, { useState } from "react";
import * as Styled from "./styles"
import { PaginationItem } from "@material-ui/lab";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setPage } from "../../actions/app.actions";

type RecordPaginationProps = {
  totalRecords: number;
};

export const RecordPagination = ({ totalRecords }: RecordPaginationProps) => {
  const page = useAppSelector((state) => state.app.page);
  const dispatch = useAppDispatch();
  const handleChange = (event: any, value: number) => {
    dispatch(setPage(value));
  };
  return (
    <Styled.PaginationBar
      count={totalRecords}
      color="primary"
      page={page}
      onChange={handleChange}
      renderItem={(item) => <PaginationItem {...item} />}
    />
  );
};
