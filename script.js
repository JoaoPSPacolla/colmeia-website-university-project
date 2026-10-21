/**
 * Menu mobile: abre/fecha a navegação mantendo aria-expanded, aria-label
 * e a classe .is-open sempre sincronizados em um único ponto (setOpen).
 */
function initMobileMenu() {
    const toggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".site-nav");
    if (!toggle || !nav) return;

    const isOpen = () => nav.classList.contains("is-open");

    const setOpen = (open) => {
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
        nav.classList.toggle("is-open", open);
    };

    toggle.addEventListener("click", () => setOpen(!isOpen()));

    // closest() cobre cliques em elementos filhos do link, não só no <a> em si.
    nav.addEventListener("click", (event) => {
        if (event.target.closest("a")) setOpen(false);
    });

    // Clique fora do cabeçalho fecha o menu.
    document.addEventListener("click", (event) => {
        if (isOpen() && !event.target.closest(".site-header")) setOpen(false);
    });

    // Escape fecha o menu e devolve o foco ao botão (padrão de acessibilidade).
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && isOpen()) {
            setOpen(false);
            toggle.focus();
        }
    });

    // Ao passar para o layout desktop (mesmo breakpoint do CSS: 760px),
    // reseta o estado para não ficar "aberto" ao voltar para o mobile.
    window.matchMedia("(min-width: 761px)").addEventListener("change", (event) => {
        if (event.matches) setOpen(false);
    });
}

/** Atualiza o ano do rodapé (o HTML traz um ano padrão para quem está sem JS). */
function initFooterYear() {
    const year = String(new Date().getFullYear());
    document.querySelectorAll("[data-year]").forEach((element) => {
        element.textContent = year;
    });
}

initMobileMenu();
initFooterYear();
