import { FC, ReactElement } from "react";

import { Todo } from "03-Features/Todo";

import "./_style.scss";

const Home: FC = (): ReactElement => {
  return (
    <main className="main">
      <section className="main__section">
        <Todo />
      </section>
    </main>
  );
};

export default Home;
