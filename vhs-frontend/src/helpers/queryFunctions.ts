import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { zTapeInfo } from '../types';


type TapeInfo = z.infer<typeof zTapeInfo>;


// get all tapes
export const getTapes = async (search: string | null) => {
    const response = await axios.get(search ? `/api/vhs?title=${search}` : `/api/vhs`);

    return response.data;
}
export const useGetTapes = (search: string | null) => {
    return useQuery({
        queryKey: ['getTapes', search],
        queryFn: () => {
            getTapes(search)
        }
    })
}

// get specific tape through id
export const getTape = async (id: number) => {
    const response = await axios.get(`/api/vhs/${id}`);

    return response.data;
}
export const useGetTape = (id: number) => {
    return useQuery({
        queryKey: ['getTape', id],
        queryFn: () => getTape(id)
    })
}