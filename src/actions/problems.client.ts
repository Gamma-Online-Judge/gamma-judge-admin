import axios from "axios";
import { ProblemData } from "../models/problem";

const client = axios.create({
    baseURL: `${process.env.REACT_APP_API_BASE_URL}/api/problems`,
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

export async function getAllProblems() {
    const problems = await client.get(`/`);
    return problems.data as ProblemData[];
}