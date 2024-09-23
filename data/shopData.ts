// This file contains the list of products available in the shop and their corresponding details.

export type ProductName = keyof typeof shopList;

export const shopList = {
    // products
    Teddy_Bear: { name: "Teddy Bear", price: "$12.99" },
    Stuffed_Frog: { name: "Stuffed Frog", price: "$10.99" },
    Handmade_Doll: { name: "Handmade Doll", price: "$10.99" },
    Fluffy_Bunny: { name: "Fluffy Bunny", price: "$9.99" },
    Smiley_Bear: { name: "Smiley Bear", price: "$14.99" },
    Funny_Cow: { name: "Funny Cow", price: "$10.99" },
    Valentine_Bear: { name: "Valentine Bear", price: "$14.99" },
    Smiley_Face: { name: "Smiley Face", price: "$9.99" },
};

// Commenting which products are used in the test cases
// Currently used in test cases:
// - Stuffed_Frog
// - Fluffy_Bunny
// - Valentine_Bear

// Not yet used:
// - Teddy_Bear
// - Handmade_Doll
// - Funny_Cow
// - Smiley_Face
// - Smiley_Bear