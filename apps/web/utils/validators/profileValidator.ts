import * as Yup from "yup";

const PickAnOptionValidator = Yup.object({
  value: Yup.string().required(),
  label: Yup.string().required(),
});

export type Option = {
  label: string;
  value: string;
};

const requiredErrorStatement = (value: string): string =>
  `Please enter a valid ${value}`;

export const profileModalValidator = Yup.object({
  mobile: Yup.string().required(requiredErrorStatement("Mobile number")),
  name: Yup.string().required(requiredErrorStatement("Name")),
  college: PickAnOptionValidator.required("Please pick an option"),
});
