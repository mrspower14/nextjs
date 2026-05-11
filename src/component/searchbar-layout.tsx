import { useRouter } from "next/router";
import { useState } from "react";
import { ChangeEvent } from "react";
import style from "./searchbar-layout.module.css"

export default function SearchBarLayout({children}: {children: React.ReactNode}) {

    const [search, setSearch] = useState<string>('');
    const onChangeSearch = (e:ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    const router = useRouter();
    const onSubmit = () => {
        if (!search || search === router.query.q) return;
        router.push(`/search?q=${search}`);
    }

    return (
        <div>
            <div className={style.searchbar_container}>
                <input value={search} onChange={onChangeSearch} placeholder="검색어를 입력하시오..." />
                <button onClick={onSubmit}>검색</button>
            </div>
            {children}
        </div>
    );
}
