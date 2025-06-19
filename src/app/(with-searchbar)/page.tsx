import BookItem from '@/components/book-item';
import style from './page.module.css';
import { BookData } from '@/types';
import { delay } from '@/util/delay';
import { Suspense } from 'react';
import BookListSeletion from '@/components/skeleton/book-list-seletion';

async function AllBooks() {
	await delay(1500);
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
	await delay(3000);
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_SEVER_URL}/book/random`
	);
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

export const dynamic = 'force-dynamic';

export default function Home() {
	return (
		<div className={style.container}>
			<section>
				<h3>지금 추천하는 도서</h3>
				<Suspense fallback={<BookListSeletion count={3} />}>
					<RecoBooks />
				</Suspense>
			</section>
			<section>
				<h3>등록된 모든 도서</h3>
				<Suspense fallback={<BookListSeletion count={10} />}>
					<AllBooks />
				</Suspense>
			</section>
		</div>
	);
}
