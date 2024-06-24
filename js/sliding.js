class Slider{
    #btnPrevious
    #btnNext
    #pages
    #pos
    constructor(btnPrevious, btnNext, pages){
        this.#btnPrevious = btnPrevious;
        this.#btnNext = btnNext;
        this.#pos = 0;
        this.#pages = pages;
    }
    init(){
        this.#hideAllNextPages();
        this.#previousListener();
        this.#nextListener();
        this.#hideOrDisplayButton();
    }
    #previousListener(){
        this.#btnPrevious.addEventListener('click', (e)=>{
            e.preventDefault();
            if(this.#pos > 0){
                const now = this.#pages[this.#pos];
                this.#pos--;
                const before = this.#pages[this.#pos];
                const back = this.#querySelector(before, ".back, .cover");
                back.classList.add("animationClose");
                before.classList.remove("hide");
                now.classList.add("hide");
                this.#animationPromise(back, "animationClose");
                this.#hideOrDisplayButton();
            }
        })
    }
    #nextListener(){
        this.#btnNext.addEventListener('click', (e)=>{
            e.preventDefault();
            if(this.#pos < this.#pages.length - 1){
                const now = this.#pages[this.#pos];
                this.#pos++;
                const next = this.#pages[this.#pos];
                const front = this.#querySelector(next, ".front, .cover-back");
                now.classList.add("hide");
                next.classList.remove("hide");
                front.classList.add("animationOpen");
                this.#animationPromise(front, "animationOpen");
                this.#hideOrDisplayButton();
            }
        })
    }
    #querySelector(item, pattern){
        return item.querySelector(pattern);
    }
    #hideOrDisplayButton(){
        if(this.#pos === 0){
            this.#btnPrevious.classList.add("hide");
        }else if(this.#pos === this.#pages.length - 1){
            this.#btnNext.classList.add("hide");
        }else{
            if(this.#btnPrevious.classList.contains("hide"))
                this.#btnPrevious.classList.remove("hide");
            if(this.#btnNext.classList.contains("hide"))
                this.#btnNext.classList.remove("hide");
        }
    }
    #hideAllNextPages(){
        this.#pages.slice(1,).forEach((page) => page.classList.add("hide"));
    }
    #animationPromise(item, classAnimation){
        item.getAnimations().map((data) => {
            data.finished.then(() => {
                item.classList.remove(classAnimation);
            }).catch((err) => {
                if(err.name === 'AbortError'){
                    item.classList.remove(classAnimation);
                }
            })
        });
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const previousBtn = document.querySelector(".previous");
    const nextBtn = document.querySelector(".next");
    const pages = Array.from(document.querySelectorAll(".page"));
    const slide = new Slider(previousBtn, nextBtn, pages);
    slide.init();
});
