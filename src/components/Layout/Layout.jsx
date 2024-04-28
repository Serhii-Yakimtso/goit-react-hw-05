import Navigation from '../Navigation/Navigation';
// import css from './Layout.module.css';

export default function Layout({ children }) {
  return (
    <div>
      <Navigation />
      {children}
    </div>
  );
}
