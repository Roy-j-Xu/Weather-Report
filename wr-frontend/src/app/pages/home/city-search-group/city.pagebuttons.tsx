interface Props {
    page: number;
    totalPage: number;
    onClick: (index: number | string) => () => void;
}

function CityPageButtons({ page, totalPage, onClick }: Props) {
    let firstButton = (
        <button className="page-btn" onClick={onClick("first")}>First page</button>
    );
    let lastButton = (
        <button className="page-btn" onClick={onClick("last")}>Last page</button>
    );
    let middleButtons: JSX.Element;

    const getBtnClass = (i: number) => i === page ? "page-selected-btn" : "page-btn";

    if (totalPage === 0) return;
    
    if (totalPage <= 6) {
        let list = range(1, totalPage);
        middleButtons = (<>
            {list.map(i => (
                <button className={getBtnClass(i)} key={i} onClick={onClick(i)}>{i}</button>
            ))}
        </>)
    } else {
        let list = range(Math.max(1, page - 3), Math.min(totalPage, page + 3));
        middleButtons = (
            <>
            {page - 3 > 1 && <label>...</label>}
            {list.map(i => (
                <button className={getBtnClass(i)} key={i} onClick={onClick(i)}>{i}</button>
            ))}
            {page + 3 < totalPage && <label>...</label>}
            </>
        )
    }

    return (
        <div>
            {firstButton}
            {middleButtons}
            {lastButton}
        </div>
    )
}

function range(m: number, n: number): Array<number> {
    if (m > n) throw new RangeError("m must be smaller than or equal to n.");
    return Array.from(Array(n - m + 1).keys()).map((i) => i + m);
}

export default CityPageButtons;