import { CompositeComponent } from "./patterns";

abstract class Table extends CompositeComponent {

    protected page: number = 0;

    protected abstract loadData(): void;
    protected abstract clearTable(): void;

    public getPage(): number {
        return this.page;
    }

    public setPage(page: number): void {
        this.page = page;
        this.clearTable();
        this.loadData();
    }

    public nextPage(): void {
        this.page++;
        this.loadData();
    }

    public previousPage(): void {
        this.page--;
        this.loadData();
    }
}

export { Table };