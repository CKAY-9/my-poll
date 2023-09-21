"use client"

import Link from "next/link";
import { BaseSyntheticEvent, useState } from "react";

const CreateClient = () => {
    const [title, setTitle] = useState<string>("");
    const [desc, setDesc] = useState<string>("");
    const [options, setOptions] = useState<string[]>([]);

    const addOption = (e: BaseSyntheticEvent) => {
        setOptions(old => [...old, "New Option #" + (options.length + 1)]);
    }

    return (
        <>
            <Link href="/">Back</Link>
            <h1>Create</h1>
            <label htmlFor="title">Poll Title</label>
            <input type="text" placeholder="Title (80 characters max)" maxLength={80} />
            <label htmlFor="description">Description</label>
            <input type="text" placeholder="Description (100 characters max)" maxLength={100} />
            <div style={{"display": "flex", "flexDirection": "column", "gap": "1rem"}}>
                <h2>Options</h2>
                <button onClick={addOption}>Add Option</button>
                <div style={{"display": "flex", "flexDirection": "column", "gap": "1rem"}}>
                    {options.map((opt: string, index: number) => {
                        return (
                            <div key={index}>
                                <input style={{"width": "100%"}} type="text" defaultValue={opt} placeholder="Poll Entry (80 characters max)" />
                            </div>
                        )
                    })}
                </div>
            </div>
            <span style={{"opacity": "0.5"}}>You will not be able to update this poll once created.</span>
            <button>Create Poll</button>
        </>
    );
}

export default CreateClient;