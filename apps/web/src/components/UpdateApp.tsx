import React from 'react';
import { Workbox } from 'workbox-window';

const UpdateApp = ({ wb }: { wb: Workbox }) => {
    const updateWorker = () => {
        wb.addEventListener('controlling', () => window.location.reload());
        wb.messageSkipWaiting();
    };

    wb.addEventListener('waiting', () => {
        updateWorker();
    });
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <></>;
};

export default UpdateApp;
