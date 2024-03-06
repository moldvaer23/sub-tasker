import { FC } from "react";
import "./_style.scss";
import { Todos } from "02-Widgets/Todos";

const Home: FC = () => {
  return (
    <main className="main">
      <section className="main__section">
        <Todos />
      </section>
    </main>
  );
};

export default Home;
