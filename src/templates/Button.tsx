import { ReactNode } from 'react';

enum ButtonColor {
    ORANGE,
    TEAL,
    // SUCCESS,
    // INFO,
}

enum ButtonSize {
    LARGE,
    SMALL,
}



const SIZE_MAPS: Record<ButtonSize, string> = {
    [ButtonSize.SMALL]: 'px-2.5 text-xs mb-4 mx-2',
    [ButtonSize.LARGE]: 'text-xl py-2 px-4 mt-10 mb-12',
};

const COLOR_MAPS: Record<ButtonColor, string> = {
    [ButtonColor.ORANGE]: 'bg-orange-300 text white',
    [ButtonColor.TEAL]: 'hover:text-white text-black font-bold  bg-teal-300 hover:bg-teal-500',
    // [ButtonVariant.SUCCESS]: 'bg-green-100 text-green-800',
    // [ButtonVariant.INFO]: 'bg-blue-100 text-blue-800',
};

type ButtonProps = {
    color: ButtonColor;
    children?: ReactNode;
    size: ButtonSize;
    onClick: ()=> void

};

export default function Button(props: ButtonProps) {
    const {children, color, size, onClick} = props;

    const buttonLayoutClasses =
        'inline-flex items-center  rounded shadow-lg mb-4 mx-2';

    const finalButtonClasses = `${buttonLayoutClasses} ${COLOR_MAPS[color]} ${SIZE_MAPS[size]}`;

    return <button onClick={onClick} className={finalButtonClasses}>{children}</button>;

}

Button.defaultProps = {
    color: ButtonColor.ORANGE,
    size: ButtonSize.LARGE,
};

Button.color = ButtonColor;
Button.size = ButtonSize;
