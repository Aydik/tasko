import {FC} from "react";

interface Props {
    name: string;
    size: { width: number, height: number };
    className?: string;
}

export const Icon: FC<Props> = ({name, size, className}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
             style={{
                 width: size.width,
                 height: size.height
             }}
             className={className}
        >
            <use xlinkHref={`/public/assets/images/icons/sprites.svg#${name}`}></use>
        </svg>
    )
}