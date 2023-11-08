import { makeAutoObservable } from 'mobx';

class LanguageScreenVM {
    constructor() {
        makeAutoObservable(this);
    }
}

export default LanguageScreenVM;
