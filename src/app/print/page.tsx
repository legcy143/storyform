"use client"
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useStoryForm } from '../_store/useStoryForm'
import TableUI from '../../components/ui/TableUI';
import { Button, Chip, Spinner, Tooltip } from '@heroui/react';
import { LuDownload, LuTrash, LuTrash2 } from 'react-icons/lu';
import Img from '@/components/ui/Img';

const columns = [
    // { name: 'TASK ID', uid: 'taskId', sortable: true },
    { name: 'EMAIL', uid: 'email', sortable: true },
    { name: 'INPUT IMAGE', uid: 'inputImage', sortable: true },
    { name: 'OUTPUT IMAGE', uid: 'resultImage', sortable: true },
    { name: 'STATUS', uid: 'status', sortable: true },
    { name: 'COMPLETED AT', uid: 'completedAt', sortable: true },
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


    const [isLoading, setIsLoading] = useState(false);

    const handleDownload = async (image: string, taskId: string) => {
        setIsLoading(true);
        try {
            const response = await fetch(image, { mode: 'cors' });
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = `portrait_${taskId}.png`;
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Download failed:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const renderCell = useCallback(
        (data: any, columnKey: any) => {
            const cellValue = data[columnKey];
            let isProcessing = data["status"] === "processing";
            switch (columnKey) {
                case 'sr no':
                    return (
                        <p className="font-semibold text-small capitalize">{cellValue}</p>
                    );
                case 'inputImage':
                    return (
                        <div className="relative flex justify-center items-center">
                            <Img src={cellValue} alt="Input" className="w-16 h-16 object-cover" />
                        </div>
                    );
                case 'resultImage':
                    if (isProcessing) {
                        return (
                            <div className='h-[10rem] flex flex-col items-center justify-center gap-2'>
                                <Spinner />
                                <p>processing...</p>
                            </div>
                        );
                    }
                    return (
                        <Img src={cellValue} alt="Result" className="w-full h-[10rem] object-contain" />
                    );
                case 'email':
                    return (
                        <p className="font-semibold text-small capitalize">{cellValue}</p>
                    );
                case 'status':
                    return (
                        <Chip
                            variant='flat'
                            color={cellValue === "completed" ? "success" : "warning"}
                            className='capitalize'
                        >{cellValue}</Chip>
                    );
                case 'completedAt':
                    let value = cellValue ? new Date(cellValue).toLocaleString() : "processing...";
                    return (
                        <p className="font-semibold text-small capitalize">{value}</p>
                    );
                case 'actions':
                    return (
                        <div className="relative flex justify-center items-center gap-5">
                            <Tooltip content="Download Result Image">
                                <Button color='primary' variant='light' isIconOnly onPress={() => handleDownload(data?.resultImage, data.taskId)}
                                    isLoading={isLoading}
                                    isDisabled={isProcessing}
                                >
                                    <LuDownload />
                                </Button>
                            </Tooltip>
                            <Tooltip content="Delete">
                                <Button color='danger' variant='light' isIconOnly>
                                    <LuTrash2 />
                                </Button>
                            </Tooltip>
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
        <section className='w-full h-full max-w-[70rem] -my-12' >
            <TableUI
                selectionMode='none'
                tableData={tableData}
                columns={columns}
                numberOfDataPerPage={5}
                renderCell={renderCell}
                className="w-full h-[95%]"
                isLoading={!portraits}
                statusOptions={[
                    {
                        name: "COMPLETED",
                        uid: "completed"
                    },
                    {
                        name: "PROCESSING",
                        uid: "processing"
                    },
                ]}
                title='Portraits'
                searchByVariable='email'
            />

        </section>
    )
}
