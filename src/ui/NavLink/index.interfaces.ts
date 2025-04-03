export interface NavLink {
    url: string;
    text: string;
    icon: string;
}

export interface NavLinkProps extends NavLink {
    selected?: boolean;
}
