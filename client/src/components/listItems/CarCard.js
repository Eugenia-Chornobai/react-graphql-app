import { Card } from "antd";

import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import UpdateCar from "../forms/UpdateCar";
import RemoveCar from "../buttons/RemoveCar";
import { useQuery, useMutation } from "@apollo/client";

const CarCard = (props) => {
    const [editMode, setEditMode] = useState(false);
    const { id, make, model, year } = props;
    const styles = getStyles();
    
    const handleButtonClick = () => {
        setEditMode(!editMode);
    };
    
    return (
        <div>
        {editMode ? (
            <UpdateCar
            id={id}
            make={make}
            model={model}
            year={year}
            onButtonClick={handleButtonClick}
            />
        ) : (
            <Card
            style={styles.card}
            actions={[
                <EditOutlined key="edit" onClick={handleButtonClick} />,
                <RemoveCar id={id} />,
            ]}
            >
            {make} {model} {year}
            </Card>
        )}
        </div>
    );
};
    
const getStyles = () => ({
    card: {
        width: "500px",
    },
});

export default CarCard;

