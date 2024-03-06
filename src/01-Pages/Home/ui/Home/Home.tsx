import { FC } from "react";
import "./_style.scss";
import { Todo } from "03-Features/Todo";

const Home: FC = () => {
  return (
    <main className="main">
      <section className="main__section">
        <Todo />
      </section>
    </main>
  );
};

export default Home;
