import { ReactNode } from 'react';

enum BadgeVariant {
    ERROR,
    NOTE,
    SUCCESS,
    INFO,
}

enum BadgeSize {
    LARGE,
    SMALL,
}

const SIZE_MAPS: Record<BadgeSize, string> = {
    [BadgeSize.SMALL]: 'px-2.5 text-xs',
    [BadgeSize.LARGE]: 'px-3 text-sm',
};

const VARIANT_MAPS: Record<BadgeVariant, string> = {
    [BadgeVariant.ERROR]: 'bg-red-100 text-red-800',
    [BadgeVariant.NOTE]: 'bg-yellow-100 text-yellow-800',
    [BadgeVariant.SUCCESS]: 'bg-green-100 text-green-800',
    [BadgeVariant.INFO]: 'bg-blue-100 text-blue-800',
};

type BadgeProps = {
    variant: BadgeVariant;
    children?: ReactNode;
    size: BadgeSize;
};

export default function Badge(props: BadgeProps) {
    const { children, variant, size } = props;

    const badgeLayoutClasses =
        'inline-flex items-center px-2 py-1 rounded-full font-medium leading-none';

    const finalBadgeClasses = `${badgeLayoutClasses} ${VARIANT_MAPS[variant]} ${SIZE_MAPS[size]}`;

    return <span className={finalBadgeClasses}>{children}</span>;
}

Badge.defaultProps = {
    variant: BadgeVariant.INFO,
    size: BadgeSize.SMALL,
};

Badge.variant = BadgeVariant;
Badge.size = BadgeSize;
