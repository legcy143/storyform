"use client"
import React, { useCallback, useEffect, useMemo } from 'react'
import { useStoryForm } from '../_store/useStoryForm'
import TableUI from '../../components/ui/TableUI';

const columns = [
    { name: 'EMAIL', uid: 'email', sortable: true },
    { name: 'STATUS', uid: 'status', sortable: true },
    { name: 'ACTIONS', uid: 'actions' },
];


export default function page() {
    const portraits = useStoryForm(s => s.portraits);
    const fetchPortraits = useStoryForm(s => s.fetchPortraits);

    useEffect(() => {
        if (!portraits) {
            fetchPortraits();
        }
    }, [])

    useEffect(() => {
        console.log("Portraits fetched:", portraits);
    }, [portraits])

    const renderCell = useCallback(
        (event: any, columnKey: any) => {
            const cellValue = event[columnKey];
            switch (columnKey) {
                case 'sr no':
                    return (
                        <p className="font-semibold text-small capitalize">{cellValue}</p>
                    );
                case 'email':
                    return (
                        <p className="font-semibold text-small capitalize">{cellValue}</p>
                    );
                case 'status':
                    return (
                        <p className="font-semibold text-small capitalize">{cellValue}</p>
                    );
                case 'actions':
                    return (
                        <div className="relative flex justify-center items-center gap-5">
                            {/* <DeleteModal
                onDelete={() => {
                  deleteRegistration(event?._id);
                }}
                isLoading={event.isDeleting}
                eventName={event?.name}
              /> */}
                        </div>
                    );
                default:
                    return JSON.stringify(cellValue);
            }
        },
        [],
    );

    let tableData = useMemo(() => {
        if (Array.isArray(portraits)) {
            return portraits;
        }
        return [];
    }, [portraits]);


    return (
        <section className='w-full h-full max-w-[60rem]' >
            <TableUI
                selectionMode='none'
                tableData={tableData}
                columns={columns}
                renderCell={renderCell}
                className="w-full h-full"
                isLoading={!portraits}
                statusOptions={[
                    {
                        name: "COMPLETED",
                        uid: "completed"
                    },
                    {
                        name: "PROCESSING",
                        uid: "processing"
                    }
                ]}
                title='Portraits'
                searchByVariable='email'
            />

        </section>
    )
}
