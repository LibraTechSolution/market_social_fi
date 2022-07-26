import styled, { css } from 'styled-components';
import { coreColors, mixColors } from 'utils/colors';
import { typoDesktopModifiers } from 'utils/styles';

const IconsModifier = css`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  top: 0;
`;

const Styled = {
  Input: styled.div`
    position: relative;
  `,
  PreIcon: styled.span<{ onClick?: any }>`
    left: 32px;
    ${IconsModifier}
    z-index: 9;
    svg {
      path {
        fill: #c6c6d7;
      }
    }
  `,
  PostIcon: styled.span<{ onClick?: any }>`
    right: 32px;
    ${IconsModifier}
  `,
  Label: styled.div`
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
    color: ${mixColors.title};
    &.custom-label {
      margin-bottom: 12px;
    }
  `,
  SubLabel: styled.div`
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: ${coreColors.neutral.grey600};
    margin-top: 5px;
    margin-bottom: 8px;
  `,
  Start: styled.span`
    color: red;
  `,
  TextBox: styled.input<{
    disabled?: boolean;
    hasPreIcon?: boolean;
    hasPostIcon?: boolean;
  }>`
    padding-left: ${({ hasPreIcon }) => (hasPreIcon ? '66px' : '32px')};
    padding-right: ${({ hasPostIcon }) => (hasPostIcon ? '66px' : '32px')};
    outline: none;
    width: 100%;
    height: 64px;
    color: #ffffff;
    background: #4d5282;
    border-radius: 16px;
    border: 1px solid #4d5282;
    font: 400 18px/24px 'Sen';

    &:disabled,
    &:disabled:hover {
      opacity: 0.5;
      cursor: not-allowed;
    }

    :focus {
      border: 2px solid #7b47e1;
      caret-color: #7b47e1;
    }

    /* Chrome, Safari, Edge, Opera */
    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    ::placeholder {
      color: #c6c6d7;
    }

    /* Firefox */
    [type='number'] {
      -moz-appearance: textfield;
    }
  `,
  RelativeWrapper: styled.div`
    position: relative;
  `,
};

export default Styled;
