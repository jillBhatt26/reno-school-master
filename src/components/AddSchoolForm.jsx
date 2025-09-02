'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schoolFormInputsSchema } from '@/lib/schemas/schools';
import { SchoolsServices } from '@/services/schools';

const AddSchoolForm = () => {
    // states
    const [previewImageURL, setPreviewImageURL] = useState(null);

    // hooks
    const {
        register,
        handleSubmit,
        setError,
        getValues,
        reset,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: {
            name: 'asdf',
            state: 'asdf',
            address: 'asdf',
            city: 'asdf',
            contact: '1231231231',
            email_id: 'a@b.com',
            image: null
        },
        resolver: zodResolver(schoolFormInputsSchema)
    });

    // event handlers
    const handleAddSchoolFormSubmit = async data => {
        try {
            const formData = new FormData();

            formData.set('image', getValues('image')[0]);

            const saveImageData = await SchoolsServices.saveSchoolImage(
                formData
            );

            if (saveImageData.path) {
                const createData = await SchoolsServices.create({
                    ...data,
                    image: saveImageData.path
                });

                if (createData.schoolID) {
                    reset();
                    setPreviewImageURL(null);
                    alert('Success!!');
                }
            }
        } catch (error) {
            setError('root', {
                type: 'custom',
                message: String(error.message ?? error)
            });
        }
    };

    return (
        <div className="w-full px-5 md:w-1/2 md:px-0 lg:w-1/3 xl:w-1/4 mx-auto">
            <h1 className="text-center text-2xl mb-5">Add School</h1>

            <form
                noValidate
                autoComplete="off"
                className="min-w-40 w-full space-y-5"
                onSubmit={handleSubmit(handleAddSchoolFormSubmit)}
            >
                {errors && errors.root && errors.root.message && (
                    <div
                        role="alert"
                        className="alert alert-error alert-outline"
                    >
                        <span className="text-sm">{errors.root.message}</span>
                    </div>
                )}

                <label className="floating-label">
                    <span>School Name</span>

                    <input
                        type="text"
                        placeholder="School Name"
                        className="w-full input input-md"
                        {...register('name')}
                    />

                    {errors && errors.name && errors.name.message && (
                        <p className="text-rose-400 text-sm">
                            {errors.name.message}
                        </p>
                    )}
                </label>

                <label className="floating-label">
                    <span>School Address</span>

                    <input
                        type="text"
                        placeholder="School Address"
                        className="w-full input input-md"
                        {...register('address')}
                    />

                    {errors && errors.address && errors.address.message && (
                        <p className="text-rose-400 text-sm">
                            {errors.address.message}
                        </p>
                    )}
                </label>

                <label className="floating-label">
                    <span>School City</span>

                    <input
                        type="text"
                        placeholder="School City"
                        className="w-full input input-md"
                        {...register('city')}
                    />

                    {errors && errors.city && errors.city.message && (
                        <p className="text-rose-400 text-sm">
                            {errors.city.message}
                        </p>
                    )}
                </label>

                <label className="floating-label">
                    <span>School State</span>

                    <input
                        type="text"
                        placeholder="School State"
                        className="w-full input input-md"
                        {...register('state')}
                    />

                    {errors && errors.state && errors.state.message && (
                        <p className="text-rose-400 text-sm">
                            {errors.state.message}
                        </p>
                    )}
                </label>

                <label className="floating-label">
                    <span>School Email</span>

                    <input
                        type="email"
                        placeholder="School Email"
                        className="w-full input input-md"
                        {...register('email_id')}
                    />

                    {errors && errors.email_id && errors.email_id.message && (
                        <p className="text-rose-400 text-sm">
                            {errors.email_id.message}
                        </p>
                    )}
                </label>

                <label className="floating-label">
                    <span>School Contact</span>

                    <input
                        type="email"
                        placeholder="School Contact"
                        className="w-full input input-md"
                        {...register('contact')}
                    />

                    {errors && errors.contact && errors.contact.message && (
                        <p className="text-rose-400 text-sm">
                            {errors.contact.message}
                        </p>
                    )}
                </label>

                <div className="flex flex-col items-center">
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        className="hidden"
                        {...register('image', {
                            onChange: e =>
                                setPreviewImageURL(
                                    URL.createObjectURL(e.target.files[0])
                                )
                        })}
                    />

                    <label
                        htmlFor="image"
                        className="cursor-pointer bg-success text-white px-4 py-2 rounded-md"
                    >
                        School Image
                    </label>

                    {previewImageURL && (
                        <img src={previewImageURL} className="my-5" />
                    )}

                    {errors && errors.image && errors.image.message && (
                        <p className="text-rose-400 text-sm">
                            {errors.image.message}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    className="btn btn-primary w-full rounded-sm"
                    disabled={isSubmitting || Object.keys(errors).length > 0}
                >
                    {isSubmitting ? (
                        <span className="loading loading-bars loading-lg"></span>
                    ) : (
                        <span>Add School</span>
                    )}
                </button>
            </form>
        </div>
    );
};

export default AddSchoolForm;
