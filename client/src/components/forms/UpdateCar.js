import { useMutation } from "@apollo/client";
import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { UPDATE_CAR } from "../../graphql/queries";
import e from "cors";

const UpdateCar = (props) => {
    const { id, make, model, year } = props;
    const [form] = Form.useForm();
    const [, forceUpdate] = useState();
    
    useEffect(() => {
        forceUpdate({});
    }, []);
    
    const [updateCar] = useMutation(UPDATE_CAR);
    
    const onFinish = (values) => {
        const { make, model, year } = values;
    
        updateCar({
        variables: {
            id,
            make,
            model,
            year,
        },
        });
        props.onButtonClick();
    };
    
    return (
        <>
        <h2>Update Car</h2>
        <Form
        form={form}
        name="update-car-form"
        layout="inline"
        onFinish={onFinish}
        initialValues={{
            make,
            model,
            year,
        }}
        >
        <Form.Item
            name="make"
            rules={[{ required: true, message: "Please enter a make" }]}
        >
            <Input placeholder="i.e. Honda" />
        </Form.Item>
        <Form.Item
            name="model"
            rules={[{ required: true, message: "Please enter a model" }]}
        >
            <Input placeholder="i.e. Civic" />
        </Form.Item>
        <Form.Item
            name="year"
            rules={[{ required: true, message: "Please enter a year" }]}
        >
            <Input placeholder="i.e. 2019" />
        </Form.Item>
        <Form.Item shouldUpdate={true}>
            {() => (
            <Button
                type="primary"
                htmlType="submit"
                disabled={
                (!form.isFieldTouched("make") &&
                    !form.isFieldTouched("model") &&
                    !form.isFieldTouched("year")) ||
                form.getFieldsError().filter(({ errors }) => errors.length).length
                }
            >
                Update Car
            </Button>
            )}
                </Form.Item>
                <Button onClick={props.onButtonClick}>Cancel</Button>
        </Form>
        </>
    );
};
    
export default UpdateCar;

