document.addEventListener('DOMContentLoaded', () => {
    const heading = document.querySelector('h1');
    const textView = document.getElementById('text-view');
    const textTitle = document.getElementById('text-title');
    const textBody = document.getElementById('text-body');

    const texts = {
        'ru': 'Я Есть',
        'en': 'I Am',
        'es': 'Yo Soy'
    };

    const titleText = 'Ты Есть';
    const bodyText = 'Ты Есть. Тебе ничего не надо делать чтобы Быть. Ты Уже Есть. Это Величайший подарок Бога Тебе. Даже если ты не можешь прочесть эти строки или услышать слова — ты просто знаешь/чувствуешь/ощущаешь. Это и есть твоя связь с Богом. Он радуется, смеётся и плачет вместе с Тобой. Он Всегда был с тобой, никогда не покидал Тебя и никогда не покинет. Ты Есть. Я Есть. Все Есть. Побудь в этом Осознавании. Оно не кричит, не требует ничего взамен. Загляни внутрь этого Осознавания, побудь в нём, и Ты почувствуешь Любовь Бога. Он Любит Тебя без всяких условий, не требуя ничего взамен. Просто побудь так. И здесь. Посиди, полежи, постой. Сколько нужно. Когда Ты в Сознании — времени нет. Ты можешь поплакать или посмеяться если чувства переполняют тебя. А можешь просто раствориться в Бытии, Сознании и Покое. Больше ничего не нужно. Никуда не нужно бежать. Когда будешь готов — открой глаза и посмотри вокруг. Здесь больше никого и ничего нет, кроме Бога. Он больше не прячется от Тебя : ) Носи эту Тишину, Гармонию и Покой в Себе. Всегда. Это и Есть Ты. Ты Есть. Я Есть. Всё Есть. Есть. есть... .';

    // Language detection
    const userLang = (navigator.language || navigator.userLanguage).split('-')[0];
    const displayLang = texts[userLang] ? userLang : 'ru';
    heading.textContent = texts[displayLang];

    // Fade in on load
    setTimeout(() => heading.classList.add('visible'), 100);

    let animating = false;

    function revealWords(container, text, delayPerWord, startDelay) {
        const words = text.split(' ');
        words.forEach((word, i) => {
            const span = document.createElement('span');
            span.className = 'word';
            span.textContent = word + ' ';
            container.appendChild(span);
            setTimeout(() => {
                span.classList.add('visible');
            }, startDelay + i * delayPerWord);
        });
        return startDelay + words.length * delayPerWord;
    }

    heading.addEventListener('click', () => {
        if (animating) return;
        animating = true;

        // Fade out heading
        heading.classList.remove('visible');

        setTimeout(() => {
            document.getElementById('main-view').style.display = 'none';
            textView.style.display = 'flex';

            // Animate title first, then body
            const titleDone = revealWords(textTitle, titleText, 250, 200);
            revealWords(textBody, bodyText, 180, titleDone + 400);
        }, 800);
    });

    // Click anywhere on text view to return
    textView.addEventListener('click', () => {
        textView.style.display = 'none';
        textTitle.innerHTML = '';
        textBody.innerHTML = '';

        const mainView = document.getElementById('main-view');
        mainView.style.display = 'flex';
        heading.classList.remove('visible');
        setTimeout(() => heading.classList.add('visible'), 50);
        animating = false;
    });
});
