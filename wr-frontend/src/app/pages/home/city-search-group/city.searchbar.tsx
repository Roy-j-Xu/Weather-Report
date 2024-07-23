import { forwardRef, useEffect, useRef, useState } from "react";
import stateObject from "../../../../assets/states.json"
import { useCityService } from "./city.service.provider";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Stack } from "@mui/material";

const STATE_LIST = Object.entries(stateObject);

interface CitySearchbarProps {
    search: (city: string, state: string) => void;
}

function CitySearchbar({ search }: CitySearchbarProps) {
    const cityService = useCityService();

    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestions, setSuggestions] = useState<string[]>([]);

    const stateSelectorRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLDivElement>(null);
    const suggestionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        async function showSuggestionsFor(input: string) {
            const suggestions = await cityService.getSuggestions(input);
            setShowSuggestions(true);
            setSuggestions(suggestions);
        }

        const inputElem = refCurrent(inputRef);
        const suggestionElem = refCurrent(suggestionRef);

        inputElem.addEventListener(
            "input",
            () => showSuggestionsFor(valueOfTextFieldRef(inputRef))
        );

        document.addEventListener("mousedown", (event: MouseEvent) => {
            const clickedNode = event.target as Node;
            if (inputElem.contains(clickedNode)) {
                showSuggestionsFor(valueOfTextFieldRef(inputRef));
            }
            else if (!suggestionElem.contains(clickedNode)) {
                setShowSuggestions(false);
            }
        });
        
    }, []);

    const handleSearch = () => {
        if (!inputRef.current) return;
        search(valueOfTextFieldRef(inputRef), valueOfTextFieldRef(stateSelectorRef));
    };
    
    return (
        <Stack direction="row" spacing={2} justifyContent="center">

            <div>
                <TextField 
                    ref={stateSelectorRef}
                    id="state-selector"
                    select
                    label="Select state"
                    defaultValue=""
                >
                    <MenuItem value="">-</MenuItem>
                    {STATE_LIST.map(([state, stateId]) => (
                        <MenuItem key={state} value={stateId}>{state}</MenuItem>
                ))}
                </TextField>
            </div>

            <div>
                <TextField
                    ref={inputRef}
                    id="city-search-input"
                    placeholder="Search city"
                />

                <SuggestionList show={showSuggestions} 
                                suggestions={suggestions}
                                ref={suggestionRef}/>
            </div>

            <div>
                <button onClick={handleSearch}>Search</button>
            </div>

        </Stack>
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

function refCurrent(ref: React.RefObject<HTMLElement>): HTMLElement {
    if (!ref.current) throw new Error(`Reference ${ref} is null.`);
    return ref.current;
}

function valueOfTextFieldRef(ref: React.RefObject<HTMLDivElement>): string {
    const current = refCurrent(ref);
    const input = current.querySelector("input");
    if (!input) throw new Error(`Ref ${ref} is not a reference to TextField`);
    return input.value;
}


export default CitySearchbar;