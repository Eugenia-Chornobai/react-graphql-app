import { useMutation } from "@apollo/client";
import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { UPDATE_CAR } from "../../graphql/queries";
import { Select } from "antd";
import { useQuery } from "@apollo/client";
import { GET_PEOPLE } from "../../graphql/queries";
// import e from "cors";

const UpdateCar = (props) => {
  const { id, make, model, year, price, owner } = props;
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();
  const { loading, error, data } = useQuery(GET_PEOPLE);

  useEffect(() => {
    forceUpdate({});
  }, []);

  const [updateCar] = useMutation(UPDATE_CAR);

  const onFinish = async (values) => {
    const { make, model, year, price, owner } = values;

    try {
      const { data } = await updateCar({
        variables: {
          id,
          make,
          model,
          year: parseInt(year),
          price: parseFloat(price),
          personId: owner,
        },
      });
      console.log(data); // Log the response data for debugging
      props.onButtonClick();
    } catch (error) {
      console.error(error); // Log the error for debugging
    }
  };

  return (
    <>
      <h2>Update Car</h2>
      <Form
        form={form}
        name="update-car-form"
        layout="inline"
        style={{ margin: "40px", width: "80%", justifyContent: "center" }}
        onFinish={onFinish}
        initialValues={{
          make,
          model,
          year,
          price,
          owner,
        }}
      >
        <Form.Item
          name="make"
          style={{ marginBottom: "10px" }}
          rules={[{ required: true, message: "Please enter a make" }]}
        >
          <Input placeholder="i.e. Honda" />
        </Form.Item>

        <Form.Item
          name="model"
          style={{ marginBottom: "10px" }}
          rules={[{ required: true, message: "Please enter a model" }]}
        >
          <Input placeholder="i.e. Civic" />
        </Form.Item>

        <Form.Item
          name="year"
          style={{ marginBottom: "10px" }}
          rules={[{ required: true, message: "Please enter a year" }]}
        >
          <Input placeholder="i.e. 2019" />
        </Form.Item>

        <Form.Item
          name="price"
          style={{ marginBottom: "10px" }}
          rules={[{ required: true, message: "Please enter a price" }]}
        >
          <Input placeholder="i.e. 20000" />
        </Form.Item>

        <Form.Item
          label="Owner"
          name="owner"
          style={{ marginBottom: "10px" }}
          rules={[{ required: true, message: "Please select an owner" }]}
        >
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error :(</p>
          ) : (
            <Select
              placeholder="Select an owner"
              style={{ marginBottom: "10px" }}
            >
              {data.people.map((person) => (
                <Select.Option key={person.id} value={person.id}>
                  {person.firstName} {person.lastName}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>

        <Form.Item shouldUpdate={true} style={{ marginBottom: "10px" }}>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                (!form.isFieldTouched("make") &&
                  !form.isFieldTouched("model") &&
                  !form.isFieldTouched("year")) ||
                form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              Update Car
            </Button>
          )}
        </Form.Item>
        <Button onClick={props.onButtonClick} style={{ marginBottom: "10px" }}>
          Cancel
        </Button>
      </Form>
    </>
  );
};

export default UpdateCar;
