import Styled from './index.style';
import { ReactNode, useCallback, useMemo, useState } from 'react';
import cx from 'classnames';
import { Cell, Sort, TableSort } from 'utils/interfaces';
import SortUpSvg from 'assets/images/icons/sortUp.svg';
import SortDownSvg from 'assets/images/icons/sortDown.svg';
import { convertNumber } from 'utils/functions';

interface Props {
  columns: Cell[];
  data: any[];
  className?: string;
  emptyText?: ReactNode;
  onScroll?: (e: any) => void;
  loading?: boolean;
  onSort?: (sort: TableSort) => void;
}

const sortOrder: Sort[] = ['', 'asc', 'desc'];

const Table = ({ columns, data, className, emptyText, onScroll, onSort, loading = false }: Props) => {
  const [sortState, setSortState] = useState<TableSort>({
    field: '',
    sort: '',
  });

  const handleSort = useCallback(
    (field: string) => {
      let sort: Sort;
      if (sortState.field !== field) {
        sort = 'asc';
      } else {
        let nextSortTypeIndex: number;
        const sortTypeIndex = sortOrder.indexOf(sortState.sort);
        if (sortTypeIndex === sortOrder.length - 1) {
          nextSortTypeIndex = 0;
        } else {
          nextSortTypeIndex = sortTypeIndex + 1;
        }
        sort = sortOrder[nextSortTypeIndex];
      }

      setSortState({ field, sort });
      onSort?.({ field, sort });
    },
    [onSort, sortState],
  );

  const renderHeader = useMemo(() => {
    const rowHead = columns.map((col) => {
      return (
        <Styled.HeaderCell className="table-header-cell" key={col.field}>
          {col.isSort ? (
            <Styled.HeaderCellInner onClick={() => handleSort(col.field)}>
              {col.headerName}
              <Styled.SortWrap sort={col.field === sortState.field ? sortState.sort : ''}>
                <SortUpSvg className="sort-desc" width={11} height={6} />
                <SortDownSvg className="sort-asc" width={11} height={6} />
              </Styled.SortWrap>
            </Styled.HeaderCellInner>
          ) : (
            col.headerName
          )}
        </Styled.HeaderCell>
      );
    });
    return <tr>{rowHead}</tr>;
  }, [columns, handleSort, sortState.field, sortState.sort]);

  const renderRow = useCallback(
    (data: any, index: number) => {
      const oldData = { ...data };
      data.avgPrice = convertNumber(data.avgPrice, 4);
      data.totalVolumCollection = convertNumber(data.totalVolumCollection, 4);
      const titles: any = {
        volume: oldData.totalVolumCollection,
        'average-price': oldData.avgPrice,
      };

      return columns.map((col, index) => {
        return (
          <Styled.BodyCell key={col.field} className="table-body-cell" alignContent={col.align}>
            <div title={titles[col.field] || null}>{col?.renderCell?.({ value: data?.[col.field] }, data, index)}</div>
          </Styled.BodyCell>
        );
      });
    },
    [columns],
  );

  const renderBody = useMemo(() => {
    if (data?.length) {
      return data.map((dt, index) => {
        const typeRow = index % 2 === 0 ? 'even' : 'odd';
        return (
          <Styled.BodyRow key={index} className={`table-body-row ${typeRow}`}>
            {renderRow(dt, index)}
          </Styled.BodyRow>
        );
      });
    }
    return (
      <tr>
        <td colSpan={9999}>{emptyText}</td>
      </tr>
    );
  }, [data, emptyText, renderRow]);

  return (
    <Styled.Container className={cx('table-container', className)}>
      <Styled.TableHeaderOverlay className="table-header-overlay" />
      <Styled.Wrap className="table-wrap" onScroll={onScroll}>
        <Styled.Table className="table">
          <thead className="table-header">{renderHeader}</thead>
          <tbody className="table-body">
            {renderBody}
            {loading && (
              <tr>
                <Styled.SpinnerRow colSpan={9999}>
                  <Styled.DotSpinner width={40} height={40} />
                </Styled.SpinnerRow>
              </tr>
            )}
          </tbody>
        </Styled.Table>
      </Styled.Wrap>
    </Styled.Container>
  );
};

export default Table;
