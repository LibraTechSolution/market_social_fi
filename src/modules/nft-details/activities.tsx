import React, { memo, useCallback, useRef, useMemo, useState, ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Cell } from 'utils/interfaces';
import { timeByUnitConverter, dotsSensitive } from 'utils/functions';
import TraddingHistories from 'utils/mock-data/tradding-histories';
import Table from 'components/table';
import classNames from 'classnames/bind';
import styles from './activities.module.scss';
const cx = classNames.bind(styles);

interface ICellData {
  nft: {
    id: string;
    content: string;
    name: string;
    previewImage: string;
  };
  _id: string;
  sellerId: string;
  buyerId: string;
  quantity: number;
  fromAddress: string;
  toAddress: string;
  price: number;
  event: string;
  listingId: string;
  transactionID: string;
  createdDate: string;
  updatedDate: string;
}

type IEvent = 'Sale' | 'Purchase' | 'Cancel Listing' | 'Listing';
const selectActivitiesOptions = [
  { value: '', label: 'All' },
  { value: 'Sale', label: 'Sale' },
  { value: 'Purchase', label: 'Purchase' },
  { value: 'Listing', label: 'Listing' },
  { value: 'Cancel Listing', label: 'Cancel Listing' },
];

const Activities = ({ label }: { label: ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const renderEvent = useCallback((value: string) => {
    const eventClassName: { [key: string]: any } = {
      SALE: 'eventSale',
      CANCELLISTING: 'eventCancelListing',
      LISTING: 'eventListing',
    };
    return (
      <div className={cx('event-block')}>
        <span className={cx(eventClassName[`${value.toUpperCase().replace(/\s/g, '')}`])}>{value}</span>
      </div>
    );
  }, []);

  const columns = useMemo(() => {
    return [
      {
        field: 'nftImage',
        headerName: '',
        align: 'left',
        renderCell: (_: any, cellData: ICellData) => {
          return (
            <Link href={`/marketplace/nft/${cellData._id}`} passHref>
              <a className={cx('nft-info')}>
                <div className={cx('nft-image')}>
                  {cellData?.nft?.previewImage && (
                    <Image src={cellData?.nft?.previewImage} alt="" width={48} height={48} objectFit={'contain'} />
                  )}
                </div>
              </a>
            </Link>
          );
        },
      },
      {
        field: '_id',
        headerName: '#',
        align: 'center',
        renderCell: ({ value }: { value: any }, cellData: any) => (
          <span>
            {dotsSensitive({
              originalString: value,
              startPosition: 4,
              endPosition: value?.length - 2,
            })}
          </span>
        ),
      },
      {
        field: 'nftName',
        headerName: 'Name',
        align: 'center',
        renderCell: (_: any, cellData: ICellData) => {
          return <span>{cellData?.nft?.name ?? ''}</span>;
        },
      },
      {
        field: 'transactionID',
        headerName: 'Transaction ID',
        align: 'center',
        renderCell: ({ value }: { value: any }, cellData: any) => (
          <span>
            {dotsSensitive({
              originalString: value,
              startPosition: 4,
              endPosition: value?.length - 2,
            })}
          </span>
        ),
      },
      {
        field: 'event',
        headerName: 'Transaction Type',
        align: 'center',
        renderCell: ({ value }: { value: any }, cellData: any) => <span>{renderEvent(value)}</span>,
      },
      {
        field: 'createdDate',
        headerName: 'Time',
        align: 'center',
        renderCell: ({ value }: { value: any }) => {
          return <span>{timeByUnitConverter(value)}</span>;
        },
      },
      {
        field: 'quantity',
        headerName: 'Total amount',
        align: 'center',
        renderCell: ({ value }: { value: any }, cellData: any) => <div>{value}</div>,
      },
      {
        field: 'buyerId',
        headerName: 'Buyer',
        align: 'center',
        renderCell: ({ value }: { value: any }, cellData: any) => (
          <span>
            {dotsSensitive({
              originalString: value,
              startPosition: 4,
              endPosition: value?.length - 2,
            })}
          </span>
        ),
      },
      {
        field: 'sellerId',
        headerName: 'Seller',
        align: 'center',
        renderCell: ({ value }: { value: any }, cellData: any) => (
          <span>
            {dotsSensitive({
              originalString: value,
              startPosition: 4,
              endPosition: value?.length - 2,
            })}
          </span>
        ),
      },
    ];
  }, [renderEvent]);

  const scrollBottom = useCallback((e: any) => {
    if (e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight) {
      // if (page < totalPage) {
      //   getDataTradingHistory(nftID, page + 1);
      // }
    }
  }, []);

  const renderEmptyText = useMemo(() => {
    return (
      <div className={cx('empty-block')}>
        <div className={cx('empty-title')}>No trading history yet</div>
      </div>
    );
  }, []);

  const renderActivities = useCallback(() => {
    return (
      <Table
        onScroll={scrollBottom}
        columns={columns as unknown as Cell[]}
        data={TraddingHistories}
        emptyText={renderEmptyText}
        loading={isLoading}
      />
    );
  }, [scrollBottom, columns, renderEmptyText, isLoading]);

  return (
    <div className={cx('activities')}>
      <h2 className="gdf-heading-7">{label}</h2>
      <div ref={ref}>{renderActivities()}</div>
    </div>
  );
};

export default memo(Activities);
