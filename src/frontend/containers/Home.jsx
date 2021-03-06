import React from "react";
import { connect } from "react-redux";

import "../assets/styles/App.scss";
import Header from "../components/Header";
import Search from "../components/Search";
import Categories from "../components/Categories";
import Carousel from "../components/Carousel";
import CarouselItem from "../components/CarouselItem";

const Home = ({ myList, trends, originals }) => {
  return (
    <React.Fragment>
      <Header isHome />
      <Search />
      {myList.length > 0 && (
        <Categories title="Mi lista" idTitle="favorites">
          <Carousel>
            {myList.map((item) => (
              <CarouselItem key={item.userMovieId} {...item} isList />
            ))}
          </Carousel>
        </Categories>
      )}
      <Categories title="Tendencias" idTitle="trends">
        <Carousel>
          {trends.map((item) => (
            <CarouselItem key={item._id} {...item} />
          ))}
        </Carousel>
      </Categories>
      <Categories title="Originales de Platzi Video" idTitle="originals">
        <Carousel>
          {originals.map((item) => (
            <CarouselItem key={item._id} {...item} />
          ))}
        </Carousel>
      </Categories>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    myList: state.myList,
    trends: state.trends,
    originals: state.originals,
  };
};

// export default Home;
// export default connect(loQueNecesitamos, lasActions)(Home);
export default connect(mapStateToProps, null)(Home);
