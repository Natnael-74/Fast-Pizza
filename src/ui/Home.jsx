import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";

function Home() {
  const username = useSelector((state) => state.user.username);

  return (
    <div className="py-6 text-center sm:py-10">
      <section className="surface-panel mx-auto max-w-3xl px-6 py-10 sm:px-10 sm:py-14">
        <p className="mb-4 text-[11px] font-semibold tracking-[0.2em] text-[var(--color-accent-deep)] uppercase">
          Crafted Daily
        </p>
        <h1 className="text-4xl leading-tight font-semibold sm:text-5xl">
          The finest pizza experience.
          <span className="mt-2 block text-3xl text-[var(--color-accent-deep)] sm:text-4xl">
            Fresh from our stone oven to your table.
          </span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-sm sm:text-base">
          Elevated ingredients, thoughtful preparation, and fast delivery made
          to feel effortless.
        </p>

        <div className="mt-10">
          {username === "" ? (
            <CreateUser />
          ) : (
            <Button type="primary" to="/menu">
              Start ordering {username}
            </Button>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;
