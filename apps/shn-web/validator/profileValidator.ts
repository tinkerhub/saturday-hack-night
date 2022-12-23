import * as Yup from 'yup';

const PickAnOptionValidator = Yup.object({
    value: Yup.string().required(),
    label: Yup.string().required(),
});

export type Option = {
    label: string;
    value: string;
};

const requiredErrorStatement = (value: string): string => `Please type your ${value}`;

export const profileModalValidator = Yup.object({
    mobile: Yup.string().required(requiredErrorStatement('Mobile number')),
    district: PickAnOptionValidator.required('Please pick an option'),
    college: PickAnOptionValidator.required('Please pick an option'),
});
