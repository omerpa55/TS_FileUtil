import * as fs from 'fs/promises';
import { FileHandle } from 'fs/promises';
import { exit } from 'process';

export async function openFile(path: string): Promise<FileHandle | null> {
    let fileDescriptor: FileHandle | null = null;
    try {
        fileDescriptor = await fs.open(path, 'a+');
    } catch (err) {
        console.error("Error: ", err);
    }
    return fileDescriptor;
}

export async function readFromFile(fileDescriptor: FileHandle | null): Promise<string> {
    let fileContains: string = "";
    if (!fileDescriptor) {
        console.error("File descriptor is not ready");
        exit(1);
    }
    try {
        fileContains = await fileDescriptor.readFile({ encoding:"utf-8" });
    } catch (err) {
        console.error("Error: ", err);
    }
    return fileContains;
}

export async function writeToFile(fileDescriptor: FileHandle | null, data: string): Promise<void> {
    if (!fileDescriptor) {
        console.error("File descriptor is not ready");
        exit(1);
    }
    try {
        await fileDescriptor.write(data + '\n');
    } catch (err) {
        console.error("Error: ", err);
    }
}

export async function closeFile(fileDescriptor: FileHandle | null): Promise<FileHandle | null> {
    if (fileDescriptor) {
        fileDescriptor.close();
        fileDescriptor = null;
    }
    return fileDescriptor;
}