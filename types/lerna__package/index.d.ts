// Type definitions for @lerna/package 4.0
// Project: https://github.com/lerna/lerna/tree/main/core/package
// Definitions by: DonMahallem <https://github.com/donmahallem>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

import type { resolve } from "npm-package-arg";
export type ResolveResult = ReturnType<typeof resolve>;
/**
 * Partial package.json representation
 */
export type RawManifest = {
    name: string;
    version: string;
    private?: boolean;
    bin?: Record<string, string> | string;
    scripts?: Record<string, string>;
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
    optionalDependencies?: Record<string, string>;
    peerDependencies?: Record<string, string>;
    publishConfig?: Record<string, string>;
    workspaces?: string[] | { packages: string[] };
} & { [key: string]: any; };
/**
 * Lerna's internal representation of a local package, with
 * many values resolved directly from the original JSON.
 */
export class Package {
    /**
     * Create a Package instance from parameters, possibly reusing existing instance.
     * @param ref A path to a package.json file, Package instance, or JSON object
     * @param [dir] If `ref` is a JSON object, this is the location of the manifest
     */
    static lazy(ref: string | Package | RawManifest, dir?: string): Package;
    constructor(pkg: RawManifest, location: string, rootPath?: string);
    get location(): string;
    get private(): boolean;
    get resolved(): ResolveResult;
    get rootPath(): string;
    get scripts(): RawManifest['scripts'];
    get bin(): RawManifest['scripts'];
    get binLocation(): string;
    get manifestLocation(): string;
    get nodeModuleLocation(): string;
    get __isLernaPackage(): boolean;
    get version(): string;
    set version(v: string);
    get contents(): string;
    set contents(subDirectory: string);
    get dependencies(): RawManifest['dependencies'];
    get devDependencies(): RawManifest['devDependencies'];
    get optionalDependencies(): RawManifest['optionalDependencies'];
    get peerDependencies(): RawManifest['peerDependencies'];
    get<K extends (keyof RawManifest) | string>(key: K): RawManifest[K];
    set<K extends (keyof RawManifest) | string>(key: K, val: RawManifest[K]): void;
    /**
     * Provide shallow copy for munging elsewhere
     */
    toJson(): object;

    /**
     * Refresh internal state from disk (e.g., changed by external lifecycles)
     */
    refresh(): Promise<Package>;
    /**
     * Write manifest changes to disk
     */
    serialize(): Promise<void>;
    /**
     * Mutate local dependency spec according to type
     */
    updateLocalDependency(resolved: ResolveResult, depVersion: string, savePrefix: string): void;
}
