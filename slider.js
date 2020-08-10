function getTemplate(state) {
    return `
        <div class="slider__after" style="width: ${state.width + "px"}; background-image: url(${state.after})">
          <div class="slider__resize" data-type="resize"></div>
        </div>
        <div class="slider__before" style="background-image: url(${state.before})">
</div>
    `
}

class Slider {

    constructor(selector, options) {
        this.$el = document.getElementById(selector)
        this.state = {
            width: 512,
            after: options.after,
            before: options.before,
        }
        this.#render(this.state)
        this.#listen()
    }

    #render(state) {
        this.$el.innerHTML = getTemplate(state)
    }

    #update(props) {
        this.state = {
            ...this.state,
            ...props
        }
        console.log(this.state)
        this.#render(this.state)
    }

    #listen() {
        this.resizeDown = this.resizeDown.bind(this)
        this.resizeUp = this.resizeUp.bind(this)
        this.moveHandler = this.moveHandler.bind(this)
        this.$el.addEventListener('mousedown', this.resizeDown)
        this.$el.addEventListener('mouseup', this.resizeUp)
    }

    resizeUp(event) {
        if(event.target.dataset.type === 'resize') {
            console.log('up')
        }
        this.$el.removeEventListener('mousemove', this.moveHandler)

    }

    resizeDown(event) {
        if(event.target.dataset.type  === 'resize') {
            this.$el.addEventListener('mousemove', this.moveHandler)
            this.currentCursor = event.clientX
        }
    }

    moveHandler(event) {
        let newX = this.currentCursor - event.clientX
        this.#update({width: this.state.width - newX})
        this.currentCursor = event.clientX
    }

}

const slider = new Slider('slider', {
    after: './assets/1.jpg',
    before: './assets/2.jpg',
})
