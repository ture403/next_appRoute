"use client";

import cearteReviewACtion from "@/actions/create-review.action";
import style from "./review-editor.module.css";
import { useActionState, useEffect } from "react";

export default function ReviewEditor({ bookId }: { bookId: string }) {
    const [state, formAction, isPending] = useActionState(cearteReviewACtion, null);

    useEffect(() => {
        if (state && !state.status) {
            alert(state.error);
        }
    }, [state]);

    return (
        <section>
            <form action={formAction} className={style.from_container}>
                <input name="bookId" value={bookId} hidden readOnly />
                <textarea disabled={isPending} required name="content" placeholder="리뷰 내용" />
                <div className={style.submit_container}>
                    <input disabled={isPending} required name="author" placeholder="작성자" />
                    <button disabled={isPending} type="submit">
                        {isPending ? " ..." : "작성하기"}
                    </button>
                </div>
            </form>
        </section>
    );
}
