import {
  Modal,
  Stack,
  TextInput,
  Radio,
  Select,
  Checkbox,
  Alert,
  Button,
  PasswordInput,
  Text,
  Divider,
  Group,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMarathonFormStore } from "../store/MarathonFormStore";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { marathonSchema } from "../zod/MarathonSchema";
import { type MarathonModalProps } from "../libs/Marathon";

export default function MarathonModal({ opened, onClose }: MarathonModalProps) {
  const {
    fname,
    lname,
    plan,
    gender,
    email,
    couponCode,
    haveCoupon,
    password,
    confirmpassword,
    total,
    setFname,
    setLname,
    setPlan,
    setGender,
    setEmail,
    setCouponCode,
    setHaveCoupon,
    setPassword,
    setConfirmPassword,
    discountCupon,
    reset,
  } = useMarathonFormStore();

  // Mantine Form
  const mantineForm = useForm({
    initialValues: {
      fname,
      lname,
      plan,
      gender,
      email,
      couponCode,
      haveCoupon,
      password,
      confirmpassword,
      total,
      agree: false,
    },
    validate: zod4Resolver(marathonSchema),
    validateInputOnChange: true,
  });

  const onSubmitRegister = () => {
    alert("See you at CMU Marathon");
    onClose();
    reset();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Register CMU Marathon 🏃‍♂️"
      centered
      size="xl"
    >
      <form onSubmit={mantineForm.onSubmit(onSubmitRegister)}>
        <Stack>
          {/* First + Last name */}
          <Group justify="space-between" gap="xs" grow>
            <TextInput
              label="First name"
              withAsterisk
              {...mantineForm.getInputProps("fname")}
            />
            <TextInput
              label="Last name"
              withAsterisk
              {...mantineForm.getInputProps("lname")}
            />
          </Group>

          {/* Email */}
          <TextInput
            label="Email"
            withAsterisk
            description="ex.excemble@email.com"
            {...mantineForm.getInputProps("email")}
          />

          {/* Password */}
          <PasswordInput
            label="Password"
            description="Password must contain 6-12 characters"
            withAsterisk
            {...mantineForm.getInputProps("password")}
          />

          {/* Confirm Password */}
          <PasswordInput
            label="Confirm Password"
            description="Confirm your password"
            withAsterisk
            {...mantineForm.getInputProps("confirmpassword")}
          />

          {/* Plan */}
          <Select
            label="Plan"
            placeholder="Please select.."
            data={[
              { value: "funrun", label: "Fun run 5.5 Km (500 THB)" },
              { value: "mini", label: "Mini Marathon 10 Km (800 THB)" },
              { value: "half", label: "Half Marathon 21 Km (1,200 THB)" },
              { value: "full", label: "Full Marathon 42.195 Km (1,500 THB)" },
            ]}
            {...mantineForm.getInputProps("plan")}
            onChange={(value) => {
              mantineForm.setFieldValue("plan", value as any);
              setPlan(value as any);
              discountCupon(value as any, mantineForm.values.couponCode, mantineForm.values.haveCoupon);
            }}
          />

          {/* Gender */}
          <Radio.Group label="Gender" {...mantineForm.getInputProps("gender")}>
            <Radio m={4} value="male" label="Male 👨" />
            <Radio m={4} value="female" label="Female 👩" />
          </Radio.Group>

          {/* Coupon */}
          <Alert color="blue" title="Promotion 📢">
            Coupon (30% Discount)
          </Alert>
          <Checkbox
            label="I have coupon"
            {...mantineForm.getInputProps("haveCoupon", { type: "checkbox" })}
            onChange={(e) => {
              mantineForm.setFieldValue("haveCoupon", e.currentTarget.checked);
              setHaveCoupon(e.currentTarget.checked);
              discountCupon(
                mantineForm.values.plan,
                mantineForm.values.couponCode,
                e.currentTarget.checked
              );
            }}
          />

          {mantineForm.values.haveCoupon && (
            <TextInput
              label="Coupon Code"
              {...mantineForm.getInputProps("couponCode")}
              onChange={(e) => {
                mantineForm.setFieldValue("couponCode", e.currentTarget.value);
                setCouponCode(e.currentTarget.value);
                discountCupon(
                  mantineForm.values.plan,
                  e.currentTarget.value,
                  mantineForm.values.haveCoupon
                );
              }}
            />
          )}

          {/* Total */}
          <Text>Total Payment : {total} THB</Text>
          <Divider my="xs" variant="dashed" />

          {/* Terms & Conditions */}
          <Checkbox
            label={
              <>
                I accept
                <Text mx={2} span c="red" inherit>
                  terms and conditions
                </Text>
              </>
            }
            {...mantineForm.getInputProps("agree", { type: "checkbox" })}
          />

          {/* Submit */}
          <Button type="submit" disabled={!mantineForm.values.agree}>
            Register
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
