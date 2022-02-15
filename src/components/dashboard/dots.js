import React from 'react';
import styled from 'styled-components';

const Dots = (props) => {
  return (
    <DotsWrapper
      legendColor={props.legendColor}
      width={props.width}
      height={props.height}
      textColor={props.textColor}
      textSize={props.textSize}
      margin={props.margin}
    >
      <div className="af">
        <span className="dots"></span>
        <p>{props.legendName}</p>
      </div>
    </DotsWrapper>
  );
};

const DotsWrapper = styled.div`
  .dots {
    background-color: ${(props) => props.legendColor};
    height: ${(props) => (props.width ? props.width : '5px')};
    width: ${(props) => (props.height ? props.height : '5px')};
    margin: ${(props) => (props.margin ? props.margin : '')};
    border-radius: 50%;
    display: inline-block;
    margin-right: 0.2rem;
  }
  .af {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-left: 0.3rem;
  }
  .af p {
    color: ${(props) => (props.textColor ? props.textColor : '')};
    font-size: ${(props) => (props.textSize ? props.textSize : '')};
  }
`;

export default Dots;
