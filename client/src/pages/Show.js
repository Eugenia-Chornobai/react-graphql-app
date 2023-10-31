import { useParams } from "react-router-dom";
import PersonWithCars from "../components/listItems/PersonWithCars";
import { useQuery } from "@apollo/client";
import { GET_PERSON_WITH_CARS } from "../graphql/queries";

const Show = () => {

  const { id } = useParams();
  // console.log("id", id);
  const { loading, error, data } = useQuery(GET_PERSON_WITH_CARS, {
    variables: { id },
  });

  // console.log("error", error);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  // console.log("data", data);

  let sortedCars = [];
  if (data.person && data.person.cars) {
    sortedCars = [...data.person.cars].sort((a, b) => a.make.localeCompare(b.make));
  }
  
  const sortedData = {
    ...data,
    person: {
      ...data.person,
      cars: sortedCars,
    },
  };

  return <PersonWithCars data={sortedData} />;
  
};

export default Show;
