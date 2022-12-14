import styled, { css } from "styled-components";

interface CssProps {
  width?: number;
  height?: number;
  withStyle?: { [key: string]: string };
}

type CssStyleProps = Omit<CssProps, "withStyle">;

export const PlusIcon = ({ width, height, withStyle }: CssProps) => (
  <PlusIconBase width={width} height={height} style={withStyle} />
);

export const MinusIcon = ({ width, height, withStyle }: CssProps) => (
  <MinusIconBase width={width} height={height} style={withStyle} />
);

const BaseIcon = styled.i`
  display: inline-block;
  background-repeat: no-repeat;
  background-position: center center;
  vertical-align: middle;
  opacity: 1;
`;

const PlusIconBase = styled(BaseIcon)<CssStyleProps>`
  background-image: url(/images/plus.svg);
  ${(props) => css`
    width: ${props.width ?? 12}px;
    height: ${props.height ?? 12}px;
  `}
`;

const MinusIconBase = styled(BaseIcon)<CssStyleProps>`
  background-image: url(/images/minus.svg);
  ${(props) => css`
    width: ${props.width ?? "12px"};
    height: ${props.height ?? "12px"};
  `}
`;
