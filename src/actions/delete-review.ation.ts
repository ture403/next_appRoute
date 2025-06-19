"use server";

import { revalidateTag } from "next/cache";


export async function DeleteReviewAction(_:any,formData :FormData) {
    const reviewId = formData.get('reviewId')?.toString();
    const bookId = formData.get('bookId')?.toString();
    
    if (!reviewId) {
        return {
            status: false,
            error: " 삭제할 리뷰가 없습니다."
        }
    }

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_SEVER_URL}/review/${reviewId}`, {
            method : "DELETE",
        });

        if (!res.ok) {
            throw new Error(res.statusText);
        }

        revalidateTag(`review-${bookId}`)

        return {
            status: true,
            error: ""
        };

    } catch(err) {
        return {
            status: false,
            error : "리뷰에 삭제 실패" + err
        }
    }
}
