import { newElement, setUrlParam } from "../../utils/commons";
import { Component } from "../patterns";
import { CityTable } from "./city_table";


class CityPageButtons extends Component { 

    protected element: HTMLElement;
    private pageButtons: HTMLElement[] = [];

    private table: CityTable;

    private page: number = 0;

    constructor(table: CityTable) {
        super();
        this.table = table;
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
                console.log(index);
                this.page = index;
                this.updateButtons();
                this.table.setPage(index);
                this.table.showData();
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


export { CityPageButtons };