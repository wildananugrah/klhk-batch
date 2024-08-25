export interface IImageConverter{
    convert(filename: string, blobContent: any, targetFolder: string): any
}