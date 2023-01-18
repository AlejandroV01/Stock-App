"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { Cell, Column, HeaderCell, Table } from "rsuite-table";
import "rsuite-table/dist/css/rsuite-table.css";
import { ICoin } from "../../types/api/ICoin";
import HistoryPreview from "../HistoryPreview/HistoryPreview";
import ImageWithFallback from "../_helpers/ImageWithFallback/ImageWithFallback";
import "./HomeReactTable.css";

interface Props {
  top100: ICoin[];
}
const NameCell = ({ rowData, ...props }: { rowData: ICoin }) => (
  <Cell
    {...props}
    style={{
      display: "flex",
      width: "fit-content",
      alignItems: "center",
      gap: "5px",
    }}
  >
    <ImageWithFallback
      alt=""
      fallback={`/icons/${rowData.symbol?.toLowerCase()}.png`}
      src={`/icons/${rowData.symbol?.toLowerCase()}.svg`}
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

const HomeReactTable = ({ top100 }: Props) => {
  const { push } = useRouter();

  return (
    <div>
      <Table
        data={top100}
        height={600}
        onRowClick={(top100) => {
          push(`/coin-info/${top100.id}`);
        }}
        // onRowClick={() => push(`/coin-info/${top100.id}`)}
        rowHeight={120}
        virtualized
      >
        <Column align="center" fixed width={70}>
          <HeaderCell>#</HeaderCell>
          <Cell dataKey="rank" />
        </Column>

        <Column align="center" flexGrow={1} width={80}>
          <HeaderCell>Name</HeaderCell>
          <NameCell />
        </Column>

        <Column flexGrow={1} fullText width={130}>
          <HeaderCell>Price</HeaderCell>
          <Cell dataKey="priceUsd" />
        </Column>

        <Column flexGrow={1} fullText width={130}>
          <HeaderCell>24h %</HeaderCell>
          <Cell dataKey="changePercent24Hr" />
        </Column>

        <Column flexGrow={1} fullText width={200}>
          <HeaderCell>Market Cap</HeaderCell>
          <Cell dataKey="marketCapUsd" />
        </Column>

        <Column flexGrow={1} fullText width={200}>
          <HeaderCell>Volume(24h)</HeaderCell>
          <Cell dataKey="volumeUsd24Hr" />
        </Column>

        <Column flexGrow={1} fullText width={200}>
          <HeaderCell>Circulating Supply</HeaderCell>
          <Cell dataKey="supply" />
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
