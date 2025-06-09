import books from "@/mock/books.json";
import BookItem from "@/components/book-item";
import { BookData } from "@/types";

export default async function Page({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
    const { q } = await searchParams;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SEVER_URL}/book/search?q=${q}`);

    if (!res.ok) {
        return <div>오류가 발생했습니다.</div>;
    }
    const searchDatas: BookData[] = await res.json();
    console.log(searchDatas);
    return (
        <div>
            {searchDatas.map((book) => (
                <BookItem key={book.id} {...book} />
            ))}
        </div>
    );
}
