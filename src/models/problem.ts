export interface SampleInputData {
    input?: string;
    output?: string;
}

export interface ProblemData {
    title?: string;
    statement?: string;
    timeLimit?: number;
    memoryLimit?: number;
    tags?: string[];
    customId?: string;
    contestId?: string;
    sampleInputs?: SampleInputData[];
    input?: string;
    output?: string;
}