export default function ErrorMessage({ message }: { message: string }) {
  if (!message) return null

  return (
    <p className="fontsemibold text-lg text-center mt-8 text-red-500">
      {message}
    </p>
  )
}
