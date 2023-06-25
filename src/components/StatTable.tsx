'use client';

import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
  flexRender,
  getSortedRowModel,
  type SortingState,
} from '@tanstack/react-table';
import { CharData } from '@/data';
import { useMemo, useState } from 'react';

const tableHeaders = [
  'HP',
  'STR',
  'MAG',
  'DEX',
  'SPD',
  'DEF',
  'RES',
  'LCK',
  'BLD',
  'RTG',
];

export const StatTable = ({ initialData }: { initialData: CharData[] }) => {
  const columnHelper = createColumnHelper<CharData>();
  const columns = [
    columnHelper.accessor('name', { header: 'Name' }),
    columnHelper.accessor('growth.HP', {
      header: 'HP',
    }),
    columnHelper.accessor('growth.STR', {
      header: 'STR',
    }),
    columnHelper.accessor('growth.MAG', {
      header: 'MAG',
    }),
    columnHelper.accessor('growth.DEX', {
      header: 'DEX',
    }),
    columnHelper.accessor('growth.SPD', {
      header: 'SPD',
    }),
    columnHelper.accessor('growth.DEF', {
      header: 'DEF',
    }),
    columnHelper.accessor('growth.RES', {
      header: 'RES',
    }),
    columnHelper.accessor('growth.LCK', {
      header: 'LCK',
    }),
    columnHelper.accessor('growth.BLD', {
      header: 'BLD',
    }),
    columnHelper.accessor('growth.RTG', {
      header: 'RTG',
    }),
  ];

  const data = useMemo(() => initialData, [initialData]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting: sorting,
    },
    onSortingChange: setSorting,
  });

  return (
    <div className="p-8">
      <div className="max-w-5xl mx-auto overflow-x-auto shadow-xl rounded relative scroll-list">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-800 text-white">
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <tr key={headerGroup.id} className="text-left">
                  {headerGroup.headers.map((header, index) => {
                    return (
                      <th
                        className={
                          'text-left py-3 px-2 uppercase font-semibold text-sm bg-black ' +
                          (index === 0 ? 'sticky left-0' : '')
                        }
                        key={header.id + tableHeaders[index]}
                      >
                        {header.isPlaceholder ? null : (
                          <div
                            {...{
                              className: header.column.getCanSort()
                                ? 'cursor-pointer select-none'
                                : '',
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: ' 🔼',
                              desc: ' 🔽',
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                        )}
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>
          <tbody className="bg-slate-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="relative group font-medium">
                {row.getVisibleCells().map((cell, index) => (
                  <td
                    key={cell.id + tableHeaders[index]}
                    className={
                      'px-2 py-3 bg-slate-200 group-hover:bg-blue-900 group-hover:text-white ' +
                      (index === 0 ? 'sticky left-0 z-10' : '')
                    }
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
