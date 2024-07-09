import { z } from "zod";

export const zTapeInfo = z.object({
    title: z.string(),
    description: z.string(),
    genre: z.string(),
    duration: z.number(),
    releasedAt: z.number(),
    rentalPrice: z.number(),
    rentalDuration: z.number(),
    quantity: z.number(),
    thumbnail: z.string()
})