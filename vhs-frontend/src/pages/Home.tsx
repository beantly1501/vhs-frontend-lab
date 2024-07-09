import { z } from 'zod';

import Tape from "../components/Tape"
import { useGetTapes } from '../helpers/queryFunctions';
import { zTapeInfo } from '../types';

export default function Home() {

    const { isLoading, error, data } = useGetTapes();

    if (isLoading) return <div>Fetching tapes..</div>
    if (error) return <div>An error occurred: {error.message}</div>

    type TapeInfo = z.infer<typeof zTapeInfo>;

    let tapes: TapeInfo[] = data;

    return (
        <div className='flex flex-wrap max-w-80p mx-auto gap-5rem'>
            {tapes.map((tape) => {
                return (
                    <Tape {...tape} />
                )
            })}
        </div>
    )
}