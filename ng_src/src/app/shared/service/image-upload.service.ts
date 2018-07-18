import { Injectable } from '@angular/core';

@Injectable()
export class ImageUploadService {

    private maxWidth = 200;
    private maxHeight = 200;

    constructor() {}

    public loadImage(file : any) : any {
     
    }

    public checkImageDimensions(img: any) : boolean{
        if(img.width != img.height) return false;
        if(img.width > this.maxWidth) return false;
        if(img.height > this.maxHeight) return false;
        return true;
    }

    checkImageFileType(file: any) : boolean{
        switch(file.type){
            case "image/png":
            case "image/jpeg":
            case "image/gif":
                return true;
            default:
                return false;
        }
    }

}