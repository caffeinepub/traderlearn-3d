import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface backendInterface {
    getAllModuleProgress(): Promise<Array<[string, boolean]>>;
    isModuleComplete(moduleId: string): Promise<boolean>;
    markModuleComplete(moduleId: string): Promise<void>;
    resetModule(moduleId: string): Promise<void>;
}
