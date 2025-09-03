import { API_URL } from '@/config/env';

class SchoolsServerServices {
    static BASE_URL = `${API_URL}/schools`;

    static fetchSchoolsAll = async () => {
        console.log('BASE_URL', BASE_URL);

        try {
            const res = await fetch(this.BASE_URL);
            return await res.json();
        } catch (error) {
            return error.message ?? error;
        }
    };
}

export { SchoolsServerServices };
