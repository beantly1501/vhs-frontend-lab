import axios from 'axios';
import { DataView } from 'primereact/dataview';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { useDebounce } from 'use-debounce';
import { z } from 'zod';
        
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Tape from '../components/Tape';
import { zTapeInfo } from '../types';

export default function Home() {

    
    const [search, setSearch] = useState<string>();

    
    const debouncedSearch = useDebounce(search, 500);
    
    // const { isLoading, error, data } = useGetTapes(search);
    
    const {data, isLoading, error} = useQuery({
        queryKey: ['getTapes', debouncedSearch],
        queryFn:
        () => {
            return axios.get(search ? `/api/vhs?title=${search}` : "/api/vhs")
        }
    })

    if (isLoading) return <div>Fetching tapes..</div>
    if (error) return <div>An error occurred: {error.message}</div>

    type TapeInfo = z.infer<typeof zTapeInfo>;

    let tapes: TapeInfo[] = data?.data;

    const itemTemplate = (tape: TapeInfo) => {
        return (
            <Tape {...tape} />
        );
    };

    return (
        <div className='card max-w-90p mx-auto pb-5' style={{maxWidth: '90%', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <IconField iconPosition="left" style={{display: 'inline', margin: 'auto'}} className='py-5'>
                <InputIcon className="pi pi-search"> </InputIcon>
                <InputText v-model="value1" placeholder="Search" style={{width: '30vw', height: '5vh'}} value={search} onChange={(e) => setSearch(e.target.value)} autoFocus/>
            </IconField>
            <DataView value={tapes} itemTemplate={itemTemplate}/>
        </div>
    )
}