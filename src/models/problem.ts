export interface SampleInputData {
    input?: string;
    output?: string;
}

export interface ProblemData {
    title?: string;
    statment?: string;
    timeLimit?: number;
    memoryLimit?: number;
    tags?: string[];
    customId?: string;
    contestId?: string;
    sampleInputs?: SampleInputData[];
    input?: string;
    output?: string;
}