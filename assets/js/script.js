// Função para esconder o spinner após 1 milissegundo
var hideSpinner = function () {
    setTimeout(function () {
        if ($('.spinner-container').length > 0) {
            $('.spinner-container').addClass('hide-spinner');
        }
    }, 1);
};

// Chama a função para esconder o spinner
hideSpinner();

// Inicializa o WOW.js
new WOW().init();

// Navbar fixa
$(window).on('scroll', function () {
    if ($(this).scrollTop() > 45) {
        $('.navbar').addClass('sticky-top shadow-sm');
    } else {
        $('.navbar').removeClass('sticky-top shadow-sm');
    }
});

// Dropdown em hover
const $dropdown = $(".dropdown");
const $dropdownToggle = $(".dropdown-toggle");
const $dropdownMenu = $(".dropdown-menu");
const showClass = "show";

$(window).on("load resize", function () {
    if (this.matchMedia("(min-width: 992px)").matches) {
        $dropdown.hover(
            function () {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function () {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
        );
    } else {
        $dropdown.off("mouseenter mouseleave");
    }
});

// Back to top button
$(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
});
$('.back-to-top').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 500, 'easeInOutExpo');
    return false;
});

// Função para animar o contador
function animateCounter(counterElement) {
    const targetValue = +counterElement.getAttribute('data-target');
    const startValue = 0;
    const duration = 2000; // Tempo total da animação em milissegundos
    const increment = targetValue / (duration / 50); // Quantidade de incremento a cada 50ms

    let currentValue = startValue;

    // Altera a cor no início da animação
    counterElement.style.color = '#f39c12'; // Cor inicial dos números
    let progressColor = '#f39c12'; // Cor inicial da borda

    function updateCounter() {
        currentValue += increment;
        if (currentValue < targetValue) {
            counterElement.textContent = Math.floor(currentValue);
            
            // Atualiza a borda de acordo com o progresso
            const progressPercentage = (currentValue / targetValue);
            
            // Muda a cor da borda conforme o progresso
            progressColor = interpolateColor('#f39c12', '#2ecc71', progressPercentage); // Transição de laranja para verde
            
            counterElement.style.borderTopColor = progressColor; // Atualiza a cor da borda superior

            requestAnimationFrame(updateCounter); // Atualiza a cada frame para suavidade
        } else {
            counterElement.textContent = targetValue;
            counterElement.style.color = '#2ecc71'; // Cor final dos números
            counterElement.style.borderTopColor = '#2ecc71'; // Cor final da borda
        }
    }

    updateCounter();
}

// Função para interpolar a cor entre o início e o fim
function interpolateColor(startColor, endColor, factor) {
    const start = hexToRgb(startColor);
    const end = hexToRgb(endColor);

    const result = {
        r: Math.round(start.r + factor * (end.r - start.r)),
        g: Math.round(start.g + factor * (end.g - start.g)),
        b: Math.round(start.b + factor * (end.b - start.b)),
    };

    return `rgb(${result.r}, ${result.g}, ${result.b})`;
}

// Função para converter hexadecimal para RGB
function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255,
    };
}

// Função para detectar a rolagem e iniciar a animação
function startCounterAnimationOnScroll() {
    const counters = document.querySelectorAll('.counter');
    const section = document.querySelector('.counter-section');

    // Verifica se o elemento está visível na tela
    function isVisible(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Evento de rolagem
    window.addEventListener('scroll', function () {
        if (isVisible(section)) {
            counters.forEach(counter => {
                counter.style.opacity = 1; // Aparece suavemente
                animateCounter(counter);
            });
        }
    });
}

// Chama a função ao carregar a página
document.addEventListener('DOMContentLoaded', startCounterAnimationOnScroll);




