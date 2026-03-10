interface CategoriesEmptyStateProps {
  message: string;
}

const CategoriesEmptyState = ({ message }: CategoriesEmptyStateProps) => {
  return <div>{message}</div>;
};

export default CategoriesEmptyState;
