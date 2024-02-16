"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/app/_lib/prisma"

export const cancelBooking = async (bookingId: string) => {
    await  db.booking.delete({
        where: {
            id: bookingId,
        },
    });

    revalidatePath("/");
}