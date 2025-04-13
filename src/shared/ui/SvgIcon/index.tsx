import React, { useState, useEffect } from "react";
import styles from './index.module.scss';

interface SvgIconProps {
    src: string;
    className?: string;
}

export const SvgIcon: React.FC<SvgIconProps> = ({ src, className = "" }) => {
    const [svgContent, setSvgContent] = useState("");

    useEffect(() => {
        const fetchSvg = async () => {
            try {
                const response = await fetch(src);
                const svgText = await response.text();
                setSvgContent(svgText);
            } catch (error) {
                console.error("Error loading SVG:", error);
            }
        };

        fetchSvg()
    }, [src]);

    if (!svgContent) return null;

    return (
        <div
            className={`${className} ${styles['svg-icon-container']}`}
            dangerouslySetInnerHTML={{ __html: svgContent }}
        />
    );
};