import { ReactNode } from 'react';

enum ButtonColor {
    ORANGE,
    TEAL,
    GREEN,
    // SUCCESS,
    // INFO,
}

enum ButtonSize {
    SMALL,
    LARGE,
    XL,

}



const SIZE_MAPS: Record<ButtonSize, string> = {
    [ButtonSize.SMALL]: 'px-2.5 text-xs mb-4 mx-2',
    [ButtonSize.LARGE]: 'px-4 py-2 mb-4 mt-1',
    [ButtonSize.XL]: 'py-4 px-8 mb-8 mt-4 text-xl text-bold',
};

const COLOR_MAPS: Record<ButtonColor, string> = {
    [ButtonColor.ORANGE]: 'bg-orange-300 text white',
    [ButtonColor.TEAL]: 'hover:text-white text-black font-bold  bg-teal-300 hover:bg-teal-500',
    [ButtonColor.GREEN]: 'bg-green-500 text-white font-bold ',
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
        'inline-flex items-center rounded shadow-lg hover:scale-105';  //mb-4 mx-2

    const finalButtonClasses = `${buttonLayoutClasses} ${COLOR_MAPS[color]} ${SIZE_MAPS[size]}`;

    return <button onClick={onClick} className={finalButtonClasses}>{children}</button>;

}

Button.defaultProps = {
    color: ButtonColor.ORANGE,
    size: ButtonSize.LARGE,
};

Button.color = ButtonColor;
Button.size = ButtonSize;
