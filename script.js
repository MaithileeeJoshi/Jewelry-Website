document.querySelector('.logo').addEventListener('click', function() {
    window.location.href = 'index.html'; // Redirect to the home page
});

// Remove any default underlining
document.querySelector('.logo').style.textDecoration = 'none';
document.addEventListener('DOMContentLoaded', () => {
    // Announcement Slider
    const announcementSlides = document.querySelectorAll('.announcement .slide'); // Select all announcement slides
    let currentAnnouncementSlide = 0; // Initialize the current announcement slide index

    // Function to show the next announcement slide
    function showNextAnnouncementSlide() {
        // Remove the 'active' class from the current slide (hide it)
        announcementSlides[currentAnnouncementSlide].classList.remove('active');
        
        // Move to the next announcement slide, looping back to the first after the last
        currentAnnouncementSlide = (currentAnnouncementSlide + 1) % announcementSlides.length;
        
        // Add the 'active' class to the next slide (show it)
        announcementSlides[currentAnnouncementSlide].classList.add('active');
    }

    // Initially show the first announcement slide
    announcementSlides[currentAnnouncementSlide].classList.add('active');

    // Change announcement slide every 3 seconds
    setInterval(showNextAnnouncementSlide, 3000); // 3000ms = 3 seconds for each announcement

    // Image Slider
    const imageSlides = document.querySelectorAll('.slider .slide'); // Select all image slides
    let currentImageSlide = 0; // Initialize the current image slide index

    // Function to show the next image slide
    function showNextImageSlide() {
        // Remove the 'active' class from the current image (hide it)
        imageSlides[currentImageSlide].classList.remove('active');
        
        // Move to the next image slide, looping back to the first after the last
        currentImageSlide = (currentImageSlide + 1) % imageSlides.length;
        
        // Add the 'active' class to the next image (show it)
        imageSlides[currentImageSlide].classList.add('active');
    }

    // Initially show the first image slide
    imageSlides[currentImageSlide].classList.add('active');

    // Change image slide every 5 seconds
    setInterval(showNextImageSlide, 5000); // 5000ms = 5 seconds for each image

 
    // new arrival section
    document.addEventListener('DOMContentLoaded', () => {
        const productCards = document.querySelectorAll('.product-card');
        let currentIndex = 0;

        function highlightCard() {
            productCards.forEach((card, index) => {
                card.style.opacity = index === currentIndex ? '1' : '0.5';
            });

            currentIndex = (currentIndex + 1) % productCards.length;
        }

        setInterval(highlightCard, 3000); // Highlights each product card every 3 seconds
    });


    //video card section
    function playPause(video) {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    }

    // Example functionality for future interactivity
    document.querySelectorAll('.style-item').forEach(item => {
        item.addEventListener('click', () => {
            alert(`You clicked on ${item.querySelector('.style-caption').innerText}!`);
        });
    });
  
    // View All Button Action
    document.querySelector('.view-all-btn').addEventListener('click', () => {
        alert('Redirecting to the full collection!');
        // Add redirect logic here
    });
});

//Customer review Section
const cardsWrapper = document.querySelector('.cards-wrapper');
const cards = document.querySelectorAll('.card');

let currentIndex = 0;

function slideCards() {
    // Reset all cards
    cards.forEach(card => {
        card.style.transform = 'scale(1) translateY(0)';
        card.style.opacity = '0.6';
    });

    // Move wrapper to show next group
    currentIndex++;
    if (currentIndex > cards.length - 3) {
        currentIndex = 0;
    }

    // Highlight the middle card
    const midCard = cards[currentIndex + 1];
    if (midCard) {
        midCard.style.transform = 'scale(1.1) translateY(-20px)';
        midCard.style.opacity = '1';
    }

    // Move the wrapper
    cardsWrapper.style.transform = `translateX(-${currentIndex * 33.33}%)`;
}

// Automatic sliding every 5 seconds
setInterval(slideCards, 5000);

