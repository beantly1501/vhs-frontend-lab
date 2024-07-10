import { z } from 'zod';
import { useParams } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from "primereact/floatlabel";
import { useState } from 'react';

import { zTapeInfo } from '../types';
import { useGetTape } from '../helpers/queryFunctions';

export default function TapeInfoPage() {

    const { id } = useParams();
    const { isLoading, error, data } = useGetTape(parseInt(id!));

    type TapeInfo = z.infer<typeof zTapeInfo>;
    let tape: TapeInfo = data;

    if (isLoading) return <div>Fetching tapes..</div>
    if (error) return <div>An error occurred: {error.message}</div>

    return (
        <div style={{maxWidth: '90%', margin: 'auto', paddingTop: '5%'}}>
            <FloatLabel>
                <InputText id="title" value={tape.title} />
                <label htmlFor="title">Title</label>
            </FloatLabel>
        </div>
    )
}