export default function Footer() {
  return (
    <footer className="bg-white border-t mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">P</span>
            </div>
            <span className="text-xl font-bold text-secondary">POLLTATO</span>
          </div>
          <p className="text-slate-600">해커톤 투표를 더 쉽고 공정하게</p>
          <div className="mt-4 text-sm text-slate-500">
            © 2025 POLLTATO. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
