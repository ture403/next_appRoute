"use server";
import {revalidateTag } from "next/cache";

export default async function cearteReviewACtion(_: any, formdata: FormData) {
    const bookId = formdata.get("bookId")?.toString();
    const content = formdata.get("content")?.toString();
    const author = formdata.get("author")?.toString();

    if (!bookId || !content || !author) {
        return {
            status: false,
            error : "리뷰 내용과 작성자를 입력해주세요"
        }
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
        
        if (!res.ok) {
            throw new Error(res.statusText)
        }
        if (res.status == 201 && res.ok) {
            //1. 특정 주소의 해당하는 페이지만 재검증
            // revalidatePath(`/book/${bookId}`);

            //2. 특정 경로의 모든 동적 페이지 (첫번쨰 인수 폴더경로)
            // revalidatePath(`/book/[id]`, "page");
            
            //3. 특정 레이아웃을 갖는 모든 페이지 재검증
            // revalidatePath('/(with-searchbar', 'layout')

            //4. 모든 데이터 재검증
            // revalidatePath("/","layout")

            //5. 테그 기준, 데이터 캐시 재검증
            revalidateTag(`review-${bookId}`)
            return {
                status: true,
                error : ""
            }
        }
    } catch (err) {
        return {
            status: false,
            error : "리뷰 저장에 실패햿습니다." + err
        }
        return;
    }
}