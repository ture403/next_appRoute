"use server";
import { revalidatePath } from "next/cache";

export default async function cearteReviewACtion(formdata: FormData) {
    const bookId = formdata.get("bookId")?.toString();
    const content = formdata.get("content")?.toString();
    const author = formdata.get("author")?.toString();

    if (!bookId || !content || !author) {
        return;
    }
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_SEVER_URL}/review`, {
            method: "POST",
            body: JSON.stringify({
                bookId,
                content,
                author,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        
        if (res.status == 201 && res.ok) {
            revalidatePath(`/book/${bookId}`);
        }
    } catch (err) {
        console.error(err);
        return;
    }
}