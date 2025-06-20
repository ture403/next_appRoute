import BookItem from "@/components/book-item";
import style from "./page.module.css";
import { BookData } from "@/types";
import { Metadata } from "next";

async function AllBooks() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SEVER_URL}/book`);
    if (!res.ok) {
        return <div>오류가 발생했습니다..</div>;
    }
    const allBooks: BookData[] = await res.json();

    return (
        <div>
            {allBooks.map((book) => (
                <BookItem key={book.id} {...book} />
            ))}
        </div>
    );
}

async function RecoBooks() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SEVER_URL}/book/random`);
    if (!res.ok) {
        return <div>오류가 발생했습니다...</div>;
    }

    const recobooks: BookData[] = await res.json();
    return (
        <div>
            {recobooks.map((book) => (
                <BookItem key={book.id} {...book} />
            ))}
        </div>
    );
}

export const metadata: Metadata = {
    title: "한입 북스",
    description: "한입 북스에 등록된 도서를 만나보세요",
    openGraph: {
        title: "한입 북스",
        description: "한입 북스에 등록된 도서를 만나보세요",
        images: ["/thumbnail.png"],
    },
};

export default function Home() {
    return (
        <div className={style.container}>
            <section>
                <h3>지금 추천하는 도서</h3>
                <RecoBooks />
            </section>
            <section>
                <h3>등록된 모든 도서</h3>
                <AllBooks />
            </section>
        </div>
    );
}
