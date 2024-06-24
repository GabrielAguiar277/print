import { useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { IoReturnDownBack } from "react-icons/io5";
import { usePrint } from "../context/PrintContext";

export function PanelControl () {

    const { imageUrl, clearPrint, handleDownload } = usePrint();

    const [keysPressed, setKeysPressed] = useState<Set<string>>(new Set());

    const handleKeyDown = (event: KeyboardEvent) => {
        setKeysPressed(prevKeys => new Set(prevKeys).add(event.key));
    };

    const handleKeyUp = (event: KeyboardEvent) => {
        setKeysPressed(prevKeys => {
            const newKeys = new Set(prevKeys);
            newKeys.delete(event.key);
            return newKeys;
        });
    };

    const handleBlur = () => {
        setKeysPressed(new Set());
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        window.addEventListener('blur', handleBlur);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
            window.removeEventListener('blur', handleBlur);
        }
    }, []);

    useEffect(() => {

        if ( keysPressed.has("Backspace") || keysPressed.has(" ") ) clearPrint();

        if ( keysPressed.has("Enter") && imageUrl ) handleDownload();

    }, [keysPressed]);

    const disable = imageUrl ? true : false;

    


    return (
        <div className="flex justify-between">
            <div>
                <p className="font-semibold text-gray-500">Paste</p>
                <div className="flex gap-2">
                    <button type="button" className={`text-white  ${keysPressed.has("Control") ? "bg-pink-200" : "bg-pink-700"} focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5   dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}>Ctrl</button>
                    <span className="font-semibold text-2xl text-gray-500">+</span>
                    <button type="button" className={`text-white  ${keysPressed.has("v") || keysPressed.has("V") ? "bg-pink-200" : "bg-pink-700"} focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5   dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}>V</button>
                </div>
            </div>
            <div>
                <p className="font-semibold text-gray-500">Delete</p>
                <div className="flex gap-2 items-center">
                    <button type="button" className={`text-white   ${ (disable && !keysPressed.has(" ")) ? "bg-pink-700 cursor-pointer" : "cursor-not-allowed bg-pink-200" } font-medium rounded-lg text-sm px-36 py-2.5 text-center`} disabled={disable}>Space</button>
                    <span className="font-semibold text-gray-500">or</span>
                    <button type="button" className={`text-white   ${ (disable && !keysPressed.has("Backspace")) ? "bg-pink-700 cursor-pointer" : "cursor-not-allowed bg-pink-200" } font-medium rounded-lg text-sm px-12 py-2.5 text-center`} disabled={disable}><MdOutlineKeyboardBackspace size={20} /></button>
                </div>
            </div>
            <div>
                <p className="font-semibold text-gray-500">Download</p>
                <button type="button" className={`text-white   ${ (disable && !keysPressed.has("Enter")) ? "bg-pink-700 cursor-pointer" : "cursor-not-allowed bg-pink-200" } font-medium rounded-lg text-sm px-12 py-2.5 text-center`} disabled={disable}><IoReturnDownBack size={20} /></button>
            </div>
        </div>
    )
}