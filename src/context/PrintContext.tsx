import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface PrintType {
    imageUrl: string | null;
    clearPrint: () => void;
    handleDownload: () => void;
}

const PrintContext = createContext<PrintType | undefined>(undefined);

export function usePrint () {
    const context = useContext(PrintContext);

    if ( !context ) {
        throw new Error("usePrintContext deve ser usado dentro de um PrintContext");
    }

    return context;
}

export function PrintProvider ( {children}: { children: ReactNode } ) {

    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        const handlePaste = (event: ClipboardEvent) => {
        const items = event.clipboardData?.items;
        if (items) {
            for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
                const blob = items[i].getAsFile();
                if (blob) {
                const url = URL.createObjectURL(blob);
                setImageUrl(url);
                }
            }
            }
        }
        };

        window.addEventListener('paste', handlePaste);

        return () => {
        window.removeEventListener('paste', handlePaste);
        };
    }, []);

    const formatDate = ( date: Date ): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}${minutes}${seconds}`;
    }

    const handleDownload = () => {

        const now = new Date();

        if (imageUrl) {
          const a = document.createElement('a');
          a.href = imageUrl;
          a.download = `Screenshot ${formatDate(now)}.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }
    };

    const clearPrint = () => {
        setImageUrl(null);
    }

    return (
        <PrintContext.Provider value={{
            imageUrl,
            clearPrint,
            handleDownload
        }}>
            { children }
        </PrintContext.Provider>
    )

}