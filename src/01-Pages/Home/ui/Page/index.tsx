import type { FC, ReactElement } from "react";

import { Todo } from "02-Widgets/Todo";

import "./_style.scss";

import { Fields } from "02-Widgets/Fields";

const Home: FC = (): ReactElement => {
  return (
    <main className="main">
      <Fields />
      <section className="main__section-todos">
        <Todo />
      </section>
    </main>
  );
};

export default Home;
