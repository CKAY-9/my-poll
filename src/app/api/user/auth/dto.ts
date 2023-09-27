export interface DiscordAuthDTO {
    code: string
}

export interface DiscordInitialDTO {
    access_token: string,
    token_type: string
}

export interface DiscordUserDTO {
    id: string,
    global_name: string,
    avatar: string
}

export interface GithubAuthDTO {
    code: string
}

export interface GithubInitialDTO {
    access_token: string,
    scope: string,
    token_type: string
}

export interface GithubUserDTO {
    login: string,
    avatar_url: string,
    id: number
}