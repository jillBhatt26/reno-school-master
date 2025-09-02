import { request } from '@/config/axios';

class SchoolsServices {
    static BASE_URL = '/schools';

    static create = async data => {
        try {
            const res = await request({
                url: this.BASE_URL,
                method: 'POST',
                data
            });

            return res.data;
        } catch (error) {
            throw error.response.data ?? error.message ?? error;
        }
    };

    static saveSchoolImage = async data => {
        try {
            const res = await request({
                url: `${this.BASE_URL}/image`,
                method: 'POST',
                data,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            return res.data;
        } catch (error) {
            throw error.response.data ?? error.message ?? error;
        }
    };

    static fetchSchoolsAll = async () => {
        try {
            const res = await request({
                url: `${this.BASE_URL}/image`
            });

            return res.data;
        } catch (error) {
            throw error.response.data ?? error.message ?? error;
        }
    };
}

export { SchoolsServices };
