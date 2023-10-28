import { useQuery, gql } from "@apollo/client";
import Title from "../components/layout/Title";
import AddPerson from "../components/forms/AddPerson";
import AddCar from "../components/forms/AddCar";
import People from "../components/lists/People";
import Cars from "../components/lists/Cars";

const GET_PEOPLE = gql`
  query GetPeople {
    people {
      id
      firstName
      lastName
    }
  }
`;

const GET_CARS = gql`
  query GetCars {
    cars {
      id
      make
      model
    }
  }
`;

const Home = () => {
  const {
    loading: peopleLoading,
    error: peopleError,
    data: peopleData,
  } = useQuery(GET_PEOPLE);
  const {
    loading: carsLoading,
    error: carsError,
    data: carsData,
  } = useQuery(GET_CARS);

  if (peopleLoading || carsLoading) return <p>Loading...</p>;
  if (peopleError || carsError) return <p>Error :(</p>;

  return (
    <div>
      <Title />
      <AddPerson />
      <AddCar />
      <People people={peopleData.people} />
      <Cars cars={carsData.cars} />
    </div>
  );
};

export default Home;
