import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { GET_CARS, GET_PERSON_WITH_CARS, REMOVE_CAR } from "../../graphql/queries";
import { filter } from "lodash";

const RemoveCar = ({ id, personId }) => {
  const [removeCar] = useMutation(REMOVE_CAR, {
    update(cache, { data: { removeCar } }) {
      // Update the cache for the GET_CARS query
      const { cars } = cache.readQuery({ query: GET_CARS });

      cache.writeQuery({
        query: GET_CARS,
        data: {
          cars: filter(cars, (c) => {
            return c.id !== removeCar.id;
          }),
        },
      });

      // Update the cache for the personWithCars query
      const personWithCarsData = cache.readQuery({
        query: GET_PERSON_WITH_CARS,
        variables: { id: removeCar.personId },
      });

      if (personWithCarsData) {
        const { personWithCars } = personWithCarsData;

        cache.writeQuery({
          query: GET_PERSON_WITH_CARS,
          variables: { id: removeCar.personId },
          data: {
            personWithCars: {
              ...personWithCars,
              cars: filter(personWithCars.cars, (c) => {
                return c.id !== removeCar.id;
              }),
            },
          },
        });
      }
    },
    refetchQueries: [
      { query: GET_PERSON_WITH_CARS, variables: { id: personId } },
    ],
  });

  const handleButtonClick = () => {
    let result = window.confirm("Are you sure you want to delete this car?");

    if (result) {
      removeCar({
        variables: {
          id,
        },
      });
    }
  };

  return (
    <DeleteOutlined
      key="delete"
      onClick={handleButtonClick}
      style={{ color: "red" }}
    />
  );
};

export default RemoveCar;
