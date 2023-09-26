"use client"

import { BaseSyntheticEvent, useEffect, useState } from "react";
import { Poll } from "@prisma/client";
import style from "./poll.module.scss";
import axios from "axios";
import { LOCAL_URL } from "@/app/api/resources";
import { getCookie } from "@/utils/cookies";
import { getTotalVoteCount } from "@/utils/poll";

const PollClient = (props: {
    poll: Poll,
    expired: boolean
}) => {
    const [opts, setOpts] = useState<string[]>(props.poll.options);
    const [optVotes, setOptVotes] = useState<number[]>(props.poll.optionVotes);
    const [voted, setVoted] = useState<boolean>(false);
    const [indexVoted, setIndexVoted] = useState<number>(0);

    useEffect(() => {
        if (props.expired) {
            setVoted(true);
        }
    }, [props.expired]);

    const vote = async (e: BaseSyntheticEvent, i: number) => {
        e.preventDefault();
        
        const response = await axios({
            "url": LOCAL_URL + "/api/poll/vote",
            "method": "POST",
            "data": {
                "voteIndex": i,
                "poll": props.poll.id
            },
            "headers": {
                "Authorization": getCookie("token") || ""
            }
        });

        if (response.status === 200) {
            setVoted(true);
            optVotes[i] === undefined ? optVotes[i] = 1 : optVotes[i] = optVotes[i] + 1;
        }
    }

    return (
        <>
            {opts.map((opt: string, index: number) => {
                return (
                    <div key={index} className={style.option}>
                        <button disabled={voted || props.expired} onClick={async (e) => await vote(e, index)} style={{
                            "opacity": (voted || props.expired) ? "0.5" : "1",
                            "cursor": (voted || props.expired) ? "not-allowed" : "pointer"
                        }}>{opt}</button>
                        {voted && 
                            <div>
                                <div style={{
                                    "width": "100px", 
                                    "height": "30px",
                                    "position": "relative",
                                    "backgroundColor": "rgb(var(--700))"
                                }}>
                                    <div style={{
                                        "width": `${((optVotes[index] || 0) / getTotalVoteCount(optVotes)) * 100}%`,
                                        "height": "30px",
                                        "backgroundColor": "rgb(0, 200, 0)"
                                    }}></div>
                                    <span style={{
                                        "position": "absolute",
                                        "top": "50%",
                                        "left": "50%",
                                        "transform": "translate(-50%, -50%)",
                                        "textAlign": "center"
                                    }}>{optVotes[index] || 0}</span>
                                </div>
                            </div>
                        }
                    </div>
                )
            })}
            {!props.expired &&
                <button style={{
                    "backgroundColor": "transparent",
                    "padding": "1rem"
                }} onClick={() => {
                    setVoted(!voted);
                }}>Show results</button>
            }
        </>
    );
}

export default PollClient;