"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { Cell, Column, HeaderCell, Table } from "rsuite-table";
import "rsuite-table/dist/css/rsuite-table.css";
import currencyFormatter from "../../functions/currencyFormatter";
import { ICoin } from "../../types/api/ICoin";
import HistoryPreview from "../HistoryPreview/HistoryPreview";
import styles from "../HomeCoinTable/HomeCoinTable.module.css";
import ImageWithFallback from "../_helpers/ImageWithFallback/ImageWithFallback";
import "./HomeReactTable.css";

interface Props {
  top100: ICoin[];
}
interface IDataInfo {
  dataInfo:
    | "priceUsd"
    | "changePercent24Hr"
    | "marketCapUsd"
    | "volumeUsd24Hr"
    | "supply";
}
const NameCell = ({ rowData, ...props }: { rowData: ICoin }) => (
  <Cell
    {...props}
    style={{
      alignItems: "center",
    }}
  >
    {/* ImageWithFallback does not work for some reason. Whenever you sort data the image does not change */}
    {/* <ImageWithFallback
      alt=""
      fallback={`/icons/${rowData.symbol?.toLowerCase()}.png`}
      src={`/icons/${rowData.symbol.toLowerCase()}.svg`}
      style={{ width: "30px" }}
    /> */}
    <img
      alt=""
      src={`/icons/${rowData.symbol.toLowerCase()}.svg`}
      style={{ width: "30px" }}
    />
    <p>{rowData.name}</p>
    <span style={{ color: "gray", fontSize: "12px" }}>{rowData.symbol}</span>
  </Cell>
);

const GraphCell = ({ rowData, ...props }: { rowData: ICoin }) => (
  <Cell {...props}>
    <HistoryPreview coin_id={rowData.id} />
  </Cell>
);

const CurrencyFormatterCell = ({
  rowData,
  dataInfo,
  ...props
}: {
  rowData: ICoin;
  dataInfo: IDataInfo;
}) => {
  return (
    <Cell
      {...props}
      style={{
        alignItems: "center",
      }}
    >
      {currencyFormatter({
        value: rowData[dataInfo] ?? "--",
        approximate: true,
      })}
    </Cell>
  );
};

const Change24Cell = ({ rowData, ...props }: { rowData: ICoin }) => {
  return (
    <Cell
      {...props}
      className={`${
        parseFloat(rowData.changePercent24Hr ?? "0") >= 0
          ? styles.positiveChange
          : styles.negativeChange
      }`}
      style={{
        alignItems: "center",
      }}
    >
      {parseFloat(rowData.changePercent24Hr ?? "0").toFixed(2)}%
    </Cell>
  );
};

const PriceCell = ({ rowData, ...props }: { rowData: ICoin }) => {
  return (
    <Cell
      {...props}
      style={{
        alignItems: "center",
      }}
    >
      {currencyFormatter({ value: rowData.priceUsd ?? "--" })}
    </Cell>
  );
};

const HomeReactTable = ({ top100 }: Props) => {
  const { push } = useRouter();

  const [sortColumn, setSortColumn] = React.useState();
  const [sortType, setSortType] = React.useState();

  const getData = () => {
    if (sortColumn && sortType) {
      return top100.sort((a, b) => {
        let x = a[sortColumn];
        let y = b[sortColumn];
        if (sortColumn !== "name") x = parseFloat(x);
        if (sortColumn !== "name") y = parseFloat(y);
        if (sortType === "asc") {
          if (typeof x === "string" && typeof y === "string") {
            return x.localeCompare(y);
          }
          if (typeof x === "number" && typeof y === "number") return x - y;
        }
        if (typeof x === "string" && typeof y === "string") {
          return y.localeCompare(x);
        }
        if (typeof x === "number" && typeof y === "number") return y - x;
      });
    }
    return top100;
  };

  const handleSortColumn = (sortColumn, sortType) => {
    setTimeout(() => {
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };
  return (
    <div>
      <Table
        autoHeight
        data={getData()}
        onRowClick={(coin) => {
          push(`/coin-info/${coin.id}`);
        }}
        onSortColumn={handleSortColumn}
        rowHeight={80}
        sortColumn={sortColumn}
        sortType={sortType}
        virtualized
      >
        <Column align="center" fixed sortable verticalAlign="middle" width={70}>
          <HeaderCell>#</HeaderCell>
          <Cell
            dataKey="rank"
            style={{
              alignItems: "center",
            }}
          />
        </Column>

        <Column flexGrow={1} sortable verticalAlign="middle" width={80}>
          <HeaderCell>Name</HeaderCell>
          <NameCell dataKey="name" />
        </Column>

        {/* <Column flexGrow={1} sortable width={130}>
          <HeaderCell>Name</HeaderCell>
          <Cell dataKey="name" />
        </Column> */}

        <Column flexGrow={1} sortable verticalAlign="middle" width={130}>
          <HeaderCell>Price</HeaderCell>
          <PriceCell dataKey="priceUsd" />
        </Column>

        <Column flexGrow={1} sortable verticalAlign="middle" width={130}>
          <HeaderCell>24h %</HeaderCell>
          <Change24Cell dataKey="changePercent24Hr" />
        </Column>

        <Column flexGrow={1} sortable verticalAlign="middle" width={200}>
          <HeaderCell>Market Cap</HeaderCell>
          <CurrencyFormatterCell
            dataInfo="marketCapUsd"
            dataKey="marketCapUsd"
          />
        </Column>

        <Column flexGrow={1} sortable verticalAlign="middle" width={200}>
          <HeaderCell>Volume(24h)</HeaderCell>
          <CurrencyFormatterCell
            dataInfo="volumeUsd24Hr"
            dataKey="volumeUsd24Hr"
          />
        </Column>

        <Column flexGrow={1} sortable verticalAlign="middle" width={200}>
          <HeaderCell>Circulating Supply</HeaderCell>
          <CurrencyFormatterCell dataInfo="supply" dataKey="supply" />
        </Column>

        <Column flexGrow={1} fullText width={200}>
          <HeaderCell>Last 7 Days</HeaderCell>
          <GraphCell />
        </Column>
      </Table>
    </div>
  );
};

export default HomeReactTable;
