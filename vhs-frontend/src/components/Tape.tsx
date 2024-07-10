import { z } from 'zod';
import { Card } from 'primereact/card';
import { useNavigate } from 'react-router-dom';

import { zTapeInfo } from '../types';
import { Button } from 'primereact/button';


type TapeInfo = z.infer<typeof zTapeInfo>;

export default function Tape(tape: TapeInfo) {

    const navigate = useNavigate();

    return (
        <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={tape.id}>
            <div className="p-4 border-1 surface-border surface-50 border-round cursor-pointer" onClick={() => navigate(`tape/${tape.id}`)}>
                <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                    <div className="flex align-items-center gap-2">
                        <i className="pi pi-video"></i>
                        <span className="font-semibold">{tape.genre.toUpperCase()}</span>
                    </div>
                </div>
                <div className="flex flex-column align-items-center gap-3 py-5">
                    <img className="w-9 shadow-2 border-round bg-white" src={`vhs.png`} alt={tape.title} />
                    <div className="text-2xl font-bold">{tape.title}</div>
                </div>
                <div className="flex align-items-center justify-content-between">
                    <span className="text-2xl font-semibold">{tape.duration} min</span>
                    <span className="text-2xl font-semibold">{tape.releasedAt}.</span>
                </div>
            </div>
        </div>
    )
}