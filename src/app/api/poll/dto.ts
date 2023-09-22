export interface NewPollDTO {
    title: string,
    description: string,
    options: string[],
    requiresAccount: boolean,
    time: number,
    unlisted: boolean
}