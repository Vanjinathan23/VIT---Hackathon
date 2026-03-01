import React from 'react';
import useAppStore from '../../store/useAppStore';
import Home from '../../pages/Home';
import Settings from '../../pages/Settings';

const DeviceRouter = () => {
    const { currentRoute } = useAppStore();

    switch (currentRoute) {
        case 'home':
            return <Home />;
        case 'settings':
            return <Settings />;
        default:
            return <Home />;
    }
};

export default DeviceRouter;
