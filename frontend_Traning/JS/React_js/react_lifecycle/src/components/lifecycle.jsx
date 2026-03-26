import React, { useEffect, useState } from 'react';

export default function Lifecycle() {
    const [count, setCount] = useState(0);
    const [mounted, setMounted] = useState(false);

    console.log("Component rendered");

    // Component Mount
    useEffect(() => {
        console.log("Component mounted");
        setMounted(true);
        const timer = setInterval(() => {
            console.log("Interval running every second");
        }, 1000);

        return () => {
            console.log("Component will unmount - cleanup");
            clearInterval(timer);
        };
    }, []);

    // Component Update (when count changes)
    useEffect(() => {
        if (mounted) {
            console.log("Component updated - count changed to:", count);
        }
    }, [count, mounted]);

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px' }}>
            <h2>React Lifecycle Demo</h2>
            <p>Count: {count}</p>
            <p>Mounted: {mounted ? 'Yes' : 'No'}</p>
            <button
                onClick={() => setCount(count + 1)}
                style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                Increment Count
            </button>
            <p style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
                Check the browser console to see lifecycle logs
            </p>
        </div>
    );
}
