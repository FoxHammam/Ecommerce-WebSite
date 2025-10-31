import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { productAPI, orderAPI } from "../services/api";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    city: "",
    address: "",
  });

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getById(id);
      setProduct(response.data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch product:', err);
      setError('Failed to load product details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!product) {
      alert("Product not found");
      return;
    }

    try {
      setSubmitting(true);
      const orderData = {
        fullName: formData.fullName,
        phone: formData.phone,
        city: formData.city,
        address: formData.address,
        productId: product._id,
      };

      const response = await orderAPI.create(orderData);
      
      if (response.success) {
        alert("✅ Your order has been submitted successfully!");
        setFormData({
          fullName: "",
          phone: "",
          city: "",
          address: "",
        });
      }
    } catch (err) {
      console.error('Failed to submit order:', err);
      alert("❌ Failed to submit order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const scrollToBuyForm = () => {
    const formElement = document.getElementById("order-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#4ade80]"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex justify-center items-center flex-col">
        <p className="text-red-500 text-xl mb-4">{error || 'Product not found'}</p>
        <button 
          onClick={fetchProduct}
          className="px-6 py-2 bg-[#4ade80] text-white rounded-lg hover:bg-[#3dd16d]"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-10 pb-24">
      {/* Two-column layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 px-2 sm:px-4 lg:px-8">
        {/* LEFT: Main Image */}
<div className="lg:sticky lg:top-20 lg:h-[90vh] w-full flex items-center justify-center">
  <img
    src={product.mainImage}
    alt={product.name}
    className="w-full h-full object-cover"
  />
</div>

        {/* RIGHT: Order Form + Features */}
        <div className="flex flex-col space-y-6 p-4 lg:p-8">
          {/* Product Title & Price */}
          <div className="mt-4 lg:mt-0">
            <h1 className="text-2xl font-semibold text-gray-800 mb-3">
              {product.name}
            </h1>
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-2xl text-green-500 font-medium">
                {product.price} {product.currency}
              </span>
              <span className="text-lg text-gray-400 line-through">
                {product.oldPrice} {product.currency}
              </span>
            </div>
          </div>

          {/* Order Form */}
          <form
            id="order-form"
            onSubmit={handleSubmit}
            className="bg-gray-50 border-2 border-green-400 rounded-xl p-6 space-y-4 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Complete Your Order
            </h2>

            {/* Full Name */}
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            {/* Phone */}
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            {/* City */}
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            {/* Address */}
            <textarea
              name="address"
              placeholder="Full Address"
              value={formData.address}
              onChange={handleChange}
              required
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
            ></textarea>

             <button
               type="submit"
               disabled={submitting}
               className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
             >
               {submitting ? 'Submitting...' : 'Buy Now'}
             </button>
          </form>

           {/* Product Features */}
           <div className="space-y-10">
             {product.sections && product.sections.map((section) => (
              <div key={section.id}>
                <p className="text-4xl text-gray-800 leading-relaxed mb-4">
                  {section.description}
                </p>
                <img
                  src={section.image}
                  alt={`Feature ${section.id}`}
                  className="w-full rounded-lg border"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed Buy Now Button */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-lg z-40">
        <div className="max-w-md mx-auto p-4">
          <button
             onClick={scrollToBuyForm}
             className="w-full bg-green-500 hover:bg-green-600 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 shadow-md hover:shadow-xl"
           >
             Buy Now - ${product.price}
          </button>
        </div>
      </div>

      {/* Fixed WhatsApp Icon */}
    <a
  href="https://wa.me/212600000000"
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-24 right-4 bg-green-500 hover:bg-green-600 p-3 rounded-full shadow-lg z-50 animate-bounce transition-transform duration-300 hover:scale-110"
>
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
    alt="WhatsApp"
    className="w-8 h-8"
  />
</a>


    </div>
  );
}

export default ProductDetails;
