interface IconProps {
    className?: string;
    title?: string;
    'aria-label'?: string;
}

export const ChevronDownIcon = ({
    className = 'w-5 h-5',
    title,
    'aria-label': ariaLabel
}: IconProps) => (
    <svg
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-label={ariaLabel}
    >
        {title && <title>{title}</title>}
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
);
