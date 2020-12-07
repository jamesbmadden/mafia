import { LitElement, html, css, customElement, property, query } from 'lit-element';

@customElement('mafia-background')
export default class MafiaApp extends LitElement {

  @property() video;
  @query('video') videoElement;
  
  static get styles () {
    return css`
      .root {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
      video {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 100%;
      }
    `;
  }

  async connectedCallback () {
    super.connectedCallback();

    this.video = (await import('../../assets/background.mp4')).default;

    this.boundResizeVideo = this.resizeVideo.bind(this);

    this.resizeVideo();
    addEventListener('resize', this.boundResizeVideo);
  }

  disconnectedCallback () {
    super.disconnectedCallback();

    removeEventListener('resize', this.boundResizeVideo)
  }

  resizeVideo () {
    if (innerHeight < innerWidth / 1.777777777777778) {
      this.videoElement.style.width = '100%';
      this.videoElement.style.height = 'auto';
    } else {
      this.videoElement.style.width = 'auto';
      this.videoElement.style.height = '100%';
    }
  }

  advanceVideo () {
    this.videoElement.play();
    setTimeout(() => {
      this.videoElement.pause();
    }, 2000);
  }

  render () {
    return html`
      <div class="root">
        <video muted src="${this.video}" oncanplay="this.muted=true"></video>
      </div>`;
  }

}