import React, { Suspense } from 'react';

import Spinner from './Loading/Spinner';

const SuspenseWrapper = ({ children }) => {
    return <Suspense fallback={<Spinner />}>{children}</Suspense>;
};

export default SuspenseWrapper;
