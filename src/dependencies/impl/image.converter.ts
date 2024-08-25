import sharp from "sharp";
import { IImageConverter } from "../iimage.converter";
import path from "path";

export class ImageConverter implements IImageConverter {
    
    async convert(filename: string, blobContent: any, targetFolder: string) {
        if (filename === undefined) throw Error("filename is undefined");
        if (blobContent === undefined) throw Error("blobContent is undefined");
        if (targetFolder === undefined) throw Error("targetFolder is undefined");

        const filenameMetdata = await sharp(blobContent).metadata(); // Path to the input image
        const width = filenameMetdata.width;
        const height = filenameMetdata.height;
        if(width === undefined) throw Error("width is undefined.");
        if(height === undefined) throw Error("height is undefined.");

        const mediumWidth = Math.floor(width * 0.4);
        const mediumHeight = Math.floor(height * 0.4);
        const thumbWidth = Math.floor(width * 0.07);
        const thumbHeight = Math.floor(height * 0.07);

        await sharp(blobContent)
            .resize(mediumWidth, mediumHeight)
            .toFile(path.join(targetFolder, `medium_${filename}`));

        await sharp(blobContent)
            .resize(thumbWidth, thumbHeight)
            .toFile(path.join(targetFolder, `thumb_${filename}`));
    }
}