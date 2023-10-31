import { useQuery } from "@apollo/client";
import { GET_CARS } from "../../graphql/queries";
import { List } from "antd";
import CarCard from "../listItems/CarCard";

const getStyles = () => ({
  list: {
    display: "flex",
    justifyContent: "center",
  },
});

const Cars = () => {
  const styles = getStyles();
  const { loading, error, data } = useQuery(GET_CARS);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  // console.log("data", data);

  const sortedCars = [...data.cars].sort((a, b) => a.make.localeCompare(b.make));

  return (
    <>
      <h2>Records</h2>
      <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
        {sortedCars.map(
          ({ id, make, model, year, price, person }) => (
            <List.Item key={id}>
              <CarCard
                id={id}
                make={make}
                model={model}
                year={year}
                price={price}
                person={person}
              />
            </List.Item>
          )
        )}
      </List>
    </>
  );
};

export default Cars;
