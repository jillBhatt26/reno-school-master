import School from '@/components/School';
import { SchoolsServerServices } from '@/services/schools/server';
import Link from 'next/link';

const HomePage = async () => {
    const schoolData = await SchoolsServerServices.fetchSchoolsAll();

    return (
        <div className="container mx-auto my-20">
            <div className="mt-10 space-y-10 flex flex-col justify-center items-center">
                <Link
                    href="/new"
                    className="btn btn-md btn-primary rounded max-w-40"
                >
                    Add School
                </Link>

                <h1 className="text-2xl">All Schools</h1>

                {schoolData && schoolData.schools.length > 0 ? (
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {schoolData.schools.map((school, idx) => (
                            <School school={school} key={school.id ?? idx} />
                        ))}
                    </ul>
                ) : (
                    <h3>No school data available</h3>
                )}
            </div>
        </div>
    );
};

export default HomePage;
