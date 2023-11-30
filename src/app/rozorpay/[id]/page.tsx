export default function EventPayment({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Event Transaction Id</h1>

      <hr />
      <p className="text-2xl">
        <span> {params.id}</span>
      </p>
    </div>
  );
}
