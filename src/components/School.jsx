'use client';

import { useState } from 'react';

const School = ({ school }) => {
    // states
    const [loading, setLoading] = useState(true);

    return (
        <div className="bg-base-300 w-96 shadow-sm overflow-clip rounded-lg border border-transparent hover:cursor-pointer hover:shadow-primary hover:border-primary">
            <figure className="relative overflow-hidden">
                {loading && (
                    <div
                        className={`absolute top-0 left-0 skeleton ${
                            loading ? 'opacity-100' : 'opacity-0'
                        } w-full h-96`}
                    ></div>
                )}

                <img
                    src={school.image}
                    alt="School Image"
                    onLoad={() => setLoading(false)}
                    className={`w-full object-cover scale-100 hover:scale-125 transition ease-in-out duration-200 h-60 ${
                        loading ? 'opacity-0' : 'opacity-100'
                    }`}
                />
            </figure>

            {!loading && (
                <div className="p-5 w-full space-y-5">
                    <h2 className="text-info font-semibold">{school.city}</h2>

                    <h2 className="text-xl">{school.name}</h2>

                    <p className="text-md text-gray-400">{school.address}</p>
                </div>
            )}
        </div>
    );
};

export default School;
