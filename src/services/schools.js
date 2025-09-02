import { API_URL } from '@/config/env';

class SchoolsServices {
    static BASE_URL = `${API_URL}/schools`;

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
            throw error.message ?? error;
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
            throw error.message ?? error;
        }
    };

    static fetchSchoolsAll = async () => {
        try {
            console.log('baseURL: ', this.BASE_URL);

            const res = await fetch(this.BASE_URL);

            return await res.json();
        } catch (error) {
            throw error.message ?? error;
        }
    };
}

export { SchoolsServices };
