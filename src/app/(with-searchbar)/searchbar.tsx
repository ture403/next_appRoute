"use client";

import { useState } from "react";

export default function Searchbar() {
    const [search, setSearch] = useState("");

    const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };
    return (
        <div>
            <input onChange={onChangeSearch} value={search} type="text" />
            <button>검색</button>
        </div>
    );
}
