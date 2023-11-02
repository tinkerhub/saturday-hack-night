import * as Yup from "yup";
import { debounce } from "@app/utils";

const validateMembers = async (members: string[]) => {
  /* const promises = (members || []).map((member) => api.get(`profile/${member}`)); */

  const promises = (members || []).map((member) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            data: {
              success: member !== "invalid",
            },
          },
        });
      }, 1000);
    });
  });
  const responses = (await Promise.all(promises)) as Array<boolean>;
  return responses.every((response) => response);
};

export const TeamValidator = Yup.object({
  name: Yup.string()
    .matches(/^[a-z|0-9]+$/gi)
    .required("Team name is required"),
  repo: Yup.string()
    .matches(/^https:\/\/github.com\/[^/]+\/[^/]+$/g)
    .required("Repository is required"),
  members: Yup.array()
    .min(1)
    .max(4)
    .required("Team must have at least one member")
    .of(Yup.string().nullable())
    .test(
      "members",
      "Members must be valid GitHub Usernames. Make sure all members have a GitHub account and are logged into SHN Website.",
      (members) =>
        new Promise((resolve) => {
          debounce(async () => {
            const isValid = await validateMembers(members as string[]);
            resolve(isValid);
          })();
        }),
    ),
});
