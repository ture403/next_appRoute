import { notFound } from "next/navigation";
import style from "./page.module.css";
import ReviewEditor from "@/components/review-editor";
import { ReviewData } from "@/types";
import ReviewItem from "@/components/review-item";
async function BookDetail({ id }: { id: string }) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SEVER_URL}/book/${id}`);

    if (!res.ok) {
        if (res.status == 404) {
            notFound();
        }
        return <div>오류가 발생했습니다.</div>;
    }

    const book = await res.json();

    const { title, subTitle, description, author, publisher, coverImgUrl } = book;

    return (
        <section>
            <div className={style.cover_img_container} style={{ backgroundImage: `url('${coverImgUrl}')` }}>
                <img src={coverImgUrl} />
            </div>
            <div className={style.title}>{title}</div>
            <div className={style.subTitle}>{subTitle}</div>
            <div className={style.author}>
                {author} | {publisher}
            </div>
            <div className={style.description}>{description}</div>
        </section>
    );
}

export async function ReviewList({ bookId }: { bookId: string }) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SEVER_URL}/review/book/${bookId}`);

    if (!res.ok) {
        throw new Error(`Review fetch failed : ${res.statusText}`);
    }

    const reviews: ReviewData[] = await res.json();

    return (
        <section>
            {reviews.map((review) => (
                <ReviewItem key={`review-item-${review.id}`} {...review} />
            ))}
        </section>
    );
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const bookid = id || "";
    return (
        <div className={style.container}>
            <BookDetail id={bookid} />
            <ReviewEditor bookId={bookid} />
            <ReviewList bookId={bookid} />
        </div>
    );
}
