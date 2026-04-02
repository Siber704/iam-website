document.addEventListener('DOMContentLoaded', () => {
    const heading = document.querySelector('h1');
    const texts = {
        'ru': 'Я Есть',
        'en': 'I Am',
        'es': 'Yo Soy'
    };

    // Simple language detection
    const userLang = (navigator.language || navigator.userLanguage).split('-')[0];
    const displayLang = texts[userLang] ? userLang : 'ru';
    
    // Set initial text
    heading.textContent = texts[displayLang];

    // Trigger fade-in on load
    setTimeout(() => {
        heading.classList.add('fade-in');
    }, 100);

    // Click to cycle text with animation
    let currentLangIdx = Object.keys(texts).indexOf(displayLang);
    const langs = Object.keys(texts);

    heading.addEventListener('click', () => {
        // Hide
        heading.classList.remove('fade-in');
        
        // Wait for hide animation, then change text and show
        setTimeout(() => {
            currentLangIdx = (currentLangIdx + 1) % langs.length;
            heading.textContent = texts[langs[currentLangIdx]];
            
            // Show again
            setTimeout(() => {
                heading.classList.add('fade-in');
            }, 50);
        }, 1500); // Wait for the 1.5s transition in CSS
    });

    console.log('Detected Language:', userLang, 'Using:', displayLang);
});
