import * as fs from 'fs/promises';
import { FileHandle } from 'fs/promises';
import { closeFile, openFile, writeToFile } from './fileUtil.js';

let fileDescriptor: FileHandle | null = null;

async function mainProcedure() {
    fileDescriptor = await openFile("x.txt");

    await writeToFile(fileDescriptor, "lorem ipsum");

    fileDescriptor = await closeFile(fileDescriptor);
}

mainProcedure();