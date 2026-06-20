export default function IconBtn({
  text,
  onclick,
  children,
  disabled,
  outline = false,
  customClasses,
  type,
}) {
  return (
    <button
      disabled={disabled}
      onClick={onclick}
      className={`flex items-center ${
        outline ? "border border-blue-600 bg-transparent" : "bg-gradient-to-b from-[#DA22FF] via-[#B42CF5] to-[#9733EE]"
      } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-gray-100 ${customClasses}`}
      type={type}
    >
      {children ? (
        <>
          <span className={`${outline && "text-blue-600"}`}>{text}</span>
          {children}
        </>
      ) : (
        text
      )}
    </button>
  )
}
