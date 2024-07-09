import { z } from 'zod';
import { zTapeInfo } from '../types';

type TapeInfo = z.infer<typeof zTapeInfo>;

export default function Tape(tape: TapeInfo) {
    return (
        <div className='flex flex-column flex-wrap justify-center align-items m-5 border-round-md bg-white cursor-pointer' >
            <img src="vhs.png" alt="vhs-template" className='w-10rem mx-auto' />
            <p className='mx-auto px-3'>{tape.title}</p>
        </div>
    )
}