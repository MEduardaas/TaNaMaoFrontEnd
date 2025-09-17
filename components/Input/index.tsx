export default function Input({
  type,
  placeholder,
  onChange
}: {
  type: string
  placeholder: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      className="border border-gray-300 text-black placeholder-gray-300 bg-transparent p-2 rounded w-full"
    />
  )
}
