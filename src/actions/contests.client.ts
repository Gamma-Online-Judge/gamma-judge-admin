import axios from "axios";
import { ContestData } from "../models/contest";

const client = axios.create({
    baseURL: 'http://localhost:8000/contests',
});

export async function putContest(contestData: ContestData) {
    await client.put('/', contestData);
}

export async function deleteContest(customId: string) {
    await client.delete(`/${customId}`);
}