import styled, { css, keyframes } from 'styled-components';
import { coreColors, mixColors } from 'utils/colors';
import { elevations, typoDesktopModifiers, typoMobileModifiers } from 'utils/styles';
import DotSpinnerSvg from 'assets/images/icons/dotSpinner.svg';
import { Sort } from 'utils/interfaces';

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
  Container: styled.div`
    overflow: hidden;
    position: relative;
    background: ${coreColors.neutral.white};
    border-radius: 24px;
    padding: 0px 24px 40px;
    filter: drop-shadow(0px 8px 12px rgba(9, 30, 66, 0.15)) drop-shadow(0px 0px 1px rgba(9, 30, 66, 0.31));
  `,
  Wrap: styled.div`
    overflow: auto;
    ::-webkit-scrollbar {
      width: 6px;
      height: 52.5px;
    }
    ::-webkit-scrollbar-track {
      background: none;
    }
    ::-webkit-scrollbar-thumb {
      background: ${mixColors.grey8e};
      border-radius: 20px;
      ${elevations.lvl2};
    }
    ::-webkit-scrollbar-corner {
      background: ${coreColors.neutral.whiteSmoke};
    }
    ::-webkit-scrollbar-track-piece {
      height: 30px;
    }
  `,
  TableHeaderOverlay: styled.div``,
  Table: styled.table`
    table-layout: auto;
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
  `,
  BodyRow: styled.tr`
    height: 68px;

    &:last-of-type .table-body-cell {
      border-bottom: none;
    }
    &.even {
      background: #f4f4f7;
    }
  `,
  BodyCell: styled.td<{ alignContent?: string }>`
    margin: 0;
    text-align: ${({ alignContent }) => alignContent ?? 'left'};
    color: ${coreColors.neutral.grey600};
    white-space: nowrap;
    position: relative;

    @media only screen and (min-width: 768px) {
      padding: 12px;
      line-height: 68px;
    }

    & > div {
      width: 100%;
      height: 100%;
    }
  `,
  HeaderCell: styled.th`
    margin: 0;
    height: 80px;
    line-height: 80px;
    color: ${coreColors.neutral.grey900};
    white-space: nowrap;
    padding: 12px;
  `,
  EmptyData: styled.div``,
  HeaderCellInner: styled.div`
    display: flex;
    align-items: center;
  `,
  SortWrap: styled.div<{ sort: Sort }>`
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    cursor: pointer;

    .sort-desc {
      margin-bottom: 1px;

      ${({ sort }) =>
        sort === 'desc' &&
        css`
          path {
            fill: ${coreColors.neutral.grey300};
          }
        `};
    }

    .sort-asc {
      margin-top: 1px;

      ${({ sort }) =>
        sort === 'asc' &&
        css`
          path {
            fill: ${coreColors.neutral.grey300};
          }
        `};
    }
  `,
  DotSpinner: styled(DotSpinnerSvg)`
    animation: ${spinning} 1500ms linear infinite;
    margin: 10px auto;
    position: absolute;
    left: 0;
    right: 0;

    path {
      fill: ${coreColors.functional.warning};
    }

    @media only screen and (min-width: 768px) {
    }
  `,
  SpinnerRow: styled.td`
    position: relative;
    width: 100%;
  `,
};

export default Styled;
