import ProtectedRoute from "./ProtectedRoute";

const withAuth = (Component) => {
  return function AuthWrappedComponent(props) {
    return (
      <ProtectedRoute>
        <Component {...props} />
      </ProtectedRoute>
    );
  };
};

export default withAuth;
