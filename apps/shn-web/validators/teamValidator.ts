import * as Yup from 'yup';
import { api } from '@app/api';

const TeamValidator = Yup.object({
    name: Yup.string()
        .matches(/^[a-z|0-9]+$/gi)
        .required('Team name is required'),
    repo: Yup.string()
        .matches(/^https:\/\/github.com\/[^/]+\/[^/]+$/g)
        .required('Repository is required'),
    members: Yup.array()
        .min(1)
        .max(4)
        .required('Team must have at least one member')
        .of(Yup.string().nullable(true))
        .test('members', 'Members must be valid GitHub usernames', async (members) => {
            const promises = (members || []).map((member) => api.get(`profile/${member}`));
            const responses = await Promise.all(promises);
            return responses.every((response) => !response.data.data.success);
        }),
});
export { TeamValidator };
