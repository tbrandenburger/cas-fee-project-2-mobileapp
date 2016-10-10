import {Control} from "@angular/common";

export class MasterpasswordValidator {

    static isCorrect(control: Control) {
        return new Promise((resolve, reject)=> {
           setTimeout(function(){
               console.log(control.value)
               if(control.value == "checkValidation"){
                   resolve({isCorrect: true});
               }
               else
                   resolve(null);
           }, 2000)
        });
    }

}