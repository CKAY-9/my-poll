"use client"

import { LOCAL_URL } from "@/app/api/resources";
import { setCookie } from "@/utils/cookies";
import axios from "axios";
import { SHA256 } from "crypto-js";
import { useState, BaseSyntheticEvent } from "react";

const AuthClient = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const enter = async (e: BaseSyntheticEvent, type: "login" | "register") => {
        e.preventDefault();
        const response = await axios({
            "url": LOCAL_URL + "/api/" + type,
            "method": "POST",
            "data": {
                "username": username,
                "password": password
            }
        });

        if (response.data.token !== undefined) {
            setCookie("token", response.data.token, 365);
            window.location.href = "/";
        }
    }

    return (
        <>
            <label>Username</label>
            <input type="text" placeholder="Username" minLength={3} onChange={(e: BaseSyntheticEvent) => setUsername(e.target.value)} />
            <label>Password</label>
            <input type="password" placeholder="Password" minLength={8} onChange={(e: BaseSyntheticEvent) => setPassword(SHA256(e.target.value).toString())} />
            <section style={{
                "display": "flex",
                "gap": "1rem"
            }}>
                <button onClick={async (e) => await enter(e, "register")}>Register</button>
                <button onClick={async (e) => await enter(e, "login")}>Login</button>
            </section>
        </>
    );
}

export default AuthClient;