export default function Input({
  type = 'text',
  placeholder,
  onChange,
  value
}: {
  type?: string
  placeholder: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  value?: string
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      className="border border-gray-300 text-black placeholder-gray-300 bg-transparent p-2 rounded-xl w-full"
    />
  )
}
