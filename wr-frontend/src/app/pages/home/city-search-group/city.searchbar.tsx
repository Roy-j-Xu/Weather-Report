import { useRef } from "react";
import stateObject from "../../../../assets/states.json"

interface CitySearchbarProps {
    search: (city: string, state: string) => void;
}

function CitySearchbar({ search }: CitySearchbarProps) {

    
    const list = Object.entries(stateObject);
    const stateSelectorRef = useRef<HTMLSelectElement>(null);
    const stateSelector = (
        <select ref={stateSelectorRef}>
            <option value={""}></option>
            {list.map(([key, value]) => (
                <option key={key} value={value}>{key}</option>
            ))}
        </select>
    );

    const inputRef = useRef<HTMLInputElement>(null);
    const input = (
        <input type="text" ref={inputRef}></input>
    )

    const handleSearch = () => {
        if (!stateSelectorRef.current) return;
        if (!inputRef.current) return;
        search(inputRef.current.value, stateSelectorRef.current.value);
    };
    
    return (
        <div>
            {stateSelector}
            {input}
            <button onClick={handleSearch}>Search</button>
        </div>
    );
}


export default CitySearchbar;