import React from "react";
import { isRouteErrorResponse, useRouteError, Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex flex-col justify-center items-center bg-gray-800 w-full min-h-full text-white">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      {isRouteErrorResponse(error) ? (
        <p>
          {error.status} {error.statusText}
        </p>
      ) : (
        <p>Unknown error!</p>
      )}
      <Link to={"/"} className="border-2 border-gray-700 p-2 rounded-xl">
        Take me to safety!
      </Link>
    </div>
  );
}
