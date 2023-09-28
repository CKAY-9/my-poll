import { getTotalVoteCount } from "@/utils/poll"
import { Poll } from "@prisma/client"
import Link from "next/link"

const PollPreview = (props: {
    poll: Poll
}) => {
    return (
        <Link href={`/poll/${props.poll.id}`} className="poll">
            <h2>{props.poll.title}</h2>
            <span>Description: {props.poll.description}</span>
            <span>Vote Count: {getTotalVoteCount(props.poll.optionVotes)}</span>
        </Link>
    );
}

export default PollPreview;