import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";
import CardHeader from "@material-ui/core/CardHeader";
import styled from "styled-components";

export const RecordCard = styled(Card)``;

export const RecordCardHeader = styled(CardHeader)`
  font-size: 16px;
`;

export const RecordCardContent = styled(Container)`
  padding: 0 20px;
`;

export const RecordDetail = styled.div`
  font-family: "Roboto";
  text-transform: uppercase;
  color: #222;
  font-size: 12px;
  background-color: #eee;
  padding: 5px;
  margin: 0 0 15px 15px;
  display: inline-block;
  width: auto;
`;
