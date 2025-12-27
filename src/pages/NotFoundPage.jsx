import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="not-found">
      <h2>404</h2>
      <p>Halaman yang Anda cari tidak ditemukan.</p>
      <p>
        <Link to="/">Kembali ke beranda</Link>
      </p>
    </div>
  );
}

export default NotFoundPage;