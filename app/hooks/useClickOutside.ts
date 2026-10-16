import { useEffect, type RefObject } from "react";

const useClickOutside = (ref: RefObject<HTMLElement | null>, callback: Function, additionalElements?: RefObject<HTMLElement | null>[]) => {
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Node;
            if (!target) return;
            const isAdditionalElement = additionalElements?.find((r) => r?.current && r.current.contains(target)); // comes in handy if a button opens the model, but is not a child of the model
            if (ref?.current && !ref.current.contains(target) && !isAdditionalElement) {
                callback();
            }
        }
    
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, []);
    
}
 
export default useClickOutside;