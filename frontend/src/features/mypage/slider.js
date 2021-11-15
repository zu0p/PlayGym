import React, { useState, useEffect, useRef } from "react";
import styled from '@emotion/styled'
import { Backward, Forward } from './styledComponent'
import Grid from '@mui/material/Grid';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
`;

const SliderContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`

// const SlideContainer = styled.div`
//   width: 33vw;
//   display: flex;
// `;

export function Slider(props) {
  const TOTAL_SLIDES = props.total;
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const nextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) { // 더 이상 넘어갈 슬라이드가 없으면 슬라이드를 초기화합니다.
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };
  const prevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(TOTAL_SLIDES);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  useEffect(() => {
    sliderRef.current.style.transition = "all 0.5s ease-in-out";
    sliderRef.current.style.transform = `translateX(-${currentSlide}00%)`; // 백틱을 사용하여 슬라이드로 이동하는 애니메이션을 만듭니다.
  }, [currentSlide]);
  
  return (
    <Container>
      <Backward sx={{fontSize: '40px', zIndex: '40', height: '100%', backgroundColor: '#FFF'}} onClick={prevSlide} />
      <SliderContainer ref={sliderRef}>
        <Grid container direction="column">
          {props.children}
        </Grid>
      </SliderContainer>
      <Forward sx={{fontSize: '40px', zIndex: '40', height: '100%', backgroundColor: '#FFF'}} onClick={nextSlide} />
    </Container>
  );
}