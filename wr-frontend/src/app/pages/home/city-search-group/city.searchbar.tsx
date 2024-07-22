import { forwardRef, useEffect, useRef, useState } from "react";
import stateObject from "../../../../assets/states.json"
import { useCityService } from "./city.service.provider";

const STATE_LIST = Object.entries(stateObject);

interface CitySearchbarProps {
    search: (city: string, state: string) => void;
}

function CitySearchbar({ search }: CitySearchbarProps) {
    const cityService = useCityService();

    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestions, setSuggestions] = useState<string[]>([]);

    const stateSelectorRef = useRef<HTMLSelectElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const suggestionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        async function showSuggestionsFor(input: string) {
            const suggestions = await cityService.getSuggestions(input);
            setShowSuggestions(true);
            setSuggestions(suggestions);
        }

        const inputElem = inputRef.current;
        const suggestionElem = suggestionRef.current;
        if (!inputElem) throw new Error("Input reference is null.");
        if (!suggestionElem) throw new Error("Suggestion reference is null.");

        inputElem.addEventListener(
            "input",
            () => showSuggestionsFor(inputElem.value)
        );

        document.addEventListener("mousedown", (event: MouseEvent) => {
            const clickedNode = event.target as Node;
            if (inputElem.contains(clickedNode)) {
                showSuggestionsFor(inputElem.value);
            }
            else if (!suggestionElem.contains(clickedNode)) {
                setShowSuggestions(false);
            }
        });
        
    }, []);

    const handleSearch = () => {
        if (!stateSelectorRef.current) return;
        if (!inputRef.current) return;
        search(inputRef.current.value, stateSelectorRef.current.value);
    };
    
    return (
        <div className="form-group row">

            <div className="col-sm-3">
                <select ref={stateSelectorRef}>
                <option value={""}></option>
                {STATE_LIST.map(([state, stateId]) => (
                    <option key={state} value={stateId}>{state}</option>
                ))}
                </select>
            </div>

            <div className="col-sm-5">
                <input type="text" placeholder="Search city" ref={inputRef}></input>
                <SuggestionList show={showSuggestions} 
                                suggestions={suggestions}
                                ref={suggestionRef}/>
            </div>

            <div className="col-sm-1">
                <button onClick={handleSearch}>Search</button>
            </div>

        </div>
    );
}


interface SuggestionListProps {
    show: boolean;
    suggestions: string[];
}

const SuggestionList = forwardRef(
    function SuggestionList(
        { show, suggestions }: SuggestionListProps,
        ref: React.ForwardedRef<HTMLDivElement>
    ) {
        const isVisible = show && suggestions;
        console.log(isVisible);
        return (
            <div className="suggestions" ref={ref}
                style={{display: isVisible ? "block" : "none"}}>

                {suggestions.map((suggestion, ind) => (
                    <div className="suggestion-row" key={ind}>{suggestion}</div>
                ))}

            </div>
        );
    }
)


export default CitySearchbar;