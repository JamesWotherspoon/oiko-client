import TopBar from '../components/TopBar';
import Nav from '../components/Nav';

const PageLayout = ({ children }) => {
  return (
    <div id="page">
      <header>
        <TopBar />
        <Nav />
      </header>
      {children}
      <footer></footer>
    </div>
  );
};

export default PageLayout;
