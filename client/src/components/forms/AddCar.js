import { useMutation } from "@apollo/client";
import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";
import { ADD_CAR, GET_CARS } from "../../graphql/queries";

const AddCar = () => {
    const [id] = useState(uuidv4());
    const [form] = Form.useForm();
    const [, forceUpdate] = useState();
    
    const [addCar] = useMutation(ADD_CAR);
    
    useEffect(() => {
        forceUpdate({});
    }, []);
    
    const onFinish = (values) => {
        const { make, model, year } = values;
    
        addCar({
        variables: {
            id,
            make,
            model,
            year,
        },
        update: (cache, { data: { addCar } }) => {
            const data = cache.readQuery({ query: GET_CARS });
            cache.writeQuery({
            query: GET_CARS,
            data: {
                ...data,
                cars: [...data.cars, addCar],
            },
            });
        },
        });
    };
    
    return (
        <>
        <h2>Add Car</h2>
        <Form
        name="add-car-form"
        layout="inline"
        size="large"
        style={{ marginBottom: "40px" }}
        form={form}
        onFinish={onFinish}
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
            <Input placeholder="i.e. 2020" />
        </Form.Item>
        <Form.Item shouldUpdate={true}>
            {() => (
            <Button
                type="primary"
                htmlType="submit"
                disabled={
                !form.isFieldsTouched(true) ||
                !!form.getFieldsError().filter(({ errors }) => errors.length)
                    .length
                }
            >
                Add Car
            </Button>
            )}
        </Form.Item>
            </Form>
        </>
    );
};
    export default AddCar;