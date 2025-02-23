import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-[#E9EFEC] py-4 bg-[#E9EFEC]">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <div className="text-center mb-4">
          <h2 className="text-xl font-bold text-[#0c6f40]">JobFolio</h2>
          <p className="text-base font-medium">© 2024 Your Company. All rights reserved.</p>
        </div>
        <div className="flex justify-center space-x-6">
          <a href="https://www.facebook.com/harsh.dogney/" className="hover:text-gray-400" aria-label="Facebook" target="_blank">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.676 0H1.324C.593 0 0 .592 0 1.324v21.352C0 23.408.593 24 1.324 24H12.82V14.706H9.692v-3.578h3.128V8.408c0-3.1 1.893-4.787 4.657-4.787 1.325 0 2.463.1 2.794.144v3.238l-1.918.001c-1.503 0-1.794.715-1.794 1.762v2.31h3.587l-.468 3.578h-3.119V24h6.116C23.407 24 24 23.408 24 22.676V1.324C24 .592 23.407 0 22.676 0z" />
            </svg>
          </a>
          <a href="https://github.com/Harsh-Dogney" className="hover:text-gray-400" aria-label="GitHub" target="_blank">
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 .297c-6.627 0-12 5.373-12 12 0 5.304 3.438 9.801 8.207 11.387.6.111.827-.26.827-.577 0-.287-.011-1.044-.016-2.051-3.338.724-4.043-1.608-4.043-1.608-.545-1.385-1.333-1.755-1.333-1.755-1.087-.743.083-.728.083-.728 1.204.084 1.838 1.237 1.838 1.237 1.067 1.829 2.8 1.299 3.482.992.108-.774.418-1.299.762-1.599-2.665-.303-5.466-1.332-5.466-5.922 0-1.308.467-2.38 1.237-3.22-.124-.303-.537-1.525.117-3.176 0 0 1.007-.322 3.299 1.229.957-.266 1.986-.398 3.005-.403 1.02.005 2.048.137 3.006.403 2.29-1.551 3.296-1.229 3.296-1.229.656 1.651.243 2.873.119 3.176.77.84 1.236 1.912 1.236 3.22 0 4.608-2.805 5.619-5.475 5.913.431.372.815 1.104.815 2.223 0 1.606-.014 2.908-.014 3.301 0 .319.224.693.831.577C20.565 22.097 24 17.6 24 12.297c0-6.627-5.373-12-12-12z" />
  </svg>
</a>

          <a href="https://www.linkedin.com/in/harsh-dogney-325445203/" className="hover:text-gray-400" aria-label="LinkedIn" target="_blank">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452H16.85v-5.569c0-1.327-.027-3.037-1.852-3.037-1.854 0-2.137 1.446-2.137 2.94v5.666H9.147V9.756h3.448v1.464h.05c.48-.91 1.653-1.871 3.401-1.871 3.634 0 4.307 2.39 4.307 5.498v5.605zM5.337 8.29c-1.105 0-2-.896-2-2 0-1.106.895-2 2-2 1.104 0 2 .895 2 2 0 1.104-.896 2-2 2zM7.119 20.452H3.553V9.756h3.566v10.696zM22.225 0H1.771C.791 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451c.979 0 1.771-.774 1.771-1.729V1.729C24 .774 23.205 0 22.225 0z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
