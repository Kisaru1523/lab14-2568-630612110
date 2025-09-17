import { create } from "zustand";
import { type MarathonFormState } from "../libs/Store";
export const useMarathonFormStore = create<MarathonFormState>((set) => ({
  fname: "",
  lname: "",
  plan: "funrun",
  gender: "male",
  email: "",
  couponCode: "",
  password: "",
  confirmpassword: "",
  haveCoupon: false,
  correct: "",
  total: 500,
  setFname: (fname) =>
    set(() => ({
      fname: fname,
    })),
  setLname: (_lname) =>
    set(() => ({
      lname: _lname,
    })),
  setPlan: (_plan) =>
    set(() => ({
      plan: _plan,
    })),
  setGender: (_gender) =>
    set(() => ({
      gender: _gender,
    })),
  setEmail: (_email) =>
    set(() => ({
      email: _email,
    })),
  setCouponCode: (_couponCode) =>
    set(() => ({
      couponCode: _couponCode,
    })),
  setHaveCoupon: (_haveCoupon) =>
    set(() => ({
      haveCoupon: _haveCoupon,
    })),

  setPassword: (_password) =>
    set(() => ({
      password: _password,
    })),
  discountCupon: (type: string, correct = "", have: boolean) => {
    let val = 500;
    switch (type) {
      case "funrun":
        val = 500;
        break;
      case "mini":
        val = 800;
        break;
      case "half":
        val = 1200;
        break;
      case "full":
        val = 1500;
        break;
      default:
        val = 500;
        break;
    }
    if (correct == "CMU2025" && have) {
      val = (val * 7) / 10;
    }
    set(() => ({
      total: val,
    }));
  },
  setConfirmPassword: (_password) =>
    set(() => ({
      confirmpassword: _password,
    })),
  // Function ชื่อ discountCoupon คำนวณ total ตรงนี้
  reset: () =>
    set({
      fname: "",
      lname: "",
      plan: "funrun",
      gender: "male",
      email: "",
      couponCode: "",
      password: "",
      confirmpassword: "",
      haveCoupon: false,
    }),
}));
