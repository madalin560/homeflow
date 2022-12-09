import {useEffect, useState} from 'react';

function ResponsiveLayout({breakpoint, renderMobile, renderDesktop}) {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [])

    return width > breakpoint ? renderDesktop() : renderMobile();
}

export {ResponsiveLayout};
