import TopBar from '../components/TopBar';
import Nav from '../components/Nav';
import { useFetchData } from '../utils/hooks';

export const ProtectedLayout = ({ children }) => {
  useFetchData();

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
