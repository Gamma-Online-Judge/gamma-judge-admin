export interface ContestProblemData {
    problemId?: string;
    identifier?: string;
}

export interface ContestData {
    name?: string;
    date?: Date;
    problems?: ContestProblemData[];
    customId?: string;
}