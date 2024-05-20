import { appendNewElement, newElement } from "../../utils/commons";
import { Component } from "../patterns";
import { CityTable } from "./city_table";

import * as stateNames from "../../../resources/states.json"


class CitySearchBar extends Component {
    protected element: HTMLElement;
    private inputElement: HTMLElement;

    private cityTable: CityTable;

    private state: string = "";

    constructor(table: CityTable) {
        super();
        this.cityTable = table;
        this.createSearchBarElement();
    }
    
    private createSearchBarElement(): void {
        this.element = newElement("div", "container search-bar");
        let searchBarRow = appendNewElement(this.element, ["div", "form-group row"]);
        this.createStateSelector(searchBarRow);
        this.createInputElement(searchBarRow);
    }

    private createStateSelector(row: HTMLElement): void {
        const div = appendNewElement(row, ["div", "col-sm-3"])
        const selector = appendNewElement(div, ["select", "form-control"])

        const defaultOption = appendNewElement(selector, ["option", undefined, "Select state"]);
        defaultOption.setAttribute("value", "");
        Object.entries(stateNames).forEach(([key, value]) => {
            const option = appendNewElement(selector, ["option", undefined, key]);
            option.setAttribute("value", value);
        });

        selector.addEventListener("change", (event) => {
            let optionValue = (event.target as HTMLSelectElement).value;
            this.state = optionValue;
        });
    }

    private createInputElement(row: HTMLElement): void {
        const div = appendNewElement(row, ["div", "col-sm-5"]);
        this.inputElement = appendNewElement(div, ["input", "form-control"]);
        this.inputElement.setAttribute("type", "text");

        const searchBtn = appendNewElement(row, ["button", "btn btn-primary col-sm-1", "Search"]);
        searchBtn.setAttribute("type", "button");
        searchBtn.addEventListener("click", () => {
            this.cityTable.setName(this.getInputValue());
            this.cityTable.setState(this.state);
            this.cityTable.showData();
        });
    }

    private getInputValue(): string {
        return (this.inputElement as HTMLInputElement).value;
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
        this.element = newElement("div", "container");
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