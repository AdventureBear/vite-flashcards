import { ReactNode } from 'react';

type ModalProps = {
    color: ModalColor;
    children?: ReactNode;
    // size: ModalSize;
};

enum ModalColor {
    WHITE,
    TEAL,
    // SUCCESS,
    // INFO,
}
// enum ModalSize {
//     LARGE,
//     SMALL,
// }

// const SIZE_MAPS: Record<ModalSize, string> = {
//     [ModalSize.SMALL]: 'text-xs p-8',
//     [ModalSize.LARGE]: 'fixed inset-0 flex items-center justify-center p-8 shadow-lg',
// };

const COLOR_MAPS: Record<ModalColor, string> = {
    [ModalColor.WHITE]: 'bg-white p-8 rounded shadow-lg text-center w-96',
    [ModalColor.TEAL]: 'hover:text-white text-black bg-teal-300 hover:bg-teal-500 rounded-lg shadow-lg',
    // [ModalVariant.SUCCESS]: 'bg-green-100 text-green-800',
    // [ModalVariant.INFO]: 'bg-blue-100 text-blue-800',
};


export default function Modal(props: ModalProps) {
    const {children, color} = props;

    const modalLayoutClasses =
       'fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50';

    // const finalModalClasses = {modalLayoutClasses} ;//${SIZE_MAPS[size]

    return <>
            <div  className={modalLayoutClasses}>
                <div className={COLOR_MAPS[color]}>
                    {children}
                </div>
            </div>;
    </>

}

Modal.defaultProps = {
    color: ModalColor.WHITE,
    // size: ModalSize.LARGE,
};

Modal.color = ModalColor;
// Modal.size = ModalSize;
