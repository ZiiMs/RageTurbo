import { useCallback, useEffect, useState } from 'react';
import EventManager from './util/eventmanager';

const Manager = () => {
    const [inventory, setInventory] = useState<boolean>(false);
    const [scoreboard, setScoreboard] = useState<boolean>(false);

    const handleKeyPress = useCallback(
        (e: KeyboardEvent) => {
            if (e.key.toLowerCase() === 'i') {
                e.preventDefault();

                setScoreboard(false);
                setInventory(!inventory);
            } else if (e.key.toLowerCase() === 'u') {
                e.preventDefault();

                setInventory(false);
                setScoreboard(!scoreboard);
            }
        },
        [inventory, scoreboard]
    );

    useEffect(() => {
        // document.addEventListener('keyup', handleKeyPress, false);
        const toggle = (hide: string) => {
            if (hide === 'scoreboard') {
                setInventory(false);
                setScoreboard(!scoreboard);
            } else if (hide === 'inventory') {
                setScoreboard(false);
                setInventory(!inventory);
            }
        };
        EventManager.addHandler('toggle', toggle);
        return () => {
            EventManager.removeHandler('toggle', toggle);
            // document.removeEventListener('keyup', handleKeyPress, false);
        };
    }, [handleKeyPress]);

    return (
        <>
        </>
    );
};

export default Manager;
