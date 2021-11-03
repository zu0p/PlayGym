import React, { useState, useEffect, useRef } from "react";
import Slide from "./slide";
import styled from '@emotion/styled'
import { Backward, Forward } from './styledComponent'

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SliderContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const SlideContainer = styled.div`
  width: 33vw;
  display: flex;
`;

export function Slider() {
  const TOTAL_SLIDES = 2;
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);
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
      slideRef.current.style.transition = "all 0.5s ease-in-out";
      slideRef.current.style.transform = `translateX(-${currentSlide}00%)`; // 백틱을 사용하여 슬라이드로 이동하는 애니메이션을 만듭니다.
    }, [currentSlide]);
  return (
      <Container>
        <Backward sx={{fontSize: '40px'}} onClick={prevSlide} />
        <SliderContainer>
          <SlideContainer ref={slideRef}>
            <Slide text={'111111111111111111111111'} />
            <Slide text={'222222222222222222222222'} />
            <Slide text={'333333333333333333333333'} />
          </SlideContainer>
        </SliderContainer>
        <Forward sx={{fontSize: '40px'}} onClick={nextSlide} />
      </Container>
  );
}