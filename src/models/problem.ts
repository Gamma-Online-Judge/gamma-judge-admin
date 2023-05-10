export interface SampleInputData {
    input?: string;
    output?: string;
}

export interface ProblemData {
    timeLimit?: number;
    memoryLimit?: number;
    tags?: string[];
    customId?: string;
    contestId?: string;
    sampleInputs?: SampleInputData[];
    pt_BR: LanguageProblemData;
}

export interface LanguageProblemData {
    title?: string;
    statement?: string;
    input?: string;
    output?: string;
    tutorial?: string;
    notes? : string;
}