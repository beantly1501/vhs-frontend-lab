import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { InputText } from 'primereact/inputtext';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { Slider, SliderChangeEvent } from 'primereact/slider';
import { useEffect, useState } from 'react';
import { zTapeInfo } from '../types';
import axios from 'axios';

export default function TapeEditPage() {
    
    const { state } = useLocation();
    const navigate = useNavigate();
    
    type TapeInfo = z.infer<typeof zTapeInfo>;
    let tape: TapeInfo = state;

    const [photo, setPhoto] = useState<string>();
    const [rentalDuration, setRentalDuration] = useState<number | [number, number]>(tape.rentalDuration);
    const { register, handleSubmit, formState: { errors }, setValue} = useForm({
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
    const handleUpload = (e: any) => {
        setValue("thumbnail", e.files[0].objectURL);
        console.log(e.files[0].objectURL)
        setPhoto(e.files[0].objectURL);
    }
    const handleRentalDuration = (e: number | [number, number]) => {
        setRentalDuration(e);
        setValue("rentalDuration", e);
    }

    useEffect(() => {
        register("thumbnail");
        register("rentalDuration");
    }, [register])

    return (
        <div className='flex surface-50 p-5 gap-5 border-round-md edit-page mb-5' style={{maxWidth: '60%', margin: 'auto', marginTop: '5%'}}>
            <form className='w-full' id="tapeForm" onSubmit={handleSubmit((value) => {
                axios.patch(`/api/vhs/${tape.id}`, value);
                navigate(-1);
            })}>
                <div className='flex flex-column gap-3 justify-content-center'>
                    <div className='flex gap-5 justify-content-between block-responsivity'>
                        <div className='flex flex-column gap-1 mt-8rem responsive-width' style={{width: '70%'}}>
                            <div className='flex justify-content-between lg:mb-5'>
                                <Button icon='pi pi-arrow-left' label={"Return"} severity='secondary' onClick={() => navigate(-1)}/>
                                <Button icon='pi pi-upload' label={"Submit"} type='submit' form='tapeForm'/>
                            </div>
                            <p className='font-bold'>Title:</p>
                            <InputText id="title" {...register("title", { required: true})} className={errors.title ? "w-full border-red-500" : "w-full"}/>
                        </div>
                        <div className='flex flex-column gap-5 responsive-width' style={{width: '30%'}}>
                            <FileUpload className='mx-auto' mode="basic" chooseLabel='Choose a thumbnail' accept="image/*" customUpload uploadHandler={(e) => handleUpload(e)} auto/>
                            <img src={photo ?? "/vhs.png"} alt="" className='mx-auto' style={{width: '10rem'}} />
                        </div>
                    </div>
                    <div className='flex flex-column gap-1'>
                        <p className='font-bold'>Description:</p>
                        <textarea id="description" {...register("description", { required: true})} className={errors.description ? "w-full border-red-500 p-inputtext" : "w-full p-inputtext"} style={{ height: '10rem'}}/>
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
                            <p className=''><strong>Rental Duration:</strong> {rentalDuration} {rentalDuration === 1 ? "day" : "days"}</p>
                            {/* <InputText id="rentalDuration" keyfilter="int" {...register("rentalDuration", { required: true})} className={errors.rentalDuration ? "w-full border-red-500" : "w-full"} /> */}
                            <Slider value={rentalDuration} onChange={(e: SliderChangeEvent) => handleRentalDuration(e.value)} className='my-auto' min={1} max={10} />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}