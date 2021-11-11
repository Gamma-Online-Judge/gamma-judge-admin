import axios from "axios";
import { ProblemData } from "../models/problem";

const client = axios.create({
    baseURL: 'http://localhost:8000/problems',
});

export async function putProblem(problemData: ProblemData) {
    await client.put('/', problemData);
}