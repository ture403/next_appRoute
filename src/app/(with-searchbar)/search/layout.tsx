import { ReactNode } from "react";
import Searchbar from "../searchbar";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div>
            <div>임시서치바</div>
            <Searchbar />
            {children}
        </div>
    );
}
