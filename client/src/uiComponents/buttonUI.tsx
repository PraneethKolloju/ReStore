import React from "react";

const ButtonUI = () => {
    return (
        <button
            type="button"
            className="bg-white text-center w-40 rounded-2xl h-14 relative text-black text-sm font-semibold group mt-4"
        >
            <div className="bg-blue-500 rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[144px] z-10 duration-500">
                <svg
                    width="15px"
                    height="15px"
                    viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill="#000000"
                        d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                    />
                    <path
                        fill="#000000"
                        d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                    />
                </svg>
            </div>
            <p className="translate-x-2">Go Back</p>
        </button>
    );
};

export default ButtonUI;
