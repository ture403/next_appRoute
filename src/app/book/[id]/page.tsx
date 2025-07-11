import { notFound } from "next/navigation";
import style from "./page.module.css";
import ReviewEditor from "@/components/review-editor";
import { BookData, ReviewData } from "@/types";
import ReviewItem from "@/components/review-item";
import Image from "next/image";
import { Metadata } from "next";

export async function generateStaticParams() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SEVER_URL}/book`);

    if (!res.ok) {
        throw new Error(res.statusText);
    }

    const book: BookData[] = await res.json();

    return book.map((el) => ({
        id: el.id.toString(),
    }));
}

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
                <Image src={coverImgUrl} alt={title} width={240} height={300} />
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

async function ReviewList({ bookId }: { bookId: string }) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SEVER_URL}/review/book/${bookId}`, {
        next: { tags: [`review-${bookId}`] },
    });

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

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    //현재 페이지 메타 데이터를 동적으로 생성하는 역할을 합니다.
    const { id } = await params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SEVER_URL}/book/${id}`);

    if (!res.ok) {
        throw new Error(res.statusText);
    }

    const book: BookData = await res.json();

    return {
        title: `${book.title} - 한입북스`,
        description: `${book.description}`,
        openGraph: {
            title: `${book.title} - 한입북스`,
            description: `${book.description}`,
            images: [book.coverImgUrl],
        },
    };
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
