import { useEffect, useState } from "react";
import { getApiRequest } from "../../utils/api";

export default function Dashboard() {
    const [apiResponse, setApiResponse] = useState({});
    const [awaitingApiResponse, setAwaitingApiResponse] = useState(true)


    useEffect(() => {
      const getApiResponse = async () => {
        try {
          const response = await getApiRequest(`/`);
          setApiResponse(response);
        } catch (error) {
          console.error("Error fetching API response:", error);
        } finally {
          setAwaitingApiResponse(false);
        }
      };
      getApiResponse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // showBoundary dependency is delibratly excluded 


  return (
    <div>
      <h1>Dashboard</h1>
      <p>{awaitingApiResponse.toString()}</p>
      <p>{JSON.stringify(apiResponse)}</p>
    </div>
  )
}
