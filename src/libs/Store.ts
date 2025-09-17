import { type MarathonForm } from "../zod/MarathonSchema";
interface MarathonFormState {
  fname: string;
  lname: string;
  plan: "funrun" | "mini" | "half" | "full";
  gender: "male" | "female";
  email: string;
  couponCode:string;
  haveCoupon:boolean;
  password:string;
  confirmpassword:string;
  total:number;
  correct:string;
  // Setters
  setFname: (v: string) => void;
  setLname: (v: string) => void;
  setPlan: (v: MarathonForm["plan"]) => void;
  setGender: (v: MarathonForm["gender"]) => void;
  setEmail: (v: string) => void;
  setCouponCode: (v:string) => void;
  setHaveCoupon: (v:boolean) => void;
  setPassword: (v:string) => void;
  setConfirmPassword: (v:string) => void;
  // Function ชื่อ discountCupon คำนวณ total ตรงนี้
  discountCupon: (v: string, c: string, have: boolean) => void;
  reset: () => void;
}
export type { MarathonFormState }