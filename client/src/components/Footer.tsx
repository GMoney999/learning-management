import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='footer'>
      <p>&copy; 2024 Moonfall. All rights reserved.</p>
      <div className="footer__links">
        {["About", "Privacy Policy", "Licensing"].map((item) => (
            <Link 
            key={item}
            href={`/${item.toLowerCase().replace(" ", "-")}`}
            className="footer__link">
                {item}
            </Link>
        ))}
      </div>
    </div>
  )
}

export default Footer
