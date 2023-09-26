export const getTotalVoteCount = (votes: number[]) => {
    let sum = 0;
    for (let i = 0; i < votes.length; i++) {
        votes[i] === undefined ? sum += 0 : sum += votes[i];
    }
    return sum;
}