import {JSX} from "react";

type Props = {
    children: JSX.Element
};

export function Frame({children}: Props) {
    return (
        <div className={`bg-gray-800 shadow-xl shadow-gray-950 p-12 `}>
            <div className={`bg-white p-8`}>
                <div className="w-full  mx-auto bg-gray-800 rounded-lg p-4 shadow-lg">
                 {children}
                </div>
            </div>
        </div>
    );
}