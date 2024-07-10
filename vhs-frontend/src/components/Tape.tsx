import { z } from 'zod';
import { Card } from 'primereact/card';
import { handleTapeClick } from '../helpers/helperFunctions';

import { zTapeInfo } from '../types';
import { Button } from 'primereact/button';


type TapeInfo = z.infer<typeof zTapeInfo>;

export default function Tape(tape: TapeInfo) {

    const header = tape.thumbnail ? <img src={tape.thumbnail} alt={tape.title} /> : <img src="vhs.png" alt="vhs"/>
    const footer = (
        <Button label='View more info' icon="pi pi-check" style={{ margin: 'auto'}} onClick={() => handleTapeClick(tape)}/>
    )

    return (
        <Card title={tape.title} footer={footer} header={header} className='w-20rem'>
            <p className=''>
                {tape.title}
            </p>
        </Card>
    )
}