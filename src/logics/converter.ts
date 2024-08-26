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
        let imageId = "";

        const dbResult = await this.odkdb.list(limitImages);
            console.log(`${formattedDateWithMilliseconds} number of data: ${dbResult.length}`);
            dbResult.map(async row => { 
                try {
                    console.log(`${formattedDateWithMilliseconds} ${row.name} is being converted.`);
                    await this.imageConverter.convert(row.name, row.content, targetFolder);
                    await this.odkdb.update(row.id);
                    console.error(`${formattedDateWithMilliseconds} ${row.name} has been converted.`);
                } catch (error) {
                    console.log(error);
                    await this.odkdb.updateError(row.id);
                    console.error(`${formattedDateWithMilliseconds} ${row.name} can't be converted.`);
                } 
            });

        // try {    
            
        // } catch (error) {
        //     await this.odkdb.updateError(imageId);
        //     console.log(error);
        // } finally {
        //     const [seconds, nanoseconds] = process.hrtime(startTime);
        //     const responseTime = seconds * 1000 + nanoseconds / 1e6; // Convert to milliseconds
        //     console.log(`processed by ${responseTime.toFixed(2)} ms`);
        // }
        
    }
}