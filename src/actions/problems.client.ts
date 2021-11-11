import axios from "axios";
import { ProblemData } from "../models/problem";

const client = axios.create({
    baseURL: 'http://localhost:8000/problems',
});

export async function putProblem(problemData: ProblemData) {
    await client.put('/', problemData);
}

export async function deleteProblem(problemId: string) {
    await client.delete(`/${problemId}`);
}

export async function getProblem(problemId: string) {
    const problem = await client.get(`/${problemId}`);
    return problem.data as ProblemData;
}