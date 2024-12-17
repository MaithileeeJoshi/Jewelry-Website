// Earrings Store JavaScript

// Product Catalog (updated to replace 'material' with 'occasion')
const products = [
    { id: 1, name: "Gold Hoop Earrings", category: "Hoop", color: "Gold", price: 459, occasion: "Party Glam" },
    { id: 2, name: "Silver Stud Earrings", category: "Hoop", color: "Gold", price: 459, occasion: "Party Glam" },
    { id: 3, name: "Colorful Tassel Earrings", category: "Hoop", color: "Gold", price: 459, occasion: "Party Glam" },
    { id: 4, name: "Gold Threader Earrings", category: "Hoop", color: "Gold", price: 459, occasion: "Party Glam" },
    { id: 5, name: "Gold Hoop Earrings", category: "Threaders", color: "Silver", price: 459, occasion: "Summer Wear" },
    { id: 6, name: "Silver Stud Earrings", category: "Studs", color: "Silver", price: 499, occasion: "Everyday Office" },
    { id: 7, name: "Colorful Tassel Earrings", category: "Tassel", color: "Other Cute Colors", price: 699, occasion: "" },
    { id: 8, name: "Pearl Huggie Earrings", category: "Huggies", color: "White / Pearl", price: 289, occasion: "Everyday Office" },
    { id: 9, name: "Gold Threader Earrings", category: "Threaders", color: "Silver", price: 349, occasion: "Everyday Office" },
    { id: 10, name: "Colorful Hoop Earrings", category: "Threaders", color: "Other Cute Colors", price: 499, occasion: "Summer Wear" },
    { id: 11, name: "Classic Silver Studs", category: "Studs", color: "Silver", price: 549, occasion: "Everyday Office" },
    { id: 12, name: "Gold Tassel Earrings", category: "Tassel", color: "White / Pearl", price: 399, occasion: "Party Glam" },
    { id: 13, name: "White Pearl Huggies", category: "Huggies", color: "White / Pearl", price: 299, occasion: "Everyday Office" },
    { id: 14, name: "Silver Hoop Earrings", category: "Tassel", color: "Other Cute Colors", price: 349, occasion: "Summer Wear" },
    { id: 15, name: "Gold Threader Earrings", category: "Threaders", color: "Silver", price: 459, occasion: "Summer Wear" },
    { id: 16, name: "Pearl Stud Earrings", category: "Studs", color: "White / Pearl", price: 599, occasion: "Party Glam" },
    { id: 17, name: "Colorful Huggie Earrings", category: "Huggies", color: "Other Cute Colors", price: 399, occasion: "Everyday Office" },
    { id: 18, name: "Party Tassel Earrings", category: "Tassel", color: "Gold", price: 479, occasion: "Party Glam" },
    { id: 19, name: "Silver Threader Earrings", category: "Huggies", color: "White / Pearl", price: 529, occasion: "Everyday Office" },
    { id: 20, name: "Summer Hoop Earrings", category: "Studs", color: "Other Cute Colors", price: 369, occasion: "Summer Wear" }
];

// Cart Management
class CartManager {
    constructor() {
        this.cartItems = [];
    }

    addToCart(itemName, price) {
        if (!this.cartItems.some(item => item.name === itemName)) {
            this.cartItems.push({ name: itemName, price: parseFloat(price) });
            this.updateCartUI();
            this.showNotification(`${itemName} has been added to your cart.`);
        } else {
            this.showNotification(`${itemName} is already in your cart.`);
        }
    }

    updateCartUI() {
        const cartCount = document.getElementById("cart-count");
        if (cartCount) {
            cartCount.textContent = this.cartItems.length;
        }
    }

    showNotification(message) {
        alert(message);
    }

    initializeCartButtons() {
        const addToCartButtons = document.querySelectorAll(".add-to-cart");
        addToCartButtons.forEach(button => {
            button.addEventListener("click", () => {
                const card = button.closest(".card");
                const itemName = card.querySelector(".card-title").textContent.trim();
                const priceElement = card.querySelector(".price");
                const price = priceElement.textContent.replace(/.*Rs\.\s*/, "").trim();
                this.addToCart(itemName, price);
            });
        });
    }
}

