import { useQuery } from "@apollo/client";
import { GET_PERSON_WITH_CARS } from "../../graphql/queries";
import { Link } from "react-router-dom";

const PersonWithCars = (props) => {
  const { loading, error, data } = useQuery(GET_PERSON_WITH_CARS, {
    variables: { id: props.match.params.id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log(data);

  return (
    <div>
      <h2>Person With Cars</h2>
      <p>
        {data.personWithCars.firstName} {data.personWithCars.lastName}
      </p>
      <ul>
        {data.personWithCars.cars.map((car) => (
          <li key={car.id}>
            <Link to={`/car/${car.id}`}>
              {car.year} {car.make} {car.model}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PersonWithCars;
