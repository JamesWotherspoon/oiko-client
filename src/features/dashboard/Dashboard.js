import { useEffect, useState } from "react";

export default function Dashboard() {
    const [apiResponse, setApiResponse] = useState({});
    const [awaitingApiResponse, setAwaitingApiResponse] = useState(true)

  return (
    <div>
      <h1>Dashboard</h1>
      <p>{awaitingApiResponse.toString()}</p>
      <p>{JSON.stringify(apiResponse)}</p>
    </div>
  )
}
