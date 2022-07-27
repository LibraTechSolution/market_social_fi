import styled, { css } from 'styled-components';
import { coreColors, mixColors } from 'utils/colors';
import { typoDesktopModifiers } from 'utils/styles';

const IconsModifier = css`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

const Styled = {
  Input: styled.div`
    position: relative;
  `,
  PreIcon: styled.span<{ onClick?: any }>`
    left: 20px;
    ${IconsModifier}
    z-index: 9;
    svg {
      path {
        fill: #8e8e93;
      }
    }
  `,
  PostIcon: styled.span<{ onClick?: any }>`
    right: 20px;
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
    box-sizing: border-box;
    border-radius: 8px;
    padding-left: ${({ hasPreIcon }) => (hasPreIcon ? '50px' : '20px')};
    padding-right: ${({ hasPostIcon }) => (hasPostIcon ? '50px' : '20px')};
    outline: none;
    width: 100%;
    background-color: transparent;
    border: 1px solid ${coreColors.neutral.grey400};
    ${typoDesktopModifiers.body2}
    font-weight: 600;
    font-size: 14px;
    height: 42px;
    color: ${coreColors.neutral.grey600};

    &:disabled,
    &:disabled:hover {
      opacity: 0.5;
      cursor: not-allowed;
    }

    :focus {
      border: 2px solid #7265fd;
      caret-color: #7265fd;
    }

    /* Chrome, Safari, Edge, Opera */
    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    ::placeholder {
      color: ${coreColors.neutral.grey400};
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
