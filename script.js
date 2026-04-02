document.addEventListener('DOMContentLoaded', () => {
    const heading = document.getElementById('main-heading');
    const mainView = document.getElementById('main-view');
    const meditationView = document.getElementById('meditation-view');
    const meditationText = document.getElementById('meditation-text');

    const labels = { ru: 'Я Есть', en: 'I Am', es: 'Yo Soy' };
    const userLang = (navigator.language || navigator.userLanguage).split('-')[0];
    const lang = labels[userLang] ? userLang : 'ru';
    heading.textContent = labels[lang];

    setTimeout(() => heading.classList.add('visible'), 100);

    const phrases = [
        'Ты Есть',
        'Тебе ничего не надо делать чтобы Быть.',
        'Ты Уже Есть.',
        'Это Величайший подарок Бога Тебе.',
        'Даже если ты не можешь прочесть эти строки или услышать слова —',
        'ты просто знаешь/чувствуешь/ощущаешь.',
        'Это и есть твоя связь с Богом.',
        'Он радуется, смеётся и плачет вместе с Тобой.',
        'Он Всегда был с тобой,',
        'никогда не покидал Тебя',
        'и никогда не покинет.',
        'Ты Есть.',
        'Я Есть.',
        'Все Есть.',
        'Побудь в этом Осознавании.',
        'Оно не кричит, не требует ничего взамен.',
        'Загляни внутрь этого Осознавания,',
        'побудь в нём,',
        'и Ты почувствуешь Любовь Бога.',
        'Он Любит Тебя без всяких условий,',
        'не требуя ничего взамен.',
        'Просто побудь так.',
        'И здесь.',
        'Посиди, полежи, постой.',
        'Сколько нужно.',
        'Когда Ты в Сознании — времени нет.',
        'Ты можешь поплакать или посмеяться,',
        'если чувства переполняют тебя.',
        'А можешь просто раствориться',
        'в Бытии, Сознании и Покое.',
        'Больше ничего не нужно.',
        'Никуда не нужно бежать.',
        'Когда будешь готов —',
        'открой глаза и посмотри вокруг.',
        'Здесь больше никого и ничего нет,',
        'кроме Бога.',
        'Он больше не прячется от Тебя : )',
        'Носи эту Тишину, Гармонию и Покой в Себе.',
        'Всегда.',
        'Это и Есть Ты.',
        'Ты Есть.',
        'Я Есть.',
        'Всё Есть.',
        'Есть.',
        'есть...',
        '.',
        '',
    ];

    const FADE_IN  = 3000;  // ms to fade in
    const HOLD     = 3500;  // ms to hold visible
    const FADE_OUT = 2000;  // ms to fade out

    let paused = false;
    let stopped = false;
    let phraseIndex = 0;
    let stepTimer = null;

    function showPhrase(index) {
        if (stopped) return;

        if (index >= phrases.length) {
            // All done — gently return to main
            setTimeout(endMeditation, HOLD);
            return;
        }

        meditationText.textContent = phrases[index];
        const isEmpty = phrases[index] === '';
        meditationText.style.transition = isEmpty ? 'none' : `opacity ${FADE_IN}ms ease`;
        meditationText.style.opacity = isEmpty ? '0' : '1';

        stepTimer = setTimeout(() => {
            if (stopped) return;
            if (paused) {
                // Wait until unpaused
                const waitPause = setInterval(() => {
                    if (!paused || stopped) {
                        clearInterval(waitPause);
                        doFadeOut(index);
                    }
                }, 200);
            } else {
                doFadeOut(index);
            }
        }, FADE_IN + HOLD);
    }

    function doFadeOut(index) {
        if (stopped) return;
        meditationText.style.transition = `opacity ${FADE_OUT}ms ease`;
        meditationText.style.opacity = '0';
        stepTimer = setTimeout(() => showPhrase(index + 1), FADE_OUT);
    }

    function startMeditation() {
        stopped = false;
        paused = false;
        phraseIndex = 0;
        meditationText.style.opacity = '0';
        meditationText.style.transition = 'none';

        mainView.style.display = 'none';
        meditationView.style.display = 'flex';

        setTimeout(() => showPhrase(0), 300);
    }

    function endMeditation() {
        stopped = true;
        clearTimeout(stepTimer);

        meditationText.style.transition = `opacity ${FADE_OUT}ms ease`;
        meditationText.style.opacity = '0';

        setTimeout(() => {
            meditationView.style.display = 'none';
            mainView.style.display = 'flex';
            heading.classList.remove('visible');
            setTimeout(() => heading.classList.add('visible'), 50);
        }, FADE_OUT);
    }

    heading.addEventListener('click', (e) => {
        e.stopPropagation();
        startMeditation();
    });

    // Click to pause/resume; long click (>600ms) to exit
    let pressStart = 0;
    meditationView.addEventListener('mousedown', () => pressStart = Date.now());
    meditationView.addEventListener('touchstart', () => pressStart = Date.now(), { passive: true });

    meditationView.addEventListener('click', () => {
        const held = Date.now() - pressStart;
        if (held > 600) {
            endMeditation();
        } else {
            paused = !paused;
        }
    });
});
