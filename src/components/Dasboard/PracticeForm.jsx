import React from 'react';
import { Formik } from 'formik';
import { object, string } from 'yup';

const validationSchema = object().shape({
    name: string().required('Name is required'),
});
export const BasicExample = () => (

    <div>
        <h1>My Form</h1>
        <Formik
            validationSchema={validationSchema}
            initialValues={{ name: 'jared' }}
            onSubmit={(values, actions) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    actions.setSubmitting(false);
                }, 1000);
            }}
        >
            {props => (
                <div>
                    <input
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.name}
                        name="name"
                    />

                    <button
                    onClick={()=>{props.handleSubmit}}
                    >Submit</button>
                    </div>
            )}
        </Formik>
    </div>
);