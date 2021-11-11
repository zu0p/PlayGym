import React from "react";
import styled from '@emotion/styled'

const Div = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center
`;

export default function Slide(props) {
  return (
    <Div>
      <span>{props.data}</span>
      <span>{props.data}</span>
    </Div>
  );
}