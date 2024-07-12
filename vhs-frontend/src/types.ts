import { number, z } from "zod";

export const zTapeInfo = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    genre: z.string(),
    duration: z.number(),
    releasedAt: z.number(),
    rentalPrice: z.number(),
    rentalDuration: z.custom<number | [number, number]>(),
    quantity: z.number(),
    thumbnail: z.string()
})