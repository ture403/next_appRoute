import BookItem from "@/components/book-item";
import BookListSeletion from "@/components/skeleton/book-list-seletion";
import { BookData } from "@/types";
import { delay } from "@/util/delay";
import { Suspense } from "react";

async function SearchResult({ q }: { q: string }) {
    await delay(1500);

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

export default async function Page({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
    const params = await searchParams; // searchParams Promise를 await 합니다.
    const query = params.q || ""; // q 값을 추출하고, 없으면 빈 문자열을 사용합니다.
    return (
        <Suspense key={query} fallback={<BookListSeletion count={3} />}>
            <SearchResult q={query} />
        </Suspense>
    );
}
