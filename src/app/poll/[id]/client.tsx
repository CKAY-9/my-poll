"use client"

import { BaseSyntheticEvent, useState } from "react";
import { Poll } from "@prisma/client";

const PollClient = (props: {
    poll: Poll
}) => {
    const [voted, setVoted] = useState<boolean>(false);
    const [indexVoted, setIndexVoted] = useState<number>(0);

    const vote = async (e: BaseSyntheticEvent) => {
        e.preventDefault();
        setVoted(true);
    }

    return (
        <>
            {props.poll.options.map((opt: string, index: number) => {
                return (
                    <div key={index}>
                        <button onClick={vote}>{opt}</button>
                        {voted && 
                            <span>{props.poll.optionVotes[index] === undefined ? props.poll.optionVotes[index] = 1 : props.poll.optionVotes[index]}</span>
                        }
                    </div>
                )
            })}
        </>
    );
}

export default PollClient;