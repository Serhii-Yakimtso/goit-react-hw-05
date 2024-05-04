import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <>
      <p>Sorry. Page not found. You can go to home page</p>
      <Link to="/">Home page</Link>
    </>
  );
}
