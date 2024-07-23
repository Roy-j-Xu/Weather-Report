import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

interface Props {
    page: number;
    totalPage: number;
    onClick: (index: number | string) => () => void;
}

function CityPageButtons({ page, totalPage, onClick }: Props) {
    let firstButton = (
        <Button className="page-btn" onClick={onClick("first")}>First page</Button>
    );
    let lastButton = (
        <Button className="page-btn" onClick={onClick("last")}>Last page</Button>
    );
    let middleButtons: JSX.Element;

    const getBtnClass = (i: number) => i === page ? "page-selected-btn" : "page-btn";

    if (totalPage === 0) return;
    
    if (totalPage <= 6) {
        let list = range(1, totalPage);
        middleButtons = (<>
            {list.map(i => (
                <Button className={getBtnClass(i)} key={i} onClick={onClick(i)}>{i}</Button>
            ))}
        </>)
    } else {
        let list = range(Math.max(1, page - 3), Math.min(totalPage, page + 3));
        middleButtons = (
            <>
            {page - 3 > 1 && <label>...</label>}
            {list.map(i => (
                <Button className={getBtnClass(i)} key={i} onClick={onClick(i)}>{i}</Button>
            ))}
            {page + 3 < totalPage && <label>...</label>}
            </>
        )
    }

    return (
        <Stack direction="row" spacing={2} justifyContent="center" className="page-btns">
            {firstButton}
            {middleButtons}
            {lastButton}
        </Stack>
    )
}

function range(m: number, n: number): Array<number> {
    if (m > n) throw new RangeError("m must be smaller than or equal to n.");
    return Array.from(Array(n - m + 1).keys()).map((i) => i + m);
}

export default CityPageButtons;