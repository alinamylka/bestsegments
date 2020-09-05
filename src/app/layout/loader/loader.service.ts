import {Injectable} from '@angular/core';

@Injectable()
export class LoaderService {

    visible: boolean;
    message: string;

    constructor() {
    }

    showLoader() {
        this.visible = true;
    }

    hideLoader() {
        this.visible = false;
    }

    hideLoaderWithMessage(message: string) {
        this.message = message;
        this.visible = false;
    }
}
