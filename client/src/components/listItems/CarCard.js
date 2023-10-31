import { Card } from "antd";

import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
// import UpdateCar from "../forms/UpdateCar";
// import RemoveCar from "../buttons/RemoveCar";
import { useQuery, useMutation } from "@apollo/client";
import "./CarCard.css";

const CarCard = (props) => {
  // const [editMode, setEditMode] = useState(false);
  const { id, make, model, year, price, person, showOwner = true } = props;
  const styles = getStyles();

  console.log("person", person);

  if (!person) {
    return <p>Loading...</p>;
  }

  // const handleButtonClick = () => {
  //   setEditMode(!editMode);
  // };

  return (
    <div>
      {/* {editMode ? (
        <UpdateCar
          id={id}
          make={make}
          model={model}
          year={year}
          onButtonClick={handleButtonClick}
        />
      ) : ( */}
   <Card
    title={`${make} ${model}`}
    style={{ width: 500 }}
      >
        <div>
          <p>Year: {year}</p>
          <p>Price: $ {price.toLocaleString()}</p>
          {showOwner && <p>Owner: {person.firstName} {person.lastName}</p>}
        </div>
  </Card>
  
      {/* )}  */
      }
    </div>
  );
};

const getStyles = () => ({
  card: {
    width: "500px",
  },
});

export default CarCard;
