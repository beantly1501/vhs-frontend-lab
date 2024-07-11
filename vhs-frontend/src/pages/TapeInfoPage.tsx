import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { Button } from 'primereact/button';

import '../styles.scss'
import { useGetTape } from '../helpers/queryFunctions';
import { zTapeInfo } from '../types';
import axios from 'axios';

export default function TapeInfoPage() {

    const { id } = useParams();
    const { isLoading, error, data } = useGetTape(parseInt(id!));
    const navigate = useNavigate();

    type TapeInfo = z.infer<typeof zTapeInfo>;
    let tape: TapeInfo = data;

    if (isLoading) return <div>Fetching tapes..</div>
    if (error) return <div>An error occurred: {error.message}</div>

    const handleDelete = (id: number) => {
        axios.delete(`/api/vhs/${id}`).catch(() => {});
        navigate("/")
    }

    return (
        <div className='flex flex-column xl:flex-row surface-50 p-5 gap-5 border-round-md info-page' style={{maxWidth: '60%', margin: 'auto', marginTop: '10%'}}>
            <div className='flex flex-column gap-5'>
                <Card className='flex justify-content-center'>
                    <img src="/vhs.png" alt="test" style={{width: '20rem'}} />  
                </Card>
                <Card>
                    <div className='flex justify-content-between h-2rem'>
                        <p><strong>Release year:</strong></p>
                        <p>{tape.releasedAt}</p>
                    </div>
                    <Divider className='surface-900' style={{height: '2px'}} />
                    <div className='flex justify-content-between h-2rem'>
                        <p><strong>Genre:</strong></p>
                        <p>{tape.genre.toUpperCase()}</p>
                    </div>
                    <Divider className='surface-900' style={{height: '2px'}} />
                    <div className='flex justify-content-between h-2rem'>
                        <p><strong>Duration:</strong></p>
                        <p>{tape.duration} min</p>
                    </div>
                    <Divider className='surface-900' style={{height: '2px'}} />
                </Card>
            </div>
            <div>
                <div className='flex flex-column gap-5'>
                    <Card className=''>
                        <div className='flex flex-column'>
                            <p className='font-bold mx-auto text-xl'>{tape.title}</p>
                            <p>{tape.description}</p>
                        </div>
                    </Card>
                    <Card className=''>
                        <div className='flex justify-content-between h-2rem'>
                            <p><strong>Quantity:</strong></p>
                            <p>{tape.quantity}</p>
                        </div>
                        <Divider className='surface-900' style={{height: '2px'}} />
                        <div className='flex justify-content-between h-2rem'>
                            <p><strong>Rental duration:</strong></p>
                            <p>{tape.rentalDuration} days</p>
                        </div>
                        <Divider className='surface-900' style={{height: '2px'}} />
                        <div className='flex justify-content-between h-2rem'>
                            <p><strong>Rental price:</strong></p>
                            <p>{tape.rentalPrice} euros</p>
                        </div>
                        <Divider className='surface-900' style={{height: '2px'}} />
                    </Card>
                    <Card>
                        <div className='flex flex-column justify-content-center px-7 gap-2 buttons-responsivity'>
                            <Button icon='pi pi-arrow-left' className="w-8rem mx-auto" label={"Return"} severity='secondary' onClick={() => navigate(-1)}/>
                            <Button icon='pi pi-pencil' className="w-8rem mx-auto" label={"Edit"} onClick={() => navigate(`/edit/${tape.id}`, { state: tape})}/>
                            <Button icon='pi pi-trash' className="w-8rem mx-auto" label={"Delete"} severity='danger' onClick={() => handleDelete(tape.id)}/>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}