
import { Link } from "react-router-dom";
import CarCard from "./CarCard";
import { Card } from "antd";


const PersonWithCars = ({ data }) => {


  return (
    <div>
      <Link
        style={{ display: "flex", textAlign: "left", marginTop: "20px", marginBottom: "40px" }}
        to="/">GO BACK HOME</Link>
      <h2>Person With Cars</h2>
      <h3>
        {data.personWithCars.firstName} {data.personWithCars.lastName}
      </h3>
      <ul style={{ listStyle: "none", padding: "0" }}>
        {data.personWithCars.cars.map((car) => (
          <li key={car.id}>
            <CarCard {...car} person={data.personWithCars} showOwner={false} />
          </li>
        ))}
      </ul>
    </div>
  );
};


export default PersonWithCars;
