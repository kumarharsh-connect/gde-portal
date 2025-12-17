import ProtectedRoute from '@/src/components/ProtectedRoute';

export default function DashbooardPage() {
  return (
    <ProtectedRoute>
      <h1>Dashbaord Page</h1>
    </ProtectedRoute>
  );
}
