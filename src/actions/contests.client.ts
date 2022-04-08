import axios from "axios";
import { ContestData } from "../models/contest";

const client = axios.create({
    baseURL: 'http://localhost:5138/api/contests',
});

export async function putContest(contestData: ContestData) {
    await client.put('/', contestData);
}

export async function deleteContest(customId: string) {
    await client.delete(`/${customId}`);
}

export async function getContest(customId: string) {
    const contest = await client.get(`/${customId}`);
    return contest.data as ContestData;
}