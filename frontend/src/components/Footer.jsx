function Footer() {
  return (
    <footer className="bg-gray-900 text-white text-center py-6 mt-12">
      <p className="text-sm">
        © {new Date().getFullYear()} ShopEase. All rights reserved.
      </p>
      <div className="flex justify-center mt-3 space-x-6 text-gray-400">
        <a href="#" className="hover:text-white">Privacy Policy</a>
        <a href="#" className="hover:text-white">Terms</a>
        <a href="#" className="hover:text-white">Contact</a>
      </div>
    </footer>
  );
}

export default Footer;
