"use client"

import { LOCAL_URL } from "@/app/api/resources";
import axios from "axios";
import Link from "next/link";
import { BaseSyntheticEvent, useState } from "react";

const CreateClient = () => {
    const [title, setTitle] = useState<string>("");
    const [desc, setDesc] = useState<string>("");
    const [options, setOptions] = useState<string[]>([]);
    const [requiresAccount, setRequiresAccount] = useState<boolean>(false);
    const [timeLimit, setTimeLimit] = useState<number>(15);
    const [unlisted, setUnlisted] = useState<boolean>(true);

    const addOption = (e: BaseSyntheticEvent) => {
        setOptions(old => [...old, "New Option #" + (options.length + 1)]);
    }

    const createPoll = async (e: BaseSyntheticEvent) => {
        e.preventDefault();

        const response = await axios({
            "url": LOCAL_URL + "/api/poll",
            "method": "POST",
            "data": {
                "title": title,
                "description": desc,
                "options": options,
                "requiresAccount": requiresAccount,
                "time": timeLimit,
                "unlisted": unlisted
            }
        });

        if (response.data.id !== undefined) {
            window.location.href = "/poll/" + response.data.id;
        }
    }

    return (
        <>
            <Link href="/">Home</Link>
            <h1>Create a new poll</h1>
            <label htmlFor="title">Poll Title</label>
            <input onChange={(e: BaseSyntheticEvent) => setTitle(e.target.value)} type="text" placeholder="Title (80 characters max)" maxLength={80} />
            <label htmlFor="description">Description</label>
            <input onChange={(e: BaseSyntheticEvent) => setDesc(e.target.value)} type="text" placeholder="Description (100 characters max)" maxLength={100} />
            <div style={{"display": "flex", "flexDirection": "column", "gap": "1rem"}}>
                <h2>Options</h2>
                <button onClick={addOption}>Add Option</button>
                <div style={{"display": "flex", "flexDirection": "column", "gap": "1rem"}}>
                    {options.map((opt: string, index: number) => {
                        return (
                            <div key={index}>
                                <input onChange={(e: BaseSyntheticEvent) => options[index] = e.target.value} style={{"width": "100%"}} type="text" defaultValue={opt} placeholder="Poll Entry (80 characters max)" />
                            </div>
                        )
                    })}
                </div>
            </div>
            <section style={{
                "display": "flex",
                "gap": "1rem",
                "alignItems": "center"
            }}>
                <label>Poll Duration (in minutes)</label>
                <input type="number" onChange={(e: BaseSyntheticEvent) => setTimeLimit(e.target.value)} defaultValue={timeLimit} />
            </section>
            <section style={{
                "display": "flex",
                "gap": "1rem",
                "alignItems": "center"
            }}>
                <label>Voters must have an account</label>
                <input type="checkbox" onChange={(e: BaseSyntheticEvent) => setRequiresAccount(e.target.checked)} />
            </section>
            <section style={{
                "display": "flex",
                "gap": "1rem",
                "alignItems": "center"
            }}>
                <label>Link only (unlisted from public view)</label>
                <input defaultChecked={true} type="checkbox" onChange={(e: BaseSyntheticEvent) => setUnlisted(e.target.checked)} />
            </section>
            <span style={{"opacity": "0.5"}}>You will not be able to update this poll once created.</span>
            <button onClick={createPoll}>Create Poll</button>
        </>
    );
}

export default CreateClient;