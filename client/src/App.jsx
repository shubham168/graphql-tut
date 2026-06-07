import "./App.css";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useEffect } from "react";

const GET_TODOS_WITH_USER = gql`
  query GetTodosWithUser {
    getTodos {
      id
      completed
      title
      completed
      user {
        name
      }
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_TODOS_WITH_USER);
  useEffect(() => {
    console.log(data?.getTodos?.map((item) => item));
  }, [data]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  return (
    <div>
      {data.getTodos.map((item) => (
        <div>
          {item?.id}:{" "}
          <span style={{ fontSize: "14px", fontWeight: "600" }}>
            {`${item?.title} -- `}
          </span>
          by {item?.user?.name}
        </div>
      ))}
    </div>
  );
}

export default App;
