import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import BookCard from "../Book/BookCard";

const categories = ["Choose a genre", "Business", "Fiction", "Horror", "Adventure"];

function TopSellers() {
    const [books, setBooks] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Choose a genre"); // <-- FIXED

    useEffect(() => {
        fetch("books.json")
            .then((res) => res.json())
            .then((data) => setBooks(data))
            .catch((error) => console.error("Error fetching books:", error));
    }, []);

    // Ensure books is an array before filtering
    const filteredBooks =
        selectedCategory === "Choose a genre"
            ? books
            : books.filter((book) => book.category?.toLowerCase() === selectedCategory.toLowerCase());

    return (
        <div className="py-10">
            <h2 className="text-3xl font-semibold mb-6">Top Sellers</h2>
            <div>
                <select
                    name="category"
                    id="category"
                    className="border bg-[#EAEAEA] px-4 py-2 border-gray-300 rounded-lg focus:border-none mb-6"
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                navigation={true}
                breakpoints={{
                    640: { slidesPerView: 1, spaceBetween: 20 },
                    768: { slidesPerView: 2, spaceBetween: 40 },
                    1024: { slidesPerView: 2, spaceBetween: 50 },
                    1180: { slidesPerView: 3, spaceBetween: 50 },
                }}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                {filteredBooks.length > 0 ? (
                    filteredBooks.map((book, index) => (
                        <SwiperSlide key={index}>
                            <BookCard book={book} />
                        </SwiperSlide>
                    ))
                ) : (
                    <p className="text-center mt-4">No books available for this category.</p>
                )}
            </Swiper>
        </div>
    );
}

export default TopSellers;

