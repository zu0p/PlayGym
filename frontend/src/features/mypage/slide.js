import React from "react";
import styled from '@emotion/styled'

const Div = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between
`;

export default function Slide({text}) {
  return (
      <Div>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
      </Div>
  );
}