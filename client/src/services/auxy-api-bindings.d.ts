// This file was generated by [rspc](https://github.com/oscartbeaumont/rspc). Do not edit this file manually.

export type Procedures = {
    queries: 
        { key: "auth.createSessison", input: Credentials, result: null } | 
        { key: "auth.createUser", input: Credentials, result: CreateUserResult } | 
        { key: "auth.refreshToken", input: RefreshTokenParams, result: null },
    mutations: never,
    subscriptions: never
};

export type RefreshTokenParams = { token: string }

export type Credentials = { username: string; password: string }

export type CreateUserResult = { userId: string }
