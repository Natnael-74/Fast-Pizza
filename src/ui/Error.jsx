import { useRouteError } from "react-router-dom";
import LinkButton from "./LinkButton";

function Error() {
  const error = useRouteError();

  return (
    <div className="py-8 sm:py-12">
      <div className="surface-panel mx-auto max-w-2xl px-6 py-8 text-center sm:px-10 sm:py-10">
        <h1 className="text-3xl font-semibold sm:text-4xl">
          Something went wrong
        </h1>
        <p className="mt-3 text-sm sm:text-base">
          {error?.data || error?.message}
        </p>
        <div className="mt-7">
          <LinkButton to="-1">&larr; Go back</LinkButton>
        </div>
      </div>
    </div>
  );
}

export default Error;
