import { appendNewElement, getElementById, newElement } from "../../utils/commons";
import { Component } from "../patterns";
import { CityTable } from "./city_table";
import { CityRepository } from "../../data/repositories";

import * as stateNames from "../../../resources/states.json"


class CitySearchBar extends Component {
    protected element: HTMLElement;
    private inputElement: HTMLElement;
    private suggestionList: HTMLElement;

    private cityRepository: CityRepository;

    private cityTable: CityTable;


    private state: string = "";

    constructor(cityRepository: CityRepository, table: CityTable) {
        super();
        this.cityRepository = cityRepository;
        this.cityTable = table;

        this.element = getElementById("city-search-bar");
        this.inputElement = getElementById("city-search-input");
        this.suggestionList = getElementById("city-search-suggestions");
        this.createStateSelector();
        this.createInputElement();
    }
    
    private createStateSelector(): void {
        const selector = getElementById("city-search-selector");

        Object.entries(stateNames).forEach(([key, value]) => {
            const option = appendNewElement(selector, ["option", undefined, key]);
            option.setAttribute("value", value);
        });

        selector.addEventListener("change", (event) => {
            let optionValue = (event.target as HTMLSelectElement).value;
            this.state = optionValue;
        });
    }

    private createInputElement(): void {
        this.inputElement.addEventListener("input", () => {
            this.updateSuggestionList();
            this.showSuggestionList();
        });
        this.inputElement.addEventListener("focus", () => this.showSuggestionList());
        document.addEventListener("click", (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest("city-search-suggestions")) this.hideSuggestionList();
        });

        const searchBtn = getElementById("city-search-btn");
        searchBtn.addEventListener("click", () => {
            this.cityTable.setName(this.getInputValue());
            this.cityTable.setState(this.state);
            this.cityTable.showData();
        });
    }

    private async updateSuggestionList(): Promise<void> {
        const suggestions = await this.cityRepository.getSuggestions(this.getInputValue());

        this.suggestionList.innerHTML = "";
        suggestions.forEach(s => {
            const option = appendNewElement(this.suggestionList, ["div", "suggestion-row", s]);
            option.addEventListener("click", () => {
                (this.inputElement as HTMLInputElement).value = s;
                this.hideSuggestionList();
            });
        });
    }

    private getInputValue(): string {
        return (this.inputElement as HTMLInputElement).value;
    }

    private showSuggestionList(): void {
        this.suggestionList.style.display = "block";
    }

    private hideSuggestionList(): void {
        this.suggestionList.style.display = "none";
    }


}


class CityPageButtons extends Component { 

    protected element: HTMLElement;
    private pageButtons: HTMLElement[] = [];

    private cityTable: CityTable;

    private page: number = 0;

    constructor(table: CityTable) {
        super();
        this.cityTable = table;
        this.createPageButtonElement();
        this.updateButtons();
    }

    private createPageButtonElement(): void {
        this.element = getElementById("city-page-btns");
        for (let i = 0; i < 6; i++) {
            this.pageButtons[i] = newElement("button", "btn btn-light", `${i}`);
        }

        this.pageButtons.forEach((btn, index) => {
            btn.setAttribute("type", "button");
            this.element.append(btn);

            btn.addEventListener("click", () => {
                this.page = index;
                this.updateButtons();
                this.cityTable.setPage(index);
                this.cityTable.showData();
            });
        });
    }

    private updateButtons(): void {
        this.pageButtons.forEach((btn, index) => {
            if (index == this.page) {
                btn.className = "btn btn-primary";
            } else {
                btn.className = "btn btn-light";
            }
        });
    }

}


export { CityPageButtons, CitySearchBar };