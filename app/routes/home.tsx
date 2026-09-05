import RegisterPage from '../components/RegisterPage';

export function meta() {
  return [{ title: 'Поштовий Лелека - Реєстрація' }];
}

export default function Index() {
  return (
    <div className="w-full">
      <RegisterPage />
    </div>
  );
}
