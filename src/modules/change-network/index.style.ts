import styled, { css, keyframes } from "styled-components";
import { coreColors, mixColors } from "utils/colors";
import DotSpinnerSvg from "assets/images/icons/dotSpinner.svg";
import { typoDesktopModifiers, typoMobileModifiers } from "utils/styles";
import Modal from "components/modal";

const spinning = keyframes`
  ${css`
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  `}
`;

const Styled = {
  DotSpinner: styled(DotSpinnerSvg)`
    animation: ${spinning} 1500ms linear infinite;
    margin-top: 32px;

    path {
      fill: ${coreColors.functional.warning};
    }

    @media only screen and (min-width: 768px) {
      margin-top: 38px;
    }
  `,
  ModalContentWrap: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    .title {
      color: ${coreColors.neutral.dark700};
      ${typoMobileModifiers.subtitle};
      font-weight: 600 !important;

      @media only screen and (min-width: 768px) {
        ${typoDesktopModifiers.h6};
      }
    }

    .desc {
      color: ${mixColors.grey8e};
      ${typoMobileModifiers.label2};
      max-width: 300px;
      white-space: pre-line;
      text-align: center;
      margin: 8px auto 30px auto;
      font-weight: normal !important;
      @media only screen and (min-width: 768px) {
        ${typoDesktopModifiers.subtitle2};
        max-width: 356px;
        margin: 10px auto 24px auto;
      }
    }
    .desc.network {
      margin: 5px auto 20px auto;
    }

    .input-label {
      color: ${coreColors.neutral.grey600};
      ${typoDesktopModifiers.body3};
      font-size: 16px;
      line-height: 20px;
      margin-bottom: 10px;

      @media only screen and (min-width: 768px) {
        ${typoDesktopModifiers.body1};
        font-weight: 700;
      }
    }

    .input-label.first {
      margin-top: 25px;

      @media only screen and (min-width: 768px) {
        margin-top: 27px;
      }
    }

    .skip-btn {
      display: flex;
      align-items: center;
      margin-top: 15px;
      ${typoMobileModifiers.label};

      svg {
        margin-left: 11px;
      }

      @media only screen and (min-width: 768px) {
        margin-top: 20px;
        ${typoDesktopModifiers.body1};
        font-weight: 700;
      }
    }

    .network-name {
      ${typoMobileModifiers.label};
      cursor: pointer;
      font-weight: 400 !important;
      color: #2bb3ff;
      display: flex;
      justify-content: center;
      align-items: center;
      column-gap: 5px;

      @media only screen and (min-width: 768px) {
        ${typoMobileModifiers.label};
        line-height: 32px;
        margin-bottom: -10px;
      }
    }
  `,
  ChangeNetworkModal: styled(Modal)`
    .content {
      height: 248px;
      width: 328px;
    }
  `,
  ErrorIcon: styled.div`
    margin: 20px auto 15px auto;
    display: flex;
    justify-content: center;
    align-items: center;

    @media only screen and (min-width: 768px) {
      margin: 20px auto 15px auto;
    }

    & > svg {
      margin-left: 14px;
    }
  `,
};

export default Styled;
