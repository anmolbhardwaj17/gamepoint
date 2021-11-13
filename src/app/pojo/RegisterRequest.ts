export class RegisterRequest 
{
   name : string;
   email : string;
   password : string;
   confirmPassword : string;
   userId : string;
   mobileNumber  : string;

   public constructor(init?: Partial<RegisterRequest>) {
    Object.assign(this, init);
  }
}
