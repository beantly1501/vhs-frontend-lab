import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { InputText } from 'primereact/inputtext';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import axios from 'axios';

import { zTapeInfo } from '../types';

export default function TapeEditPage() {
    
    const { state } = useLocation();
    const navigate = useNavigate();
    
    type TapeInfo = z.infer<typeof zTapeInfo>;
    let tape: TapeInfo = state;

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            title: tape.title,
            description: tape.description,
            genre: tape.genre,
            duration: tape.duration,
            releasedAt: tape.releasedAt,
            quantity: tape.quantity,
            rentalPrice: tape.rentalPrice,
            rentalDuration: tape.rentalDuration,
            thumbnail: tape.thumbnail
        }
    });

    return (
        <div className='flex surface-50 p-5 gap-5 border-round-md edit-page' style={{maxWidth: '60%', margin: 'auto', marginTop: '10%'}}>
            <form className='w-full' id="tapeForm" onSubmit={handleSubmit((value) => {
                axios.patch(`/api/vhs/${tape.id}`, value);
                navigate(-1);
            })}>
                <div className='flex flex-column gap-3 justify-content-center'>
                    <div className='flex gap-5 justify-content-between block-responsivity'>
                        <div className='flex flex-column gap-1 w-full'>
                            <p className='font-bold'>Title:</p>
                            <InputText id="title" {...register("title", { required: true})} className={errors.title ? "w-full border-red-500" : "w-full"}/>
                        </div>
                        <div>
                            <p className='font-bold'>Choose a thumbnail:</p>
                            <FileUpload mode="basic" accept="image/*" customUpload uploadHandler={(e) => console.log(e.files)} {...register("thumbnail")} />
                        </div>
                    </div>
                    <div className='flex flex-column gap-1'>
                        <p className='font-bold'>Description:</p>
                        <InputText id="description" {...register("description", { required: true})} className={errors.description ? "w-full border-red-500" : "w-full"}/>
                    </div>
                    <div className='flex flex-column gap-1'>
                        <p className='font-bold'>Genre:</p>
                        <InputText id="genre" {...register("genre", { required: true})} className={errors.genre ? "w-full border-red-500" : "w-full"}/>
                    </div>
                    <div className='flex flex-column gap-1'>
                        <p className='font-bold'>Duration:</p>
                        <InputText id="duration" keyfilter="int" {...register("duration", { required: true})} className={errors.duration ? "w-full border-red-500" : "w-full"} />
                    </div>
                    <div className='flex flex-column gap-1'>
                        <p className='font-bold'>ReleaseYear:</p>
                        <InputText id="releaseYear" keyfilter="int" {...register("releasedAt", { required: true})} className={errors.releasedAt ? "w-full border-red-500" : "w-full"} />
                    </div>
                    <div className='flex gap-5 justify-content-between block-responsivity'>
                        <div className='flex flex-column gap-1 w-full'>
                            <p className='font-bold'>Quantity:</p>
                            <InputText id="quantity" keyfilter="int" {...register("quantity", { required: true})} className={errors.quantity ? "w-full border-red-500" : "w-full"} />
                        </div>
                        <div className='flex flex-column gap-1 w-full'>
                            <p className='font-bold'>Rental Price:</p>
                            <InputText id="rentalPrice" keyfilter="int" {...register("rentalPrice", { required: true})} className={errors.rentalPrice ? "w-full border-red-500" : "w-full"} />
                        </div>
                        <div className='flex flex-column gap-1 w-full'>
                            <p className='font-bold'>Rental Duration:</p>
                            <InputText id="rentalDuration" keyfilter="int" {...register("rentalDuration", { required: true})} className={errors.rentalDuration ? "w-full border-red-500" : "w-full"} />
                        </div>
                    </div>
                </div>
                <div className='flex justify-content-between px-7 py-5'>
                    <Button icon='pi pi-arrow-left' label={"Return"} severity='secondary' onClick={() => navigate(-1)}/>
                    <Button icon='pi pi-upload' label={"Submit"} type='submit' form='tapeForm'/>
                </div>
            </form>
        </div>
    )
}