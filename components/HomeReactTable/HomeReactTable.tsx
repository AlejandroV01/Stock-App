/* eslint-disable react/prop-types */

"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import React, { useState } from "react";
import { ICoin } from "../../types/api/ICoin";

interface Props {
  top100: ICoin[];
}

const HomeReactTable = ({ top100 }: Props) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const columns = React.useMemo<ColumnDef<ICoin>[]>(
    () => [
      {
        header: "#",
        footer: (props) => props.column.id,
        accessorKey: "rank",
        cell: (info) => info.getValue(),
      },
      {
        header: "Name",
        footer: (props) => props.column.id,
        accessorKey: "name",
        cell: (info) => info.getValue(),
      },
      {
        header: "Price",
        footer: (props) => props.column.id,
        accessorKey: "priceUsd",
        cell: (info) => info.getValue(),
      },
      {
        header: "24h %",
        footer: (props) => props.column.id,
        accessorKey: "changePercent24Hr",
        cell: (info) => info.getValue(),
      },
      {
        header: "Market Cap",
        footer: (props) => props.column.id,
        accessorKey: "marketCapUsd",
        cell: (info) => info.getValue(),
      },
      {
        header: "Volume(24h)",
        footer: (props) => props.column.id,
        accessorKey: "volumeUsd24Hr",
        cell: (info) => info.getValue(),
      },
      {
        header: "Circulating Supply",
        footer: (props) => props.column.id,
        accessorKey: "supply",
        cell: (info) => (
          <>
            <p>{info.getValue()}</p>
            <p>Hello</p>
          </>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: top100,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });
  return (
    <div className="p-2">
      <div className="h-2" />
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: " 🔼",
                          desc: " 🔽",
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table
            .getRowModel()
            .rows.slice(0, 10)
            .map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>
      <pre>{JSON.stringify(sorting, null, 2)}</pre>
    </div>
  );
};

export default HomeReactTable;
