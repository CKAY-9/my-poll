import { User } from "@prisma/client";
import style from "./header.module.scss";
import Link from "next/link";

const Header = (props: {
    user: User | null
}) => {
    return (
        <header className={style.header}>
            <Link href="/">Home</Link>
            <Link href="/poll/all">Polls</Link>
            <Link href="/user/all">Users</Link>
            {props.user === null 
                ? <Link href="/user/auth">Login</Link>
                : <Link href="/user">{props.user.username}</Link>
            }
        </header>
    );
}

export default Header;