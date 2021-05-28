import React from "react";
import { RecordDetail } from "../record-card/styles";
import * as Styled from "./styles";
import { conditionList } from "./types";

type RecordConditionBarProps = {
  condition: string;
};

export const RecordConditionBar = ({ condition }: RecordConditionBarProps) => {
  const recordCondition = conditionList[condition];
  const numOfConditions = Object.keys(conditionList).length;
  return (
    <>
      <RecordDetail>
        Condition: {recordCondition.rating} / {numOfConditions} (
        {recordCondition.display})
      </RecordDetail>
      <Styled.RecordConditionBar
        backgroundColor={recordCondition.color}
        width={(recordCondition.rating / numOfConditions) * 100}
      />
    </>
  );
};
