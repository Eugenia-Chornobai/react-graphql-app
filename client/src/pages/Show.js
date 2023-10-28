import PersonWithCars from "../components/listItems/PersonWithCard";
import { useQuery } from "@apollo/client";
import { GET_PERSON_WITH_CARS } from "../graphql/queries";

const Show = (props) => {
    const { loading, error, data } = useQuery(GET_PERSON_WITH_CARS, {
        variables: { id: props.match.params.id },
    });
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    
    return (
        <PersonWithCars data={data} />
    );
};
    
export default Show;

    