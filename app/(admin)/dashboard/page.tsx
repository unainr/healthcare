"use client";
import AdminNavbar from "@/components/ui/AdminNavbar";
import { getPatient } from "@/lib/actions/user.actions";
import React, { useEffect, useState, useMemo } from "react";
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    flexRender,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const Dashboard = () => {
    const [data, setData] = useState({ patients: [] });
    const [globalFilter, setGlobalFilter] = useState("");
    const [sorting, setSorting] = useState([]);

    useEffect(() => {
        const getpatient = async () => {
            const res: any = await getPatient();
            setData(res);
        };
        getpatient();
    }, []);

    const columns = useMemo(
        () => [
            {
                header: "Patient Details",
                accessorKey: "name",
                cell: ({ row }: { row: any }) => (
                    <div className="flex items-center gap-3">
                        <div className="shrink-0 h-9 w-9 bg-gray-800 rounded-full flex items-center justify-center">
                            <span className="text-gray-200 text-sm font-medium">
                                {row.original.name[0]}
                            </span>
                        </div>
                        <div>
                            <div className="font-medium text-gray-200">{row.original.name}</div>
                            <div className="text-sm text-gray-400">{row.original.gender}</div>
                            <div className="text-xs text-gray-500">
                                {new Date(row.original.date).toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                ),
            },
            {
                header: "Contact Information",
                accessorKey: "contact",
                cell: ({ row }: { row: any }) => (
                    <div>
                        <div className="text-gray-200">{row.original.email}</div>
                        <div className="text-sm text-gray-400">{row.original.address}</div>
                        <div className="text-xs text-gray-500">
                            Emergency: {row.original.emergency_contact}
                        </div>
                    </div>
                ),
            },
            {
                header: "Medical Details",
                accessorKey: "medical",
                cell: ({ row }: { row: any }) => (
                    <div>
                        <div className="text-gray-200">Dr. {row.original.doctors}</div>
                        <div className="flex flex-wrap gap-2 mt-1">
                            <span className="px-2 py-1 text-xs rounded-full bg-gray-800 text-gray-300">
                                {row.original.bloodgroup}
                            </span>
                            <span className="px-2 py-1 text-xs rounded-full bg-gray-800 text-gray-300">
                                {row.original.insurance}
                            </span>
                        </div>
                    </div>
                ),
            },
            {
                header: "Medical History",
                accessorKey: "history",
                cell: ({ row }: { row: any }) => (
                    <div className="space-y-1">
                        <div className="text-sm">
                            <span className="text-gray-400">Allergies:</span>
                            <span className="text-gray-200 ml-1">{row.original.allergies}</span>
                        </div>
                        <div className="text-sm">
                            <span className="text-gray-400">Current Med:</span>
                            <span className="text-gray-200 ml-1">{row.original.currentmedication}</span>
                        </div>
                        <div className="text-sm">
                            <span className="text-gray-400">Family History:</span>
                            <span className="text-gray-200 ml-1">{row.original.familymedical}</span>
                        </div>
                    </div>
                ),
            },
            {
                header: "Occupation",
                accessorKey: "occupation",
                cell: ({ row }: { row: any }) => (
                    <div className="text-sm text-gray-300">{row.original.occupation}</div>
                ),
            },
        ],
        []
    );

    const table = useReactTable({
        data: data.patients || [],
        columns,
        state: {
            globalFilter,
            sorting,
        },
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    return (
        <div className="min-h-screen bg-black">
            <AdminNavbar />
            <div className="p-4 md:p-6 lg:p-8 max-w-[1400px] mx-auto">
                <div className="bg-gray-900 rounded-xl shadow-xl">
                    {/* Header Section */}
                    <div className="p-4 md:p-6 border-b border-gray-800">
                        <div className="flex flex-col sm:flex-row justify-between gap-4">
                            <div className="flex-1 max-w-md relative">
                                <Input
                                    placeholder="Search patients..."
                                    value={globalFilter ?? ""}
                                    onChange={(e) => setGlobalFilter(e.target.value)}
                                    className="bg-gray-800 border-gray-700 text-gray-200 pl-10 focus:border-gray-600 focus:ring-gray-600"
                                />
                                <svg
                                    className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>
                            <div className="flex items-center gap-3">
                                <Select
                                    value={table.getState().pagination.pageSize.toString()}
                                    onValueChange={(value) => table.setPageSize(Number(value))}
                                >
                                    <SelectTrigger className="w-[140px] bg-gray-800 border-gray-700 text-gray-200">
                                        <SelectValue placeholder="Rows per page" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-gray-800 border-gray-700">
                                        {[10, 20, 30, 40, 50].map((pageSize) => (
                                            <SelectItem
                                                key={pageSize}
                                                value={pageSize.toString()}
                                                className="text-gray-200 hover:bg-gray-700"
                                            >
                                                {pageSize} rows
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <button className="px-4 py-2 bg-gray-800 text-gray-200 rounded-lg hover:bg-gray-700 transition-colors duration-200 flex items-center gap-2">
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 4v16m8-8H4"
                                        />
                                    </svg>
                                    Add Patient
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Table Section */}
                    <div className="overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    {table.getHeaderGroups().map((headerGroup) => (
                                        <tr key={headerGroup.id}>
                                            {headerGroup.headers.map((header) => (
                                                <th
                                                    key={header.id}
                                                    className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-300 transition-colors bg-gray-900/50"
                                                    onClick={header.column.getToggleSortingHandler()}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        {flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
                                                        {header.column.getIsSorted() && (
                                                            <svg
                                                                className="w-4 h-4"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M19 9l-7 7-7-7"
                                                                />
                                                            </svg>
                                                        )}
                                                    </div>
                                                </th>
                                            ))}
                                        </tr>
                                    ))}
                                </thead>
                                <tbody className="divide-y divide-gray-800">
                                    {table.getRowModel().rows.map((row) => (
                                        <tr
                                            key={row.id}
                                            className="hover:bg-gray-800/50 transition-colors duration-200"
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <td key={cell.id} className="px-6 py-4">
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Pagination Section */}
                    <div className="p-4 border-t border-gray-800 bg-gray-900/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <button
                                className="px-4 py-2 rounded-lg bg-gray-800 text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors duration-200 flex items-center gap-2"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 19l-7-7 7-7"
                                    />
                                </svg>
                                Previous
                            </button>
                            <button
                                className="px-4 py-2 rounded-lg bg-gray-800 text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors duration-200 flex items-center gap-2"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                Next
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </button>
                        </div>
                        <span className="text-sm text-gray-400">
                            Page{" "}
                            <span className="font-medium text-gray-200">
                                {table.getState().pagination.pageIndex + 1}
                            </span>{" "}
                            of{" "}
                            <span className="font-medium text-gray-200">
                                {table.getPageCount()}
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;