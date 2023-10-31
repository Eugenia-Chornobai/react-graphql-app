
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Home from "./pages/Home";
import Show from "./pages/Show";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <Routes>
            <Route
              path="/"
              element={<Home />}  
            />
            <Route path="/person/:id" Component={Show} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
