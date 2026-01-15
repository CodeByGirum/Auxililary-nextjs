import { useState, useEffect } from 'react';

declare global {
    interface Window {
        loadPyodide: any;
        pyodide: any;
    }
}

export const usePyodide = () => {
    const [pyodide, setPyodide] = useState<any>(null);
    const [isKernelReady, setIsKernelReady] = useState(false);
    const [kernelStatus, setKernelStatus] = useState<string>('Initializing...');

    useEffect(() => {
        const initPyodide = async () => {
            if (window.pyodide) {
                setPyodide(window.pyodide);
                setIsKernelReady(true);
                return;
            }

            if (window.loadPyodide) {
                try {
                    setKernelStatus('Loading Python Kernel...');
                    const py = await window.loadPyodide();
                    setKernelStatus('Loading micropip...');
                    await py.loadPackage("micropip");
                    setPyodide(py);
                    window.pyodide = py; // Store globally to avoid reload
                    setIsKernelReady(true);
                } catch (e) {
                    console.error("Failed to load Pyodide:", e);
                    setKernelStatus('Kernel Error');
                }
            } else {
                setKernelStatus('Waiting for Pyodide...');
            }
        };

        const t = setTimeout(initPyodide, 100);
        return () => clearTimeout(t);
    }, []);

    return { pyodide, isKernelReady, kernelStatus };
};
