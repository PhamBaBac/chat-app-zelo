export class validate{
    static email(mail){
        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
            return true;
        }
        return false;
    }
    static password(pass){
        if(pass.length>=6){
            return true;
        }
        return false;
    }    
}