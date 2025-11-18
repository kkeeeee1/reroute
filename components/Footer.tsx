export function Footer() {
  const FOOTER_TEXT = '© 2024 Your Company. All rights reserved.'

  return (
    <footer className="bottom-0 w-full bg-white py-12 text-center md:py-20">
      <p className="text-md md:text-xl">{FOOTER_TEXT}</p>
    </footer>
  )
}
