const TrustSection = () => {
  return (
    <section className="px-4 md:px-6 max-w-6xl mx-auto text-center">

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">

    {[
      "Secure Paystack Payments",
      "Verified Sellers",
      "Fast Local Delivery",
    ].map((text) => (
      <div
        key={text}
        className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-white border border-gray-100"
      >
        <p className="font-medium text-sm md:text-base">{text}</p>
      </div>
    ))}

  </div>

</section>
  );
};

export default TrustSection;
