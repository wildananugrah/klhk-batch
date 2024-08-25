import { limitImages, targetFolder } from "../configs/common.config";
import { IImageConverter } from "../dependencies/iimage.converter";
import { IODKDB } from "../dependencies/iodk.db";
import { formattedDateWithMilliseconds } from "../helpers/common.helper";

export class Converter{
    private odkdb: IODKDB;
    private imageConverter: IImageConverter;
    constructor({ odkdb, imageConverter }: { odkdb: IODKDB, imageConverter: IImageConverter }) {
        this.odkdb = odkdb;
        this.imageConverter = imageConverter;
    }
    async run() {
        const startTime = process.hrtime();
        console.log(`${formattedDateWithMilliseconds} started.`);
        try {    
            const dbResult = await this.odkdb.list(limitImages);
            console.log(`${formattedDateWithMilliseconds} number of data: ${dbResult.length}`);
            dbResult.map(async row => { 
                console.log(`${formattedDateWithMilliseconds} ${row.name} is being converted.`);
                await Promise.allSettled([
                    this.imageConverter.convert(row.name, row.content, targetFolder),
                    this.odkdb.update(row.id) 
                ]);
                console.log(`${formattedDateWithMilliseconds} ${row.name} has been converted.`);
            });
        } catch (error) {
            console.log(error);
        } finally {
            const [seconds, nanoseconds] = process.hrtime(startTime);
            const responseTime = seconds * 1000 + nanoseconds / 1e6; // Convert to milliseconds
            console.log(`processed by ${responseTime.toFixed(2)} ms`);
        }
        
    }
}