// Product Filtering
class ProductFilter {
    constructor() {
        this.initializeSidebarCollapse();
        this.initializePriceRangeFilter();
        this.initializeDropdownFilters();
    }

    initializeSidebarCollapse() {
        const collapsibleHeaders = document.querySelectorAll(".collapsible");
        collapsibleHeaders.forEach(header => {
            header.addEventListener("click", () => {
                const content = header.nextElementSibling;
                content.classList.toggle("active");

                // Toggle arrow
                const arrow = header.querySelector(".arrow");
                arrow.textContent = content.classList.contains("active") ? "▲" : "▼";
            });
        });
    }

    initializePriceRangeFilter() {
        const priceRangeMin = document.getElementById("priceRangeMin");
        const priceRangeMax = document.getElementById("priceRangeMax");
        const priceRangeDisplay = document.getElementById("priceRangeDisplay");
    
        const updatePriceDisplay = () => {
            const minValue = Math.min(parseInt(priceRangeMin.value) || 0, parseInt(priceRangeMax.value) || Infinity);
            const maxValue = Math.max(parseInt(priceRangeMin.value) || 0, parseInt(priceRangeMax.value) || Infinity);
    
            priceRangeDisplay.textContent = `Rs. ${minValue} - Rs. ${maxValue}`;
            this.filterProducts();
        };
    
        priceRangeMin.addEventListener("input", updatePriceDisplay);
        priceRangeMax.addEventListener("input", updatePriceDisplay);
    }
    

    initializeDropdownFilters() {
        const dropdowns = ["categoryDropdown", "colorDropdown", "occasionDropdown"];
        dropdowns.forEach(dropdownId => {
            const dropdown = document.getElementById(dropdownId);
            if (dropdown) {
                dropdown.addEventListener("change", () => this.filterProducts());
            }
        });
    }

    filterProducts() {
        const selectedCategory = this.getDropdownValue("categoryDropdown");
        const selectedColor = this.getDropdownValue("colorDropdown");
        const selectedOccasion = this.getDropdownValue("occasionDropdown");
        const minPrice = parseInt(document.getElementById("priceRangeMin").value) || 0;
        const maxPrice = parseInt(document.getElementById("priceRangeMax").value) || Infinity;

        const productCards = document.querySelectorAll(".product-grid .card");
        let visibleProductCount = 0;

        productCards.forEach(card => {
            const cardPrice = parseFloat(card.dataset.price);
            const cardCategory = card.dataset.type;
            const cardColor = card.dataset.color;
            const cardOccasion = card.dataset.occasion;

            // Ensure category, color, and occasion match
            const matches =
                (selectedCategory === "all" || cardCategory.toLowerCase() === selectedCategory.toLowerCase()) &&
                (selectedColor === "all" || cardColor.toLowerCase() === selectedColor.toLowerCase()) &&
                (selectedOccasion === "all" || cardOccasion.toLowerCase() === selectedOccasion.toLowerCase()) &&
                cardPrice >= minPrice && cardPrice <= maxPrice;

            card.classList.toggle("hidden", !matches);
            if (matches) visibleProductCount++;
        });

        const productCount = document.getElementById("product-count");
        if (productCount) {
            productCount.textContent = visibleProductCount;
        }
    }

    getDropdownValue(dropdownId) {
        const dropdown = document.getElementById(dropdownId);
        return dropdown ? dropdown.value : "all";
    }
}

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
    const productFilter = new ProductFilter();
    const cartManager = new CartManager();

    cartManager.initializeCartButtons();

    const urlParams = new URLSearchParams(window.location.search);
    const filterParam = urlParams.get("filter");
    if (filterParam) {
        const dropdown = document.getElementById("categoryDropdown");
        if (dropdown) {
            dropdown.value = filterParam;
            productFilter.filterProducts();
        }
    }
});
