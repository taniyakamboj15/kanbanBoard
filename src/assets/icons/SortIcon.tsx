interface IconProps {
    className?: string;
    title?: string;
    'aria-label'?: string;
}

export const SortIcon = ({
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
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
    </svg>
);
