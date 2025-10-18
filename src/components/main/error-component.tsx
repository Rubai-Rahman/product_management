export default function Error({ message }: { message: string }) {
  return (
    <div>
      <h1>Something went wrong!</h1>
      <p>{message}</p>
    </div>
  );
}
