import React, { HtmlHTMLAttributes } from 'react';
import { Container } from './styles';

interface IScrollProps extends HtmlHTMLAttributes<HTMLDivElement> {
  colors: {
    primary: string;
    secondary: string;
  };
}
const ScrollBar: React.FC<IScrollProps> = ({ children, colors }) => {
  return <Container colors={colors}>{children}</Container>;
};

export default ScrollBar;
