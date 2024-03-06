import { FC } from "react";
import { TodoList } from "02-Widgets/TodoList";
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
