import { FC } from "react";
import { TodoList } from "03-Features/Todo";
import "./_style.scss";

const Home: FC = () => {
  return (
    <main className="main">
      <section className="main__section">
        <TodoList />
      </section>
    </main>
  );
};

export default Home;
