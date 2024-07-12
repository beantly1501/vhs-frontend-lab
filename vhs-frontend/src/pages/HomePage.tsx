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
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { InputSwitch } from 'primereact/inputswitch';
import { getSearchUrl } from '../helpers/helperFunctions';
import { Chip } from 'primereact/chip';

export default function Home() {

    const navigate = useNavigate();
    const [search, setSearch] = useState<string>("");
    const [isAvailable, setIsAvailable] = useState<boolean>(true);

    
    const debouncedSearch = useDebounce(search, 500);
    const debouncedIsAvailable = useDebounce(isAvailable, 500);
        
    const {data, isLoading, error} = useQuery({
        queryKey: ['getTapes', debouncedSearch, debouncedIsAvailable],
        queryFn:
        () => {
            let searchUrl = getSearchUrl(search, isAvailable);
            return axios.get(searchUrl);
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
        <div className='card max-w-90p mx-auto pb-5 home-page' style={{maxWidth: '90%', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <div className='flex gap-5 justify-content-center align-items-center'>
                <IconField iconPosition="left" style={{display: 'inline'}} className='py-5'>
                    <InputIcon className="pi pi-search"> </InputIcon>
                    <InputText className='search-bar' v-model="value1" placeholder="Search" style={{width: '30vw', height: '5vh'}} value={search} onChange={(e) => setSearch(e.target.value)} autoFocus/>
                </IconField>
                <div className='flex flex-column gap-2'>
                    <Chip className='primereact-font' label='Is available?' />
                    <InputSwitch checked={isAvailable} onChange={() => setIsAvailable(!isAvailable)} className='mx-auto' />
                </div>
                <Button icon="pi pi-plus" onClick={() => navigate(`/create`)} style={{height: '3.5rem', width: '3.5rem'}}/>
            </div>
            <DataView value={tapes} itemTemplate={itemTemplate}/>
        </div>
    )
}