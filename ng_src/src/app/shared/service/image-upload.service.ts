import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ImageUploadService {

    private maxWidth = 200;
    private maxHeight = 200;
    private maxFileSize = 1000; // in KB

    constructor( private http : HttpClient) {}

    public uploadImage(category : string, fileName : string, file : any) : string {
        let imageUrl : string;
        const imageFormData = new FormData();
        imageFormData.append("imageFile", file, fileName);
        this.http.post("localhost:4300/upload", imageFormData)
            .subscribe();
        return imageUrl;
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

    checkImageFileSize(file: any) : boolean{
        if(Math.round(file.size/1024) > this.maxFileSize) return false;
        return true;
    }

}