'use client';

class SchoolsClientServices {
    static BASE_URL = `/api/schools`;

    static create = async data => {
        try {
            const res = await fetch(this.BASE_URL, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            return await res.json();
        } catch (error) {
            return error.message ?? error;
        }
    };

    static saveSchoolImage = async data => {
        try {
            const res = await fetch(`${this.BASE_URL}/image`, {
                method: 'POST',
                body: data
            });

            return await res.json();
        } catch (error) {
            return error.message ?? error;
        }
    };
}

export { SchoolsClientServices };
