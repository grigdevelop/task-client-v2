export type TaskModulesType = "numerable" | "period";

export type TaskModule = {
    id: number;
    name: string;
    desc: string;
    type: TaskModulesType
}