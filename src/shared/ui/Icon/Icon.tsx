import {FC} from "react";

interface Props {
    name: string;
    size: string | number;
}

export const Icon: FC<Props> = ({name, size}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            style={{
                width: `${size}`,
                height: `${size}`
            }}
        >
            <use xlinkHref={`/sprite.svg#${name}`}></use>
        </svg>
    )
}