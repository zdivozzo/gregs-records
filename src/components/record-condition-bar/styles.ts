import styled from "styled-components";

type StyleProps = {
    backgroundColor: string;
    width: number
}

export const RecordConditionBar = styled.div`
    margin-top: 5px;
    height: 10px;
    background-color: ${(p: StyleProps) => p.backgroundColor};
    width: ${(p: StyleProps) => p.width}%;
`;
