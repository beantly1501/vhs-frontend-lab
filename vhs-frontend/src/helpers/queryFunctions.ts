import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export const getTapes = async () => {
    const response = await axios.get("/api/vhs");

    return response.data;
}

export const useGetTapes = () => {
    return useQuery({
        queryKey: ['getTapes'],
        queryFn: getTapes
    })
}