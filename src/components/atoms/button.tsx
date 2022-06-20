import styled from 'styled-components';
import React from 'react';
import { MAIN_COLOR_LIGHT } from '../../config/variables';

const StyledButton = styled.button`
  background: ${MAIN_COLOR_LIGHT};
  color: white;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  line-height: ${props => {
    return props?.style?.lineHeight || 1.5;
  }};
  border-radius: 0.2rem;
  cursor: pointer;
  border: 1px solid transparent;

  &:hover {
    color: #fff;
    background-color: #0069d9;
    border-color: #0062cc;
  }
`;

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: JSX.Element[] | JSX.Element | React.ReactNode | string;
}
export default function Button({ children, onClick, style }: ButtonProps) {
  return (
    <StyledButton onClick={onClick} style={style}>
      {children}
    </StyledButton>
  );
}
