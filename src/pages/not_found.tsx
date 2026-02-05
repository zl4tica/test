export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="relative mb-8">
          <h1 className="text-[150px] md:text-[200px] lg:text-[250px] font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-blue-500 leading-none">
            404
          </h1>
        </div>

        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
          اووبس ! الصفحة غير موجودة
        </h2>
        <p className="text-gray-600 text-base md:text-lg mb-8 max-w-md mx-auto">
          عذراً، الصفحة التي تبحث عنها غير موجودة. قد تكون قد تم نقلها أو حذفها.
        </p>
      </div>
    </div>
  );
}
