import { z } from 'zod';
import { zTapeInfo } from '../types';

type TapeInfo = z.infer<typeof zTapeInfo>;

export function handleTapeClick(tape: TapeInfo) {
    console.log(tape.title)
}