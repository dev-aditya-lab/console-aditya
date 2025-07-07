import React from 'react'

export default function Footer() {
  return (
     <footer className="w-full ">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col items-center gap-6">
        {/* Footer Text */}
        <p className="text-sm text-center leading-relaxed">
          Made with keyboard rage & caffeine ☕, 💻, &{" "}
          <span className="font-semibold text-foreground">Next.js + TypeScript</span>  
          <br />
          © {new Date().getFullYear()} <span className="font-medium text-foreground">Aditya Kumar Gupta</span>. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
