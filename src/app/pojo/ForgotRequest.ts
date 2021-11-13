export class ForgotRequest 
{
   email : string;
   
   public constructor(init?: Partial<ForgotRequest>) {
    Object.assign(this, init);
  }
}