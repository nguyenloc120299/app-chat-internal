import { useState, useEffect } from 'react';

const useContentResizer = () => {
    const [contentHeight, setContentHeight] = useState<number>(0);

    useEffect(() => {
        const calculateContentHeight = () => {
            const toolbarHeight =
                window.innerHeight - document.documentElement.clientHeight;
            const contentHeight = window.innerHeight - toolbarHeight;
            setContentHeight(contentHeight);
        };

        calculateContentHeight();

        const handleResize = () => {
            calculateContentHeight();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return contentHeight;
};

export default useContentResizer;
