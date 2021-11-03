import React from "react";
import styled from '@emotion/styled'

const Div = styled.div`
  width: 100%;
  height: 100%;
`;

export default function Slide({text}) {
  return (
      <Div>
        {text}
      </Div>
  );
}