export function LoadingButton({
  variant = 'blue'
}: Readonly<{
  variant?: 'blue' | 'gray'
}>) {
  return (
    <div className={`flex h-10 items-center rounded-lg bg-${variant}-200 px-4 text-sm font-medium text-white transition-colors hover:bg-${variant}-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-${variant}-500 active:bg-${variant}-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50`}>
      <div className="w-5 h-5 border-4 border-black/10 border-t-[#3498db] rounded-full animate-spin" />
    </div>
  );
}
