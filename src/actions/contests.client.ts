import axios from "axios";
import { ContestData } from "../models/contest";

const client = axios.create({
    baseURL: `${process.env.REACT_APP_API_BASE_URL}/api/contests`,
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

export async function getAllContests() {
    const contest = await client.get('/');
    return contest.data as ContestData[];
}