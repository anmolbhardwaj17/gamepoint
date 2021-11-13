export class NewPassword 
{
   newPassword : string;
   confirmNewPassword : string;
   
   public constructor(init?: Partial<NewPassword>) {
    Object.assign(this, init);
  }
}