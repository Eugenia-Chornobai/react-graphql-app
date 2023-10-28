import "./App.css";
import Title from "./components/layout/Title";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import AddPerson from "./components/forms/AddPerson";
import AddCar from "./components/forms/AddCar";
import People from "./components/lists/People";
import Cars from "./components/lists/Cars";
import { BrowserRouter as Router } from "react-router-dom";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router basename="/">
        <div className="App">
          <Title />
          <AddPerson />
          <AddCar />
          <People />
          <Cars />
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default App;